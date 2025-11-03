import React from 'react';

export default function AppIcon({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 active:scale-95 transition"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white shadow-inner">
        <Icon size={28} />
      </div>
      <span className="text-[11px] text-white/90">{label}</span>
    </button>
  );
}
