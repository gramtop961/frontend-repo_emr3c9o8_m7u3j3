import React, { useEffect, useMemo, useState } from 'react';

function ClockApp() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="p-6 text-center">
      <div className="text-6xl font-bold text-white drop-shadow-sm">
        {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      <div className="mt-2 text-white/80">{now.toDateString()}</div>
    </div>
  );
}

function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [lastOp, setLastOp] = useState(null);
  const [acc, setAcc] = useState(null);

  const input = (val) => {
    setDisplay((d) => (d === '0' && val !== '.' ? String(val) : d + String(val)));
  };

  const clearAll = () => {
    setDisplay('0');
    setLastOp(null);
    setAcc(null);
  };

  const operate = (op) => {
    const current = parseFloat(display);
    if (acc === null) {
      setAcc(current);
    } else if (lastOp) {
      const res = calc(acc, current, lastOp);
      setAcc(res);
      setDisplay('0');
    }
    setLastOp(op);
    setDisplay('0');
  };

  const equals = () => {
    const current = parseFloat(display);
    const result = calc(acc ?? 0, current, lastOp ?? '+');
    setDisplay(String(result));
    setAcc(null);
    setLastOp(null);
  };

  const calc = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const buttons = useMemo(
    () => [
      'C', '÷', '×', '⌫',
      '7', '8', '9', '-',
      '4', '5', '6', '+',
      '1', '2', '3', '=',
      '0', '.',
    ],
    []
  );

  const onPress = (b) => {
    if (b === 'C') return clearAll();
    if (b === '⌫') return setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : '0'));
    if (['+', '-', '×', '÷'].includes(b)) return operate(b);
    if (b === '=') return equals();
    if (b === '.' && display.includes('.')) return;
    input(b);
  };

  return (
    <div className="p-4">
      <div className="text-right text-4xl font-semibold text-white mb-4 h-12">{display}</div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((b) => (
          <button
            key={b}
            onClick={() => onPress(b)}
            className={`rounded-xl py-4 text-lg font-medium backdrop-blur bg-white/10 text-white hover:bg-white/20 transition ${b === '=' ? 'col-span-1 bg-blue-500 hover:bg-blue-600' : ''} ${b === '0' ? 'col-span-2' : ''}`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

function NotesApp() {
  const [text, setText] = useState(() => localStorage.getItem('notes') || '');
  useEffect(() => {
    localStorage.setItem('notes', text);
  }, [text]);
  return (
    <div className="p-4 h-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes..."
        className="w-full h-full resize-none rounded-xl p-4 bg-white/10 text-white placeholder-white/60 outline-none backdrop-blur"
      />
    </div>
  );
}

export default function AppWindow({ app, onClose }) {
  if (!app) return null;

  const renderContent = () => {
    switch (app) {
      case 'Clock':
        return <ClockApp />;
      case 'Calculator':
        return <CalculatorApp />;
      case 'Notes':
        return <NotesApp />;
      default:
        return (
          <div className="p-6 text-white/90">This app is coming soon.</div>
        );
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col rounded-[2.5rem] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur border-b border-white/10">
        <div className="text-white font-medium">{app}</div>
        <button onClick={onClose} className="text-white/80 hover:text-white px-3 py-1 rounded-full bg-white/10">Close</button>
      </div>
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}
