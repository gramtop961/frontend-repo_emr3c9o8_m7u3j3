export default function AppIcon({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 transition-colors"
    >
      <div className="w-10 h-10 grid place-items-center rounded-lg bg-gradient-to-br from-white/20 to-white/5 text-white">
        {icon}
      </div>
      <span className="text-xs text-white/90">{label}</span>
    </button>
  );
}
