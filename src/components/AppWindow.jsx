import ClockApp from './ClockApp.jsx';
import CalculatorApp from './CalculatorApp.jsx';
import NotesApp from './NotesApp.jsx';
import CameraApp from './CameraApp.jsx';
import SettingsApp from './SettingsApp.jsx';
import { ChevronLeft } from 'lucide-react';

export default function AppWindow({ appName, onBack }) {
  const renderApp = () => {
    switch (appName) {
      case 'Clock':
        return <ClockApp />;
      case 'Calculator':
        return <CalculatorApp />;
      case 'Notes':
        return <NotesApp />;
      case 'Camera':
        return <CameraApp />;
      case 'Settings':
        return <SettingsApp />;
      default:
        return (
          <div className="flex-1 grid place-items-center text-white/70">Coming soon</div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col pt-12 pb-20">
      <div className="px-4 flex items-center gap-2 text-white/90">
        <button onClick={onBack} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10" aria-label="Back">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="font-medium">{appName}</div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div className="h-full w-full">
          {renderApp()}
        </div>
      </div>
    </div>
  );
}
