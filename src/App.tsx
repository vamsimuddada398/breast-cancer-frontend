/**
 * Breast Cancer Detection System - Main App Component
 * Clean, modern design matching provided interface
 */

import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import PredictionResults from "./components/PredictionResults";
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
    setPredictionResult(null);
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50">
      {/* Header Section - Title & Subtitle */}
      <header className="pt-12 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-3">
            AI-Powered Breast Cancer Detection
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Advanced deep learning technology for early detection and risk
            assessment using mammography images.
          </p>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Panel - Image Upload */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
            <ImageUploader
              onUpload={handleImageUpload}
              loading={isLoading}
              imagePreview={uploadedImage}
            />
          </div>

          {/* Right Panel - Results Placeholder or Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 min-h-[400px] flex flex-col">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6" />
                <p className="text-gray-600 font-medium">Analyzing mammogram…</p>
                <p className="text-sm text-gray-400 mt-1">Please wait</p>
              </div>
            ) : predictionResult ? (
              <div className="flex-1 overflow-auto">
                <PredictionResults result={predictionResult} />
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
                  >
                    Analyze Another Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 font-medium text-lg">
                  Upload a mammogram to see results
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Results and analysis will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> This system is for educational and
            research purposes only. Always consult qualified healthcare
            professionals for medical decisions.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 border-t border-gray-100">
        Breast Cancer Detection System © 2026
      </footer>
    </div>
  );
};

export default App;
