import { PredictionResult } from "../../index";

interface PredictionResultsProps {
  result: PredictionResult;
}

export default function PredictionResults({ result }: PredictionResultsProps) {
  const isMalignant = result.prediction === "malignant";

  const getRiskColor = (category: string) => {
    switch (category) {
      case "Very High Risk":
        return {
          bg: "bg-red-500",
          light: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
        };
      case "High Risk":
        return {
          bg: "bg-orange-500",
          light: "bg-orange-50",
          border: "border-orange-200",
          text: "text-orange-700",
        };
      case "Moderate Risk":
        return {
          bg: "bg-amber-500",
          light: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
        };
      case "Low Risk":
        return {
          bg: "bg-emerald-500",
          light: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-700",
        };
      default:
        return {
          bg: "bg-blue-500",
          light: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
        };
    }
  };

  const getRiskBarColor = (score: number) => {
    if (score < 0.25) return "bg-emerald-500";
    if (score < 0.5) return "bg-amber-500";
    if (score < 0.75) return "bg-orange-500";
    return "bg-red-500";
  };

  const riskColors = getRiskColor(result.risk_category);
  const benignPct = (result.probabilities.benign * 100).toFixed(1);
  const malignantPct = (result.probabilities.malignant * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Main Prediction Banner */}
      <div
        className={`rounded-xl p-5 border-2 ${
          isMalignant
            ? "bg-red-50 border-red-200"
            : "bg-emerald-50 border-emerald-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
              AI Prediction
            </p>
            <h2
              className={`text-2xl font-bold capitalize ${
                isMalignant ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {result.prediction}
            </h2>
          </div>
          <div className="text-4xl">{isMalignant ? "⚠️" : "✓"}</div>
        </div>
      </div>

      {/* Confidence & Risk - Compact Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Confidence</p>
          <div className="relative w-20 h-20 mx-auto">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeDasharray={`${result.confidence * 100}, 100`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">Risk Score</p>
          <p className="text-2xl font-bold text-gray-800">
            {(result.risk_score * 100).toFixed(1)}%
          </p>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${getRiskBarColor(
                result.risk_score
              )}`}
              style={{ width: `${result.risk_score * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Risk Category Badge */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${riskColors.light} ${riskColors.border} border`}
      >
        <div className={`w-2 h-2 rounded-full ${riskColors.bg}`} />
        <span className={riskColors.text}>{result.risk_category}</span>
      </div>

      {/* Probability Distribution - Modern Bar Chart */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">
          Probability Distribution
        </h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-gray-600">Benign</span>
              <span className="font-bold text-emerald-600">{benignPct}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${benignPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-gray-600">Malignant</span>
              <span className="font-bold text-red-600">{malignantPct}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-700"
                style={{ width: `${malignantPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Gauge - Semi-circle */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">
          Risk Level Gauge
        </h4>
        <div className="relative mx-auto" style={{ width: 200, height: 110 }}>
          <svg
            viewBox="0 0 200 110"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="33%" stopColor="#eab308" />
                <stop offset="66%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M 20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="url(#gaugeGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${result.risk_score * 251.2} 251.2`}
              className="transition-all duration-700"
            />
            <line
              x1="100"
              y1="90"
              x2={100 - 70 * Math.cos(result.risk_score * Math.PI)}
              y2={90 - 70 * Math.sin(result.risk_score * Math.PI)}
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            <circle cx="100" cy="90" r="4" fill="#374151" />
          </svg>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h4 className="text-sm font-semibold text-blue-900 mb-3">
            Recommendations
          </h4>
          <ul className="space-y-2 text-sm text-blue-800">
            {result.recommendations.slice(0, 3).map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metadata */}
      <div className="flex justify-between text-xs text-gray-400 pt-2">
        <span>Model: {result.model_used}</span>
        <span>{new Date(result.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
