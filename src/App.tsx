/**
 * Breast Cancer Detection System - Main App Component
 * React + TypeScript + Tailwind CSS
 * FINAL FIXED LAYOUT + IMPRESSIVE BACKGROUND
 */

import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import PredictionResults from "./components/PredictionResults";
import Header from "./components/Header";
import { PredictionResult } from "../index";

const App: React.FC = () => {
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handlePredictionComplete = (result: PredictionResult) => {
    setPredictionResult(result);
    setIsLoading(false);
  };

  const handleImageUpload = (file: File) => {
    setIsLoading(true);
    setUploadedImage(URL.createObjectURL(file));

    // Mock API call
    setTimeout(() => {
      const mockResult: PredictionResult = {
        prediction: Math.random() > 0.5 ? "malignant" : "benign",
        confidence: Math.random() * 0.4 + 0.6,
        risk_score: Math.random(),
        risk_category: ["Low Risk", "Moderate Risk", "High Risk", "Very High Risk"][
          Math.floor(Math.random() * 4)
        ],
        probabilities: {
          benign: Math.random(),
          malignant: Math.random(),
        },
        recommendations: [
          "Schedule follow-up appointment within 2 weeks",
          "Consider additional imaging studies",
          "Consult with oncology specialist",
          "Maintain regular screening schedule",
        ],
        model_used: "EfficientNet-B3",
        timestamp: new Date().toISOString(),
      };

      handlePredictionComplete(mockResult);
    }, 2000);
  };

  const handleReset = () => {
    setPredictionResult(null);
    setUploadedImage(null);
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-x-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-400 opacity-15 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-400 opacity-15 blur-3xl rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400 opacity-10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content Wrapper */}
      <main className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <div className="w-full max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              AI-Powered Breast Cancer Detection
            </h1>
            <p className="text-slate-300 max-w-3xl mx-auto">
              Advanced deep learning technology for early detection and risk
              assessment using mammography images.
            </p>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col items-center gap-6 mb-12">
            {/* Upload Panel */}
            <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-100/50 p-6 hover:shadow-2xl transition-shadow">
              <ImageUploader
                onUpload={handleImageUpload}
                loading={isLoading}
                imagePreview={uploadedImage}
              />
            </div>

            {/* Results Panel */}
            <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-100/50 p-6 min-h-[420px] overflow-x-hidden hover:shadow-2xl transition-shadow">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Analyzing mammogram…</p>
                  </div>
                </div>
              ) : predictionResult ? (
                <>
                  <div className="flex justify-center w-full overflow-x-hidden">
                    <div className="w-full max-w-5xl">
                      <PredictionResults result={predictionResult} />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:from-cyan-700 hover:to-teal-700 transition shadow-lg font-semibold"
                    >
                      Analyze Another Image
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-center">
                  Upload a mammogram to see results
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-50/90 backdrop-blur-md border-l-4 border-cyan-600 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> This system is for educational and
              research purposes only. Always consult qualified healthcare
              professionals.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-cyan-800 via-blue-800 to-teal-800 text-white py-6 mt-12 border-t border-cyan-700/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            Breast Cancer Detection System © 2026
          </p>
          <p className="text-xs text-cyan-200 mt-1">
            Built with React, Tailwind, TensorFlow & FastAPI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
