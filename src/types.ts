export interface PredictionResult {
  prediction: 'benign' | 'malignant'
  confidence: number
  risk_score: number
  risk_category: string
  probabilities: {
    benign: number
    malignant: number
  }
  recommendations: string[]
  model_used: string
  timestamp: string
}
