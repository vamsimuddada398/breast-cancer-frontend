/**
 * API Service
 * Handles all communication with the FastAPI backend
 */

import { PredictionResult, ModelInfo } from './index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class APIService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Upload mammogram image for prediction
   */
  async uploadMammogram(file: File): Promise<PredictionResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock prediction result - randomly choose benign or malignant
    const isMalignant = Math.random() > 0.6; // 40% chance of malignant
    const confidence = 0.75 + Math.random() * 0.2; // 75-95% confidence

    const probabilities = {
      benign: isMalignant ? 1 - confidence : confidence,
      malignant: isMalignant ? confidence : 1 - confidence
    };

    const riskScore = probabilities.malignant * confidence;

    let riskCategory: string;
    if (riskScore < 0.2) riskCategory = "Low Risk";
    else if (riskScore < 0.5) riskCategory = "Moderate Risk";
    else if (riskScore < 0.75) riskCategory = "High Risk";
    else riskCategory = "Very High Risk";

    const recommendations = isMalignant ?
      [
        "Immediate follow-up with radiologist recommended",
        "Consider additional imaging (ultrasound or MRI)",
        "Biopsy consultation may be necessary",
        "Schedule appointment within 1-2 weeks"
      ] :
      [
        "Continue routine annual screening",
        "Maintain healthy lifestyle practices",
        "Report any changes in breast tissue immediately"
      ];

    return {
      prediction: isMalignant ? 'malignant' : 'benign',
      confidence: confidence,
      probabilities: probabilities,
      risk_score: riskScore,
      risk_category: riskCategory,
      recommendations: recommendations,
      timestamp: new Date().toISOString(),
      model_used: "EfficientNetB3 (Demo)"
    };
  }

  /**
   * Batch upload multiple mammograms
   */
  async batchUpload(files: File[]): Promise<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${this.baseUrl}/api/batch-predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze images');
      }

      return await response.json();
    } catch (error) {
      console.error('Batch upload error:', error);
      throw error;
    }
  }

  /**
   * Get model information
   */
  async getModelInfo(): Promise<ModelInfo> {
    try {
      const response = await fetch(`${this.baseUrl}/api/model-info`);

      if (!response.ok) {
        throw new Error('Failed to fetch model info');
      }

      return await response.json();
    } catch (error) {
      console.error('Model info error:', error);
      throw error;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; models_loaded: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);

      if (!response.ok) {
        throw new Error('Health check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}

// Export singleton instance
const api = new APIService();
export default api;