export default function Header() {
  return (
    <header className="bg-slate-900/80 backdrop-blur border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              🔬 Breast Cancer Detection
            </h1>
            <p className="text-slate-300 mt-2">
              AI-powered mammography analysis using deep learning
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-slate-400">EfficientNetB3</p>
            <p className="text-xs text-slate-500">Medical AI System v1.0</p>
          </div>
        </div>
      </div>
    </header>
  )
}
