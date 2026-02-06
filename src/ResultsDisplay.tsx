/**
 * Results Display Component - Enhanced with Visualizations
 * Shows prediction results with gauge chart and improved UX
 */

import React from 'react';
import { PredictionResult } from './types';


interface ResultsDisplayProps {
  result: PredictionResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const isMalignant = result.prediction === 'malignant';
  
  // Color scheme based on risk category
  const getRiskColors = () => {
    if (result.risk_category === 'Low Risk') 
      return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'bg-green-100' };
    if (result.risk_category === 'Moderate Risk') 
      return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', badge: 'bg-yellow-100' };
    if (result.risk_category === 'High Risk') 
      return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100' };
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'bg-red-100' };
  };

  const riskColors = getRiskColors();

  // Risk gauge calculation
  const riskAngle = (result.risk_score * 180);

  return (
    <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Analysis Results</h2>
        <button
          onClick={onReset}
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
        >
          New Analysis →
        </button>
      </div>

      {/* Main Prediction */}
      <div className={`rounded-xl p-4 sm:p-6 border-2 ${isMalignant ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
        <div className="flex items-start space-x-3 sm:space-x-4">
          {isMalignant ? (
            <div className="flex-shrink-0 bg-red-100 rounded-full p-2 sm:p-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          ) : (
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 sm:p-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg sm:text-xl font-bold ${isMalignant ? 'text-red-900' : 'text-green-900'}`}>
              {result.prediction.charAt(0).toUpperCase() + result.prediction.slice(1)}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`text-xs sm:text-sm ${isMalignant ? 'text-red-700' : 'text-green-700'} font-medium`}>
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </span>
              <div className="flex-1 min-w-[100px] max-w-[200px] bg-white bg-opacity-50 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${isMalignant ? 'bg-red-600' : 'bg-green-600'}`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment with Gauge */}
      <div className={`rounded-xl border-2 p-4 sm:p-6 ${riskColors.bg} ${riskColors.border}`}>
        <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Risk Assessment</h3>
        
        {/* Risk Gauge */}
        <div className="relative w-full max-w-xs mx-auto mb-4">
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
              {/* Background arc */}
              <path
                d="M 10 90 A 80 80 0 0 1 190 90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Colored segments */}
              <path
                d="M 10 90 A 80 80 0 0 1 55 30"
                fill="none"
                stroke="#10b981"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 55 30 A 80 80 0 0 1 100 10"
                fill="none"
                stroke="#eab308"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 100 10 A 80 80 0 0 1 145 30"
                fill="none"
                stroke="#f97316"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <path
                d="M 145 30 A 80 80 0 0 1 190 90"
                fill="none"
                stroke="#ef4444"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Needle */}
              <g transform={`rotate(${riskAngle} 100 90)`}>
                <line
                  x1="100"
                  y1="90"
                  x2="100"
                  y2="20"
                  stroke="#1f2937"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="90" r="6" fill="#1f2937" />
              </g>
            </svg>
          </div>
          <div className="text-center mt-2">
            <div className={`inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold ${riskColors.badge} ${riskColors.text}`}>
              {result.risk_category}
            </div>
            <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
              {(result.risk_score * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Probability Breakdown */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Probability Breakdown</h3>
        
        <div className="space-y-4">
          {/* Benign */}
          <div>
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-gray-700 font-medium">Benign</span>
              <span className="text-gray-600">{(result.probabilities.benign * 100).toFixed(2)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${result.probabilities.benign * 100}%` }}
              />
            </div>
          </div>

          {/* Malignant */}
          <div>
            <div className="flex justify-between text-xs sm:text-sm mb-2">
              <span className="text-gray-700 font-medium">Malignant</span>
              <span className="text-gray-600">{(result.probabilities.malignant * 100).toFixed(2)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${result.probabilities.malignant * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Clinical Recommendations
        </h3>
        <ul className="space-y-2 sm:space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2 sm:space-x-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metadata */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div>
            <span className="text-gray-500 font-medium">Model:</span>
            <span className="ml-2 text-gray-700">{result.model_used}</span>
          </div>
          <div>
            <span className="text-gray-500 font-medium">Analyzed:</span>
            <span className="ml-2 text-gray-700">
              {new Date(result.timestamp).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
        <span className="flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Full Report (PDF)
        </span>
      </button>
    </div>
  );
};

export default ResultsDisplay;