import { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, Image as ImageIcon, Trash2 } from 'lucide-react';

export default function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [facing, setFacing] = useState('user'); // 'user' | 'environment'
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState([]);

  const start = async () => {
    try {
      setError('');
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: facing }, audio: false });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      setError('Camera access denied or unavailable.');
    }
  };

  useEffect(() => {
    start();
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facing]);

  const toggleFacing = () => setFacing((f) => (f === 'user' ? 'environment' : 'user'));

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    const dataUrl = canvas.toDataURL('image/png');
    setPhotos((prev) => [dataUrl, ...prev]);
  };

  const clearPhotos = () => setPhotos([]);

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto_auto] gap-4">
      <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10">
        {error ? (
          <div className="absolute inset-0 grid place-items-center text-white/70 p-6 text-center">{error}</div>
        ) : (
          <video ref={videoRef} playsInline muted className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button onClick={toggleFacing} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Switch
        </button>
        <button onClick={capture} className="px-6 py-2 rounded-full bg-emerald-500/30 hover:bg-emerald-500/40 border border-emerald-500/40 flex items-center gap-2">
          <Camera className="w-5 h-5" /> Capture
        </button>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-white/80"><ImageIcon className="w-4 h-4" /> Gallery</div>
          {photos.length > 0 && (
            <button onClick={clearPhotos} className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
        {photos.length === 0 ? (
          <div className="text-white/60 text-sm">No photos yet.</div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {photos.map((src, i) => (
              <img key={i} src={src} alt={`capture-${i}`} className="w-full h-24 object-cover rounded-lg border border-white/10" />
            ))}
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
