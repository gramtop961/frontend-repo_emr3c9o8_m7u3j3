import React from 'react';
import { Phone, MessageSquare, Camera, Settings, Clock, Calculator, FileText } from 'lucide-react';
import AppIcon from './AppIcon';

export default function HomeScreen({ onOpen }) {
  const apps = [
    { label: 'Phone', icon: Phone, action: () => alert('Dialer mock: not implemented') },
    { label: 'Messages', icon: MessageSquare, action: () => alert('Messages mock: not implemented') },
    { label: 'Camera', icon: Camera, action: () => alert('Camera mock: not implemented') },
    { label: 'Settings', icon: Settings, action: () => alert('Settings mock: not implemented') },
    { label: 'Clock', icon: Clock, action: () => onOpen('Clock') },
    { label: 'Calculator', icon: Calculator, action: () => onOpen('Calculator') },
    { label: 'Notes', icon: FileText, action: () => onOpen('Notes') },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent,rgba(0,0,0,0.25))]" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Widgets area */}
        <div className="px-6 pt-14">{/* pad for status bar */}
          <div className="rounded-3xl p-4 bg-white/10 backdrop-blur text-white shadow-sm">
            <div className="text-sm opacity-80">Weather</div>
            <div className="text-xl font-semibold">72°F • Sunny</div>
          </div>
        </div>

        {/* App grid */}
        <div className="flex-1 grid grid-cols-4 gap-4 px-6 py-6 place-content-start">
          {apps.map((app) => (
            <AppIcon key={app.label} icon={app.icon} label={app.label} onClick={app.action} />)
          )}
        </div>

        {/* Dock */}
        <div className="px-10 pb-20">{/* pad for nav bar */}
          <div className="mx-auto max-w-[22rem] rounded-3xl bg-black/30 backdrop-blur flex items-center justify-around py-3 text-white">
            <AppIcon icon={Phone} label="Phone" onClick={() => alert('Dialer mock: not implemented')} />
            <AppIcon icon={MessageSquare} label="Messages" onClick={() => alert('Messages mock: not implemented')} />
            <AppIcon icon={Camera} label="Camera" onClick={() => alert('Camera mock: not implemented')} />
            <AppIcon icon={Settings} label="Settings" onClick={() => alert('Settings mock: not implemented')} />
          </div>
        </div>
      </div>
    </div>
  );
}
