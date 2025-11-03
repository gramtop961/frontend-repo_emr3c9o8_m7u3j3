import { useEffect, useState } from 'react';

const KEY = 'settings_app_v1';

export default function SettingsApp() {
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    sounds: true,
    theme: 'system', // system | light | dark
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setSettings(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(settings)); } catch {}
  }, [settings]);

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <div className="max-w-lg mx-auto text-white space-y-4">
      <Card title="Network">
        <Row label="Wi‑Fi" value={settings.wifi} onChange={() => toggle('wifi')} />
        <Row label="Bluetooth" value={settings.bluetooth} onChange={() => toggle('bluetooth')} />
      </Card>

      <Card title="Sound">
        <Row label="Sounds" value={settings.sounds} onChange={() => toggle('sounds')} />
      </Card>

      <Card title="Appearance">
        <div className="grid grid-cols-3 gap-2">
          {['system','light','dark'].map((t) => (
            <button
              key={t}
              onClick={() => setSettings((s) => ({ ...s, theme: t }))}
              className={`px-3 py-2 rounded-lg border ${settings.theme === t ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-xs text-white/60 mt-2">Theme preference is saved locally.</div>
      </Card>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <div className="text-sm text-white/80 mb-3">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-white/90">{label}</div>
      <button onClick={onChange} className={`w-12 h-7 rounded-full border relative transition ${value ? 'bg-emerald-500/40 border-emerald-400/40' : 'bg-white/10 border-white/10'}`}>
        <div className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white transition ${value ? 'translate-x-[26px]' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}
