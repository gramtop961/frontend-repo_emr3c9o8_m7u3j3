import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import AppWindow from './components/AppWindow';
import NavigationBar from './components/NavigationBar';
import StatusBar from './components/StatusBar';

export default function App() {
  const [currentApp, setCurrentApp] = useState(null);
  const [recents, setRecents] = useState([]);
  const [showRecents, setShowRecents] = useState(false);

  const openApp = (name) => {
    setCurrentApp(name);
    setRecents((r) => [name, ...r.filter((x) => x !== name)].slice(0, 8));
    setShowRecents(false);
  };

  const goHome = () => {
    setCurrentApp(null);
    setShowRecents(false);
  };

  const goBack = () => {
    if (currentApp) {
      setCurrentApp(null);
    } else if (showRecents) {
      setShowRecents(false);
    }
  };

  const toggleRecents = () => setShowRecents((v) => !v);

  const RecentCard = ({ name }) => (
    <button
      onClick={() => {
        openApp(name);
      }}
      className="rounded-2xl bg-white/10 backdrop-blur p-4 text-white cursor-pointer hover:bg-white/20 transition text-left"
    >
      <div className="text-xs opacity-70">App</div>
      <div className="text-lg font-semibold">{name}</div>
    </button>
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Wallpaper lives on the HomeScreen behind everything */}
      <HomeScreen onOpen={openApp} />

      {/* Running App Window */}
      {currentApp && (
        <AppWindow app={currentApp} onClose={() => setCurrentApp(null)} />
      )}

      {/* Recents overlay */}
      {showRecents && (
        <div className="absolute inset-0 z-40 p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-black/50 backdrop-blur">
          {recents.length === 0 ? (
            <div className="col-span-full flex items-center justify-center text-white/80">No recent apps</div>
          ) : (
            recents.map((r, i) => <RecentCard name={r} key={r + i} />)
          )}
        </div>
      )}

      {/* Global status bar */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <StatusBar />
      </div>

      {/* System navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <NavigationBar onBack={goBack} onHome={goHome} onRecents={toggleRecents} />
      </div>
    </div>
  );
}
