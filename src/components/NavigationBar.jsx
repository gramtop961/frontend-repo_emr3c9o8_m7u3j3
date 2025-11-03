import { ChevronLeft, Home, Square } from 'lucide-react';

export default function NavigationBar({ onBack, onHome, onRecents, hasActiveApp }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-3xl">
        <div className="m-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-around py-3 text-white">
            <button
              onClick={onBack}
              className="p-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition"
              aria-label="Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onHome}
              className="p-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition"
              aria-label="Home"
            >
              <Home className="w-6 h-6" />
            </button>
            <button
              onClick={onRecents}
              className="p-3 rounded-xl hover:bg-white/10 active:bg-white/20 transition"
              aria-label="Recents"
            >
              <Square className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
