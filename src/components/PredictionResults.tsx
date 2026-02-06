import { PredictionResult } from '../../index'

interface PredictionResultsProps {
  result: PredictionResult
}

export default function PredictionResults({ result }: PredictionResultsProps) {
  const isMalignant = result.prediction === 'malignant'
  const isHighRisk = ['High Risk', 'Very High Risk'].includes(result.risk_category)

  const getRiskColor = (category: string) => {
    switch (category) {
      case 'Very High Risk':
        return { bg: 'bg-red-600', text: 'text-red-200', light: 'bg-red-500/20', border: 'border-red-500/30' }
      case 'High Risk':
        return { bg: 'bg-orange-600', text: 'text-orange-200', light: 'bg-orange-500/20', border: 'border-orange-500/30' }
      case 'Moderate Risk':
        return { bg: 'bg-yellow-600', text: 'text-yellow-200', light: 'bg-yellow-500/20', border: 'border-yellow-500/30' }
      case 'Low Risk':
        return { bg: 'bg-green-600', text: 'text-green-200', light: 'bg-green-500/20', border: 'border-green-500/30' }
      default:
        return { bg: 'bg-blue-600', text: 'text-blue-200', light: 'bg-blue-500/20', border: 'border-blue-500/30' }
    }
  }

  const riskColors = getRiskColor(result.risk_category)

  return (
    <div className="space-y-8">
      {/* Main Prediction Card with Enhanced Visualization */}
      <div className={`relative overflow-hidden rounded-2xl p-8 border-2 shadow-2xl ${
        isMalignant
          ? 'bg-gradient-to-br from-red-900/40 to-red-800/40 border-red-500/50'
          : 'bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-500/50'
      } backdrop-blur-sm`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${isMalignant ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}></div>
                <p className="text-slate-300 text-sm font-medium uppercase tracking-wider">AI PREDICTION</p>
              </div>
              <h2 className="text-6xl lg:text-7xl font-bold text-white capitalize mb-2">
                {result.prediction}
              </h2>
              <p className="text-slate-300 text-lg">Analysis completed successfully</p>
            </div>
            <div className="text-9xl lg:text-10xl opacity-80">
              {isMalignant ? '🚨' : '✅'}
            </div>
          </div>

          {/* Confidence and Risk Score with Circular Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Confidence Circle */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 text-xl">🎯</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Confidence Level</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(result.confidence * 100)}%
                  </p>
                </div>
              </div>
              {/* Circular Progress */}
              <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(100, 116, 139, 0.3)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${result.confidence * 282.7} 282.7`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {Math.round(result.confidence * 100)}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Score */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 text-xl">📊</span>
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-medium">Risk Score</p>
                  <p className="text-3xl font-bold text-white">
                    {(result.risk_score * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              {/* Risk Bar */}
              <div className="space-y-2">
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                      result.risk_score < 0.2 ? 'bg-green-500' :
                      result.risk_score < 0.5 ? 'bg-yellow-500' :
                      result.risk_score < 0.75 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.risk_score * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Category Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold ${riskColors.light} ${riskColors.border} border-2`}>
            <div className={`w-3 h-3 rounded-full ${riskColors.bg}`}></div>
            <span className="text-white">{result.risk_category}</span>
          </div>
        </div>
      </div>

      {/* Advanced Risk Assessment Dashboard */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
            <span className="text-purple-400 text-xl">📊</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-2xl">Risk Assessment Dashboard</h3>
            <p className="text-slate-400 text-sm">Comprehensive risk analysis and visualization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Gauge */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg text-center">Risk Level Gauge</h4>
            <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(100, 116, 139, 0.2)"
                  strokeWidth="8"
                />

                {/* Risk arc segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeDasharray="28.27 254.43"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="8"
                  strokeDasharray="56.54 226.16"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="8"
                  strokeDasharray="42.41 240.27"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  strokeDasharray="56.54 226.16"
                  strokeLinecap="round"
                />

                {/* Risk needle */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="15"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform={`rotate(${result.risk_score * 180 - 90} 50 50)`}
                  className="transition-all duration-1000 ease-out"
                />

                {/* Center dot */}
                <circle cx="50" cy="50" r="3" fill="#ffffff" />
              </svg>

              {/* Risk level labels */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {(result.risk_score * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm text-slate-400">Risk Score</p>
                </div>
              </div>
            </div>

            {/* Risk scale */}
            <div className="grid grid-cols-4 gap-2 text-xs text-center">
              <div>
                <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mb-1"></div>
                <p className="text-green-400 font-semibold">0-25%</p>
                <p className="text-slate-400">Low</p>
              </div>
              <div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mx-auto mb-1"></div>
                <p className="text-yellow-400 font-semibold">25-50%</p>
                <p className="text-slate-400">Moderate</p>
              </div>
              <div>
                <div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div>
                <p className="text-orange-400 font-semibold">50-75%</p>
                <p className="text-slate-400">High</p>
              </div>
              <div>
                <div className="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1"></div>
                <p className="text-red-400 font-semibold">75-100%</p>
                <p className="text-slate-400">Very High</p>
              </div>
            </div>
          </div>

          {/* Probability Distribution Chart */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg text-center">Probability Distribution</h4>
            <div className="space-y-4">
              {/* Benign Probability */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-slate-300 font-medium">Benign</span>
                  </div>
                  <span className="text-white font-bold">
                    {(result.probabilities.benign * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-6 bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                      style={{ width: `${result.probabilities.benign * 100}%` }}
                    >
                      <span className="text-white text-xs font-bold">
                        {(result.probabilities.benign * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Malignant Probability */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-slate-300 font-medium">Malignant</span>
                  </div>
                  <span className="text-white font-bold">
                    {(result.probabilities.malignant * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-6 bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                      style={{ width: `${result.probabilities.malignant * 100}%` }}
                    >
                      <span className="text-white text-xs font-bold">
                        {(result.probabilities.malignant * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Interval Visualization */}
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <h5 className="text-white font-medium mb-3 text-center">Confidence Interval</h5>
              <div className="relative">
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    style={{
                      left: `${Math.max(0, (result.confidence - 0.1) * 100)}%`,
                      width: `${Math.min(20, result.confidence * 20)}%`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>70%</span>
                  <span>80%</span>
                  <span>90%</span>
                  <span>100%</span>
                </div>
              </div>
              <p className="text-center text-sm text-slate-300 mt-2">
                Model confidence: ±{Math.round((1 - result.confidence) * 10)}%
              </p>
            </div>
          </div>
        </div>

        {/* Risk Level Timeline */}
        <div className="mt-8 p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
          <h4 className="text-white font-semibold mb-6 text-center">Risk Level Progression</h4>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-600"></div>

            {/* Timeline points */}
            <div className="flex justify-between relative">
              {[
                { level: 'Low Risk', range: '0-25%', color: 'bg-green-500', position: 0 },
                { level: 'Moderate Risk', range: '25-50%', color: 'bg-yellow-500', position: 25 },
                { level: 'High Risk', range: '50-75%', color: 'bg-orange-500', position: 50 },
                { level: 'Very High Risk', range: '75-100%', color: 'bg-red-500', position: 75 }
              ].map((risk, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${risk.color} border-2 border-slate-800 relative z-10 ${
                    result.risk_score * 100 >= risk.position ? 'ring-4 ring-opacity-50 ring-current' : ''
                  }`}></div>
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-medium ${
                      result.risk_score * 100 >= risk.position ? 'text-white' : 'text-slate-400'
                    }`}>
                      {risk.level}
                    </p>
                    <p className="text-xs text-slate-500">{risk.range}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Current position indicator */}
            <div
              className="absolute top-3 w-1 h-6 bg-white rounded-full shadow-lg"
              style={{ left: `${result.risk_score * 100}%`, transform: 'translateX(-50%)' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Risk Factors Heatmap */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center">
            <span className="text-orange-400 text-xl">🔥</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-2xl">Risk Factors Analysis</h3>
            <p className="text-slate-400 text-sm">Key indicators contributing to risk assessment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Confidence Factor */}
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">🎯</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Model Confidence</h4>
                  <p className="text-slate-400 text-sm">AI certainty level</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Level</span>
                <span className="text-white font-bold">{Math.round(result.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    result.confidence > 0.8 ? 'bg-green-500' :
                    result.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400">
                {result.confidence > 0.8 ? 'High confidence' :
                 result.confidence > 0.6 ? 'Moderate confidence' : 'Low confidence'}
              </p>
            </div>
          </div>

          {/* Probability Ratio */}
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400">⚖️</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Probability Ratio</h4>
                  <p className="text-slate-400 text-sm">Benign vs Malignant</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Ratio</span>
                <span className="text-white font-bold">
                  {(result.probabilities.benign / Math.max(result.probabilities.malignant, 0.01)).toFixed(2)}:1
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    result.probabilities.benign > result.probabilities.malignant ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.min(100, (result.probabilities.benign / Math.max(result.probabilities.malignant, 0.01)) * 20)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-slate-400">
                {result.probabilities.benign > result.probabilities.malignant ? 'Favors benign' : 'Favors malignant'}
              </p>
            </div>
          </div>

          {/* Risk Score Intensity */}
          <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <span className="text-red-400">⚡</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Risk Intensity</h4>
                  <p className="text-slate-400 text-sm">Overall risk level</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Score</span>
                <span className="text-white font-bold">{(result.risk_score * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    result.risk_score < 0.25 ? 'bg-green-500' :
                    result.risk_score < 0.5 ? 'bg-yellow-500' :
                    result.risk_score < 0.75 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.risk_score * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400">
                {result.risk_score < 0.25 ? 'Low risk' :
                 result.risk_score < 0.5 ? 'Moderate risk' :
                 result.risk_score < 0.75 ? 'High risk' : 'Very high risk'}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Matrix */}
        <div className="mt-8 p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
          <h4 className="text-white font-semibold mb-6 text-center">Risk Assessment Matrix</h4>
          <div className="grid grid-cols-2 gap-4">
            {/* Confidence vs Probability */}
            <div className="space-y-3">
              <h5 className="text-slate-300 text-sm font-medium text-center">Confidence × Probability</h5>
              <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(100,116,139,0.3)" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />

                  {/* Risk point */}
                  <circle
                    cx={result.confidence * 80 + 10}
                    cy={100 - (result.probabilities.malignant * 80 + 10)}
                    r="4"
                    fill={result.risk_score > 0.5 ? "#ef4444" : "#22c55e"}
                    className="animate-pulse"
                  />

                  {/* Labels */}
                  <text x="5" y="15" fill="#94a3b8" fontSize="8">High Risk</text>
                  <text x="70" y="95" fill="#94a3b8" fontSize="8">Low Risk</text>
                </svg>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Low Confidence</span>
                <span>High Confidence</span>
              </div>
            </div>

            {/* Risk Level Indicator */}
            <div className="space-y-3">
              <h5 className="text-slate-300 text-sm font-medium text-center">Risk Level Indicator</h5>
              <div className="flex flex-col items-center space-y-2">
                {[
                  { level: 'Very High', color: 'bg-red-500', range: '75-100%' },
                  { level: 'High', color: 'bg-orange-500', range: '50-75%' },
                  { level: 'Moderate', color: 'bg-yellow-500', range: '25-50%' },
                  { level: 'Low', color: 'bg-green-500', range: '0-25%' }
                ].map((risk, index) => (
                  <div key={index} className="flex items-center w-full max-w-xs">
                    <div className={`w-4 h-4 rounded-full ${risk.color} mr-3 ${
                      result.risk_score * 100 >= parseInt(risk.range.split('-')[0]) ? 'ring-2 ring-white' : ''
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className={`text-sm ${result.risk_score * 100 >= parseInt(risk.range.split('-')[0]) ? 'text-white font-semibold' : 'text-slate-400'}`}>
                          {risk.level}
                        </span>
                        <span className="text-xs text-slate-500">{risk.range}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Enhanced Metadata and Disclaimer */}
      <div className="space-y-6">
        {/* Analysis Summary Card */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">📋</span>
            Analysis Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 mb-1">Classification</p>
              <p className="font-semibold text-white capitalize">{result.prediction}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 mb-1">Model Used</p>
              <p className="font-semibold text-white">{result.model_used}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-slate-400 mb-1">Analysis Date</p>
              <p className="font-semibold text-white">{new Date(result.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Enhanced Medical Disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-amber-400 text-2xl">⚕️</span>
            </div>
            <div>
              <h4 className="text-amber-300 font-bold text-lg mb-3">Medical Disclaimer</h4>
              <p className="text-amber-200 leading-relaxed mb-4">
                This AI analysis is for screening support only and should not replace professional medical diagnosis.
                Always consult with a qualified radiologist or healthcare provider for definitive assessment and treatment recommendations.
              </p>
              <div className="flex items-center gap-2 text-amber-400 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Professional medical advice required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
