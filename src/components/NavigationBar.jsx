import React from 'react';
import { Circle, Square, ChevronLeft } from 'lucide-react';

export default function NavigationBar({ onBack, onHome, onRecents }) {
  return (
    <div className="h-16 w-full flex items-center justify-around text-white/90 bg-gradient-to-t from-black/50 to-transparent backdrop-blur">
      <button aria-label="Back" onClick={onBack} className="p-3 active:scale-95 transition">
        <ChevronLeft />
      </button>
      <button aria-label="Home" onClick={onHome} className="p-3 active:scale-95 transition">
        <Circle />
      </button>
      <button aria-label="Recents" onClick={onRecents} className="p-3 active:scale-95 transition">
        <Square />
      </button>
    </div>
  );
}
