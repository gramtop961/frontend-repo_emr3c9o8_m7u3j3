import { useEffect, useState } from 'react';

const KEY = 'notes_app_content_v1';

export default function NotesApp() {
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setText(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try { localStorage.setItem(KEY, text); } catch {}
    }, 300);
    return () => clearTimeout(id);
  }, [text]);

  const clear = () => setText('');

  return (
    <div className="h-full w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-white/80 text-sm">Your notes are saved automatically</div>
        <button onClick={clear} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm">Clear</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        className="flex-1 w-full resize-none rounded-xl bg-white/5 border border-white/10 p-4 outline-none text-white placeholder:text-white/40"
      />
    </div>
  );
}
