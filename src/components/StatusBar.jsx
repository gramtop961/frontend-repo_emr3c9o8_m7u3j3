import React, { useEffect, useState } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-center justify-between px-4 py-2 text-white/90">
      <div className="text-sm font-medium tracking-wide">{timeStr}</div>
      <div className="flex items-center gap-2">
        <Signal size={16} />
        <Wifi size={16} />
        <Battery size={16} />
      </div>
    </div>
  );
}
