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
      <header className="header">
        <h1 className="title">Dager siden forrige helg</h1>
      </header>

      <div className="timer-grid">
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.days}</div>
          <div className="timer-label">Dager</div>
        </div>
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.hours}</div>
          <div className="timer-label">Timer</div>
        </div>
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.minutes}</div>
          <div className="timer-label">Minutter</div>
        </div>
        <div className="timer-unit">
          <div className="timer-value">{timeElapsed.seconds}</div>
          <div className="timer-label">Sekunder</div>
        </div>
      </div>
    </div>
  )
}

export default App
