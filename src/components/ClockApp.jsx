import { useEffect, useState } from 'react';

export default function ClockApp() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <div className="text-6xl font-semibold tracking-tight">{time}</div>
      <div className="mt-2 text-white/70">{date}</div>
    </div>
  );
}
