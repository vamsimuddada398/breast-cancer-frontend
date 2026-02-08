import { PredictionResult } from '../types';

const API_BASE_URL = 'http://localhost:8000';

/**
 * Convert base64 string to Blob
 */
function base64ToBlob(base64: string): Blob {
  const parts = base64.split(',');
  const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(parts[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new Blob([u8arr], { type: mimeType });
}

/**
 * Analyze mammogram image using the backend API
 */
export async function analyzeMammogram(base64Image: string): Promise<PredictionResult> {
  try {
    // Convert base64 to blob
    const blob = base64ToBlob(base64Image);
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', blob, 'mammogram.jpg');
    formData.append('model_name', 'efficientnet');

    // Send to backend
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to analyze image');
    }

    const result: PredictionResult = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing mammogram:', error);
    throw error;
  }
}
