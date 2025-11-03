import React, { useMemo, useState } from 'react';
import HomeScreen from './components/HomeScreen';
import AppWindow from './components/AppWindow';
import NavigationBar from './components/NavigationBar';
import StatusBar from './components/StatusBar';

function PhoneFrame({ children }) {
  return (
    <div className="relative w-[360px] h-[740px] rounded-[3rem] shadow-2xl border border-black/30 overflow-hidden bg-black">
      {/* Glass edge */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(255,255,255,0.2)] rounded-[3rem]" />
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 flex justify-center pt-2 z-30">
        <div className="h-6 w-40 bg-black rounded-b-3xl" />
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [currentApp, setCurrentApp] = useState(null);
  const [recents, setRecents] = useState([]);
  const [showRecents, setShowRecents] = useState(false);

  const openApp = (name) => {
    setCurrentApp(name);
    setRecents((r) => [name, ...r.filter((x) => x !== name)].slice(0, 6));
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
    <div
      onClick={() => {
        openApp(name);
        setShowRecents(false);
      }}
      className="rounded-2xl bg-white/10 backdrop-blur p-4 text-white cursor-pointer hover:bg-white/20 transition"
    >
      <div className="text-sm opacity-80">App</div>
      <div className="text-xl font-semibold">{name}</div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex items-center justify-center p-6">
      <PhoneFrame>
        {/* Wallpapered Home */}
        <HomeScreen onOpen={openApp} />

        {/* Running App Window */}
        {currentApp && (
          <AppWindow app={currentApp} onClose={() => setCurrentApp(null)} />
        )}

        {/* Recents overlay */}
        {showRecents && (
          <div className="absolute inset-0 z-30 p-4 grid grid-cols-2 gap-4 bg-black/40 backdrop-blur">
            {recents.length === 0 ? (
              <div className="col-span-2 flex items-center justify-center text-white/80">No recent apps</div>
            ) : (
              recents.map((r, i) => <RecentCard name={r} key={r + i} />)
            )}
          </div>
        )}

        {/* StatusBar duplicated for top overlay when app open to mimic Android */}
        <div className="absolute top-0 left-0 right-0 z-40">
          <StatusBar />
        </div>

        {/* Navigation bar */}
        <div className="absolute bottom-0 left-0 right-0 z-40">
          <NavigationBar onBack={goBack} onHome={goHome} onRecents={toggleRecents} />
        </div>
      </PhoneFrame>
    </div>
  );
}
