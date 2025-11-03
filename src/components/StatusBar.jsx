import { useEffect, useState } from 'react';
import { Wifi, Battery } from 'lucide-react';

export default function StatusBar() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}`);
    };
    update();
    const id = setInterval(update, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-12 px-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent text-white">
      <div className="font-medium tracking-wide">{timeStr}</div>
      <div className="flex items-center gap-3 text-white/80">
        <Wifi className="w-5 h-5" />
        <Battery className="w-5 h-5" />
      </div>
    </div>
  );
}
