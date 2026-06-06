import { useState, useEffect } from 'react'

const STAR_CHARS = ['✦', '✧', '⋆']
const STAR_COUNT = 18

interface Star {
  char: string
  left: number
  top: number
  size: number
  delay: number
  duration: number
}

const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
  char: STAR_CHARS[Math.floor(Math.random() * 3)],
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 7 + Math.random() * 8,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}))

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date('2026-07-24T00:00:00')
    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: timeLeft.days, label: 'Jours' },
    { value: timeLeft.hours, label: 'Heures' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Secondes' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Raleway:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes twinkle {
          0%,100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.3); }
        }

        .rc-root {
          min-height: 100svh;
          width: 100%;
          background: linear-gradient(160deg, #c1714f 0%, #b5603e 45%, #9e4f34 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem 1rem;
        }

        .rc-star {
          position: absolute;
          color: rgba(255,240,210,0.55);
          pointer-events: none;
          animation: twinkle var(--dur) var(--delay) ease-in-out infinite;
        }

        .rc-inner {
          position: relative;
          z-index: 1;
          text-align: center;
          width: 100%;
          max-width: 480px;
        }

        .rc-ornament {
          color: rgba(255,235,200,0.4);
          font-size: 11px;
          letter-spacing: 8px;
          margin-bottom: 0.7rem;
          font-family: 'Cormorant Garamond', serif;
        }

        .rc-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255,235,200,0.65);
          margin-bottom: 0.4rem;
        }

        .rc-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.55rem, 7vw, 2.2rem);
          color: rgba(255,243,220,0.95);
          margin-bottom: 2.2rem;
          line-height: 1.25;
        }

        /* 4 colonnes égales sur une seule ligne */
        .rc-units {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          width: 100%;
          gap: 0;
        }

        .rc-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 4px;
          position: relative;
        }

        /* séparateur entre unités */
        .rc-unit:not(:last-child)::after {
          content: '·';
          position: absolute;
          right: -2px;
          top: 10px;
          color: rgba(255,220,175,0.4);
          font-size: 1.4rem;
          font-family: 'Cormorant Garamond', serif;
          line-height: 1;
        }

        .rc-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          /* s'adapte à la largeur dispo : 4 colonnes = ~25vw chacune */
          font-size: clamp(2rem, 10vw, 3.8rem);
          color: rgba(255,243,215,0.97);
          line-height: 1;
          letter-spacing: -0.5px;
          white-space: nowrap;
        }

        .rc-lbl {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          font-size: clamp(7px, 2vw, 9px);
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,220,180,0.6);
          margin-top: 6px;
          white-space: nowrap;
        }

        .rc-date {
          margin-top: 2rem;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(0.8rem, 3.5vw, 1rem);
          color: rgba(255,230,200,0.5);
          letter-spacing: 1px;
        }
      `}</style>

      <div className="rc-root">
        {stars.map((star, i) => (
          <span
            key={i}
            className="rc-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              fontSize: `${star.size}px`,
              ['--dur' as any]: `${star.duration}s`,
              ['--delay' as any]: `${star.delay}s`,
            }}
          >
            {star.char}
          </span>
        ))}

        <div className="rc-inner">
          <div className="rc-ornament">— ✦ —</div>
          <div className="rc-eyebrow">Diarra la Queen</div>
          <h1 className="rc-title">Bientôt ton anniversaire</h1>

          <div className="rc-units">
            {units.map(({ value, label }) => (
              <div key={label} className="rc-unit">
                <span className="rc-num">{value.toString().padStart(2, '0')}</span>
                <span className="rc-lbl">{label}</span>
              </div>
            ))}
          </div>

          <div className="rc-date">24 Juillet 2026</div>
        </div>
      </div>
    </>
  )
}