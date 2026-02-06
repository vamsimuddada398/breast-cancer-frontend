import React, { useRef, useState, useCallback } from 'react'

interface ImageUploaderProps {
  onUpload: (file: File) => void
  loading: boolean
  imagePreview: string | null
}

export default function ImageUploader({
  onUpload,
  loading,
  imagePreview,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Zoom and pan state
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [showZoomedView, setShowZoomedView] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    // Reset zoom and pan when new image is uploaded
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setShowZoomedView(false)

    onUpload(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please drop a valid image file')
      return
    }

    // Reset zoom and pan when new image is uploaded
    setZoom(1)
    setPan({ x: 0, y: 0 })
    setShowZoomedView(false)

    onUpload(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom(prev => Math.max(0.5, Math.min(5, prev * delta)))
  }, [])

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const toggleZoomedView = () => {
    setShowZoomedView(!showZoomedView)
    if (!showZoomedView) {
      // Reset to fit when opening zoomed view
      setZoom(1)
      setPan({ x: 0, y: 0 })
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        ref={containerRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-blue-500 transition-all duration-200 cursor-pointer bg-slate-700/20 hover:bg-slate-700/30 mx-auto max-w-lg"
        onClick={() => !imagePreview && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="hidden"
        />

        {imagePreview ? (
          <div className="space-y-4">
            {/* Image Display with Zoom/Pan */}
            <div
              className="relative overflow-hidden rounded-lg bg-slate-800 border border-slate-600 mx-auto"
              style={{ 
                height: showZoomedView ? '350px' : '280px',
                maxWidth: showZoomedView ? '100%' : '350px'
              }}
              onWheel={handleWheel}
            >
              <img
                ref={imageRef}
                src={imagePreview}
                alt="Uploaded mammogram"
                className={`w-full h-full object-contain transition-transform duration-200 cursor-${zoom > 1 ? 'grab' : 'default'} ${isDragging ? 'cursor-grabbing' : ''}`}
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: 'center center',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                draggable={false}
              />

              {/* Zoom Controls Overlay */}
              {imagePreview && (
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                    className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700/80 rounded-full flex items-center justify-center text-white transition-colors"
                    title="Zoom In"
                  >
                    <span className="text-lg">+</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                    className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700/80 rounded-full flex items-center justify-center text-white transition-colors"
                    title="Zoom Out"
                  >
                    <span className="text-lg">−</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleResetZoom(); }}
                    className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700/80 rounded-full flex items-center justify-center text-white transition-colors"
                    title="Reset Zoom"
                  >
                    <span className="text-sm">⭯</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleZoomedView(); }}
                    className="w-8 h-8 bg-blue-600/80 hover:bg-blue-500/80 rounded-full flex items-center justify-center text-white transition-colors"
                    title={showZoomedView ? "Minimize View" : "Maximize View"}
                  >
                    <span className="text-sm">{showZoomedView ? '⤢' : '⤡'}</span>
                  </button>
                </div>
              )}

              {/* Zoom Level Indicator */}
              {zoom !== 1 && (
                <div className="absolute bottom-4 left-4 bg-slate-800/80 rounded-lg px-3 py-1 text-white text-sm">
                  {Math.round(zoom * 100)}%
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                {zoom > 1 ? 'Drag to pan • Scroll to zoom' : 'Click to replace or drag and drop'}
              </p>
              <div className="text-xs text-slate-500">
                Zoom: {Math.round(zoom * 100)}%
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">📁</div>
            <div>
              <p className="text-white font-semibold text-xl mb-2">
                Drag & drop your mammogram
              </p>
              <p className="text-slate-400 text-sm mb-4">
                or click to select an image
              </p>
              <p className="text-xs text-slate-500">
                Supported: JPEG, PNG, DICOM (max 10MB)
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white font-medium">Uploading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload Instructions */}
      <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 mx-auto max-w-lg">
        <h3 className="font-semibold text-white mb-3 text-center">Guidelines</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>✓ Use high-quality mammogram images</li>
          <li>✓ Ensure proper image resolution (minimum 224x224)</li>
          <li>✓ Support for grayscale and color mammograms</li>
          <li>✓ Image is processed locally with CLAHE enhancement</li>
          <li>✓ Zoom and pan to examine details closely</li>
        </ul>
      </div>
    </div>
  )
}
