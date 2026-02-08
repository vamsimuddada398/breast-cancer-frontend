export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <center>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center justify-center gap-3">
            <span className="text-5xl">🔬</span>
            Breast Cancer Detection
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 mt-3 text-base md:text-lg max-w-2xl">
            AI-powered mammography analysis using advanced deep learning models
          </p>

          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mt-6 mb-4"></div>

          {/* Meta Info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
              EfficientNet-B3
            </span>
            <span className="px-4 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/30">
              Medical AI System v1.0
            </span>
            <span className="px-4 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
              Research & Screening Support
            </span>
          </div>
        </center>
      </div>
    </header>
  );
}
