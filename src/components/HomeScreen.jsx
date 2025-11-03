import { Calendar, Camera, Clock, Cog, FileText, Calculator as CalcIcon } from 'lucide-react';
import AppIcon from './AppIcon.jsx';

export default function HomeScreen({ onOpenApp }) {
  const now = new Date();
  const day = now.toLocaleDateString(undefined, { weekday: 'long' });
  const date = now.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(59,130,246,0.25),rgba(16,185,129,0.2)_60%,transparent)]" />
      <div className="absolute inset-0 bg-[conic-gradient(at_50%_120%,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="relative h-full w-full flex flex-col pt-14 pb-24 px-4">
        <div className="flex items-center justify-between text-white/90 mb-6">
          <div className="text-left">
            <div className="text-2xl font-semibold">{day}</div>
            <div className="text-sm text-white/70">{date}</div>
          </div>
          <Calendar className="w-6 h-6" />
        </div>

        <div className="grid grid-cols-4 gap-4 flex-1 content-start">
          <AppIcon label="Clock" icon={<Clock className="w-5 h-5" />} onClick={() => onOpenApp('Clock')} />
          <AppIcon label="Calculator" icon={<CalcIcon className="w-5 h-5" />} onClick={() => onOpenApp('Calculator')} />
          <AppIcon label="Notes" icon={<FileText className="w-5 h-5" />} onClick={() => onOpenApp('Notes')} />
          <AppIcon label="Camera" icon={<Camera className="w-5 h-5" />} onClick={() => onOpenApp('Camera')} />
          <AppIcon label="Settings" icon={<Cog className="w-5 h-5" />} onClick={() => onOpenApp('Settings')} />
        </div>

        <div className="mt-6">
          <div className="mx-auto max-w-sm bg-white/5 border border-white/10 rounded-2xl p-4 text-white/80">
            <div className="text-sm">Tip</div>
            <div className="text-xs text-white/60">Use the bottom buttons for Back, Home, and Recents. You can close items from Recents.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
