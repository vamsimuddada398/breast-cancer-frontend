import { PredictionResult } from '../../index'

interface RiskVisualizationProps {
  result: PredictionResult
}

export default function RiskVisualization({ result }: RiskVisualizationProps) {
  const getRiskColor = (category: string) => {
    switch (category) {
      case 'Very High Risk':
        return { bg: 'bg-red-600', text: 'text-red-200', light: 'bg-red-500/20' }
      case 'High Risk':
        return { bg: 'bg-orange-600', text: 'text-orange-200', light: 'bg-orange-500/20' }
      case 'Moderate Risk':
        return { bg: 'bg-yellow-600', text: 'text-yellow-200', light: 'bg-yellow-500/20' }
      case 'Low Risk':
        return { bg: 'bg-green-600', text: 'text-green-200', light: 'bg-green-500/20' }
      default:
        return { bg: 'bg-blue-600', text: 'text-blue-200', light: 'bg-blue-500/20' }
    }
  }

  const colors = getRiskColor(result.risk_category)

  return (
    <div className="space-y-6 mt-6 flex flex-col items-center">
      {/* Risk Gauge */}
      <div className={`rounded-lg p-8 border ${colors.light} bg-gradient-to-br from-slate-50 to-slate-100 w-full max-w-2xl`}>
        <p className="text-slate-600 text-sm mb-6 font-semibold text-center">RISK ASSESSMENT GAUGE</p>

        {/* Circular Risk Gauge */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-48 h-48">
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

              {/* Risk arc */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="8"
                strokeDasharray={`${(result.risk_score * 282.7).toFixed(2)} 282.7`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900">
                {Math.round(result.risk_score * 100)}%
              </p>
              <p className="text-sm text-slate-600">Risk Level</p>
            </div>
          </div>
        </div>

        {/* Scale explanation */}
        <div className="grid grid-cols-4 gap-2 text-xs justify-center">
          <div className="text-center">
            <p className="text-green-600 font-semibold">0-20%</p>
            <p className="text-slate-600">Low</p>
          </div>
          <div className="text-center">
            <p className="text-yellow-600 font-semibold">20-50%</p>
            <p className="text-slate-600">Moderate</p>
          </div>
          <div className="text-center">
            <p className="text-orange-600 font-semibold">50-75%</p>
            <p className="text-slate-600">High</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 font-semibold">75-100%</p>
            <p className="text-slate-600">Very High</p>
          </div>
        </div>
      </div>

      {/* Risk Timeline */}
      <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 rounded-lg p-6 border border-blue-200/50 shadow-sm w-full max-w-2xl">
        <p className="text-slate-800 font-semibold mb-6 text-center">Next Steps Timeline</p>

        <div className="space-y-4 flex flex-col items-center">
          {result.risk_category === 'Very High Risk' || result.risk_category === 'High Risk' ? (
            <>
              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-0.5 h-16 bg-red-500/30"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-red-300">Immediate Action</p>
                  <p className="text-sm text-slate-400">Schedule radiologist consultation within 1-2 weeks</p>
                </div>
              </div>

              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <div className="w-0.5 h-16 bg-orange-500/30"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-orange-300">Follow-up Imaging</p>
                  <p className="text-sm text-slate-400">Consider additional imaging (ultrasound or MRI)</p>
                </div>
              </div>

              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-yellow-300">Biopsy Assessment</p>
                  <p className="text-sm text-slate-400">Discuss biopsy consultation with your physician</p>
                </div>
              </div>
            </>
          ) : result.risk_category === 'Moderate Risk' ? (
            <>
              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-0.5 h-16 bg-yellow-500/30"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-yellow-300">Follow-up in 6 Months</p>
                  <p className="text-sm text-slate-400">Schedule follow-up mammogram appointment</p>
                </div>
              </div>

              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-blue-300">Physician Discussion</p>
                  <p className="text-sm text-slate-400">Review findings with your healthcare provider</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="w-0.5 h-16 bg-green-500/30"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-300">Continue Routine Screening</p>
                  <p className="text-sm text-slate-400">Maintain regular annual mammography schedule</p>
                </div>
              </div>

              <div className="flex gap-4 max-w-md">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-green-300">Healthy Lifestyle</p>
                  <p className="text-sm text-slate-400">Maintain preventive health measures</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Key Findings Summary */}
      <div className="bg-slate-700/20 rounded-lg p-6 border border-slate-600 w-full max-w-2xl">
        <p className="text-white font-semibold mb-4 text-center">Summary</p>
        <div className="space-y-2 text-sm text-slate-300 text-center">
          <p>
            <span className="text-slate-400">Classification:</span> <span className="font-semibold capitalize">{result.prediction}</span>
          </p>
          <p>
            <span className="text-slate-400">Confidence Level:</span> <span className="font-semibold">{Math.round(result.confidence * 100)}%</span>
          </p>
          <p>
            <span className="text-slate-400">Overall Risk:</span> <span className="font-semibold">{result.risk_category}</span>
          </p>
          <p>
            <span className="text-slate-400">Model:</span> <span className="font-semibold">{result.model_used}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
