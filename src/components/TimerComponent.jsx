"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Square } from "lucide-react"
import Swal from "sweetalert2"

const TimerComponent = ({ timeEstimate, taskTitle }) => {
  // Estado para el tiempo restante en segundos
  const [timeLeft, setTimeLeft] = useState(0)
  // Estado para controlar si el temporizador está activo
  const [isActive, setIsActive] = useState(false)
  // Referencia para el elemento de audio
  const audioRef = useRef(null)

  // Función para convertir el formato de tiempo (ej: "1h 30m") a segundos
  const parseTimeEstimate = (timeString) => {
    let totalSeconds = 0

    // Buscar horas
    const hoursMatch = timeString.match(/(\d+)\s*h/)
    if (hoursMatch) {
      totalSeconds += Number.parseInt(hoursMatch[1]) * 3600
    }

    // Buscar minutos
    const minutesMatch = timeString.match(/(\d+)\s*m/)
    if (minutesMatch) {
      totalSeconds += Number.parseInt(minutesMatch[1]) * 60
    }

    // Si no hay coincidencias, intentar interpretar como minutos
    if (!hoursMatch && !minutesMatch) {
      const justNumber = timeString.match(/(\d+)/)
      if (justNumber) {
        totalSeconds = Number.parseInt(justNumber[1]) * 60
      }
    }

    return totalSeconds
  }

  // Inicializar el temporizador cuando cambia timeEstimate
  useEffect(() => {
    setTimeLeft(parseTimeEstimate(timeEstimate))
  }, [timeEstimate])

  // Efecto para manejar el temporizador
  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      // Reproducir sonido
      if (audioRef.current) {
        audioRef.current.play()
      }

      // Mostrar alerta
      Swal.fire({
        title: "¡Tiempo completado!",
        text: `La tarea "${taskTitle}" ha finalizado.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        // Detener el sonido cuando se cierra la alerta
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      })
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, taskTitle])

  // Función para formatear segundos a formato legible (HH:MM:SS)
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return [h > 0 ? h : null, h > 0 ? (m < 10 ? "0" + m : m) : m, s < 10 ? "0" + s : s].filter(Boolean).join(":")
  }

  // Iniciar o pausar el temporizador
  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  // Reiniciar el temporizador
  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(parseTimeEstimate(timeEstimate))

    // Detener el sonido si está reproduciéndose
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="font-mono text-sm bg-background px-3 py-1.5 rounded-md">{formatTime(timeLeft)}</div>

      <div className="flex gap-1">
        <button
          onClick={toggleTimer}
          className={`p-1.5 rounded-md hover:bg-muted ${isActive ? "text-yellow-500" : "text-primary"}`}
          aria-label={isActive ? "Pausar temporizador" : "Iniciar temporizador"}
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          onClick={resetTimer}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-muted"
          aria-label="Reiniciar temporizador"
        >
          <Square size={16} />
        </button>
      </div>

      {/* Elemento de audio oculto */}
      <audio ref={audioRef} src="/sounds/alarm.mp3" />
    </div>
  )
}

export default TimerComponent