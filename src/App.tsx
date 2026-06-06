import { useState, useEffect } from 'react'

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Date cible : 24 juillet 2026
    const targetDate = new Date('2026-07-24T00:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 min-w-[80px] sm:min-w-[100px]">
        <span className="text-4xl sm:text-6xl md:text-7xl font-light text-rose-600">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs sm:text-sm uppercase tracking-widest text-rose-400 mt-3 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 flex flex-col items-center justify-center font-sans p-4">
      <div className="max-w-3xl w-full text-center">
        {/* Petit cœur qui flotte */}
        <div className="text-6xl sm:text-7xl mb-6 animate-pulse">
          💕
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-rose-700 mb-4 tracking-wide">
          Mon amour, dans...
        </h1>
        
        {/* Compte à rebours principal */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-8">
          <TimeUnit value={timeLeft.days} label="Jours" />
          <TimeUnit value={timeLeft.hours} label="Heures" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Secondes" />
        </div>

        {/* Message romantique léger */}
        <div className="mt-12 space-y-2">
          <p className="text-rose-500 text-sm sm:text-base font-light italic">
            jusqu'à ton jour spécial ❤️
          </p>
          <div className="text-rose-300 text-xs sm:text-sm font-light">
            24 Juillet 2026
          </div>
        </div>

        {/* Petits cœurs décoratifs */}
        <div className="fixed bottom-4 left-0 right-0 text-center opacity-30">
          <span className="text-rose-300 text-sm">❤️</span>
          <span className="text-rose-300 text-sm mx-2">❤️</span>
          <span className="text-rose-300 text-sm">❤️</span>
        </div>
      </div>
    </div>
  )
}

export default App