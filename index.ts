/**
 * TypeScript Type Definitions
 * for Breast Cancer Detection System
 */

export interface PredictionResult {
  prediction: 'benign' | 'malignant';
  confidence: number;
  probabilities: {
    benign: number;
    malignant: number;
  };
  risk_score: number;
  risk_category: string;
  recommendations: string[];
  timestamp: string;
  model_used: string;
}

export interface UploadedImage {
  file: File;
  preview: string;
}

export interface APIError {
  detail: string;
  status_code?: number;
}

export interface ModelInfo {
  model_name: string;
  input_shape: number[];
  output_shape: number[];
  total_parameters: number;
  classes: string[];
  preprocessing: {
    target_size: number[];
    normalization: string;
    clahe: boolean;
  };
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  models_loaded: boolean;
}