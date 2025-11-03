import { useState } from 'react';

const buttons = [
  '7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'
];

export default function CalculatorApp() {
  const [input, setInput] = useState('');

  const onPress = (val) => {
    if (val === '=') {
      try {
        // Evaluate safely by allowing only numbers and operators
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${input || 0})`)();
        setInput(String(result));
      } catch {
        setInput('Error');
      }
      return;
    }
    setInput((prev) => (prev === 'Error' ? String(val) : prev + String(val)));
  };

  const clear = () => setInput('');

  return (
    <div className="max-w-sm mx-auto text-white">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
        <div className="text-right text-3xl min-h-[2.5rem] break-words">{input || '0'}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30">Clear</button>
        {buttons.map((b) => (
          <button
            key={b}
            onClick={() => onPress(b)}
            className={`py-3 rounded-lg border transition ${isNaN(b) && b !== '.' ? 'bg-blue-500/20 border-blue-500/30 hover:bg-blue-500/30' : 'bg-white/10 border-white/10 hover:bg-white/20'}`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
