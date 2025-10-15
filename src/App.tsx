import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const getLastSunday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysToSubtract = dayOfWeek === 0 ? 7 : dayOfWeek
    const lastSunday = new Date(today)
    lastSunday.setDate(today.getDate() - daysToSubtract)
    lastSunday.setHours(23, 59, 59, 999)
    return lastSunday
  }

  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const start = getLastSunday().getTime()
      const now = Date.now()
      const diff = now - start

      if (diff < 0) {
        setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <div className="scribbles"></div>
      <div className="scribbles scribbles-2"></div>
      <div className="scribbles scribbles-3"></div>

      <header className="header">
        <h1 className="title">DAGER siden FORRIGE helg</h1>
        <div className="subtitle">hvorfor hvorfor hvorfor hvorfor</div>
      </header>

      <div className="timer-grid">
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.days}</div>
          <div className="timer-label">DAGER</div>
          <div className="tally-marks">
            {Array.from({ length: Math.min(timeElapsed.days, 50) }).map((_, i) => (
              <span key={i} className="tally">|</span>
            ))}
          </div>
        </div>
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.hours}</div>
          <div className="timer-label">TIMER</div>
          <div className="scratch-text">tik tok tik tok</div>
        </div>
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.minutes}</div>
          <div className="timer-label">MINUTTER</div>
          <div className="scratch-text">aldri slutt</div>
        </div>
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.seconds}</div>
          <div className="timer-label">SEKUNDER</div>
          <div className="scratch-text">hjelp meg</div>
        </div>
      </div>

      <div className="ramblings">
        <p>Er det fredag enda? Er det fredag enda? Er det fredag enda?</p>
        <p className="desperate">FREDAG FREDAG FREDAG</p>
      </div>
    </div>
  )
}

export default App
