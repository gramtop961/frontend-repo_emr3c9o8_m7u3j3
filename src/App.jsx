import { useEffect, useMemo, useState } from 'react';
import StatusBar from './components/StatusBar.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import AppWindow from './components/AppWindow.jsx';
import NavigationBar from './components/NavigationBar.jsx';
import { X } from 'lucide-react';

const ALL_APPS = ['Clock', 'Calculator', 'Notes', 'Camera', 'Settings'];

export default function App() {
  const [currentApp, setCurrentApp] = useState(null); // string | null
  const [recents, setRecents] = useState([]); // string[]
  const [showRecents, setShowRecents] = useState(false);

  // persist recents between sessions for nicer UX
  useEffect(() => {
    try {
      const saved = localStorage.getItem('os_recents');
      if (saved) setRecents(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('os_recents', JSON.stringify(recents.slice(0, 8)));
    } catch {}
  }, [recents]);

  const openApp = (app) => {
    if (!ALL_APPS.includes(app)) return;
    setCurrentApp(app);
    setShowRecents(false);
    setRecents((prev) => {
      const next = [app, ...prev.filter((a) => a !== app)];
      return next.slice(0, 8);
    });
  };

  const goHome = () => {
    setCurrentApp(null);
    setShowRecents(false);
  };

  const goBack = () => {
    if (currentApp) {
      goHome();
    }
  };

  const toggleRecents = () => setShowRecents((s) => !s);

  const closeRecent = (app) => {
    setRecents((prev) => prev.filter((a) => a !== app));
    if (currentApp === app) {
      goHome();
    }
  };

  const recentCards = useMemo(() => recents.map((app) => ({ key: app, title: app })), [recents]);

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">
      <StatusBar />

      {!currentApp && (
        <HomeScreen onOpenApp={openApp} />
      )}

      {currentApp && (
        <AppWindow appName={currentApp} onBack={goBack} />
      )}

      {showRecents && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex flex-col pt-16 pb-24">
          <div className="px-4 mb-2 text-sm text-white/70">Recents</div>
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recentCards.length === 0 && (
                <div className="col-span-full text-center text-white/60">No recent apps</div>
              )}
              {recentCards.map((card) => (
                <div key={card.key} className="relative bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
                  <button
                    onClick={() => openApp(card.title)}
                    className="w-full h-36 flex items-center justify-center text-lg font-medium"
                  >
                    {card.title}
                  </button>
                  <button
                    aria-label={`Close ${card.title}`}
                    onClick={() => closeRecent(card.title)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <NavigationBar
        onBack={goBack}
        onHome={goHome}
        onRecents={toggleRecents}
        hasActiveApp={!!currentApp}
      />
    </div>
  );
}
