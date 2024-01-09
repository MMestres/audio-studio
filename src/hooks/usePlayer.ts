import { useState, useEffect, useRef } from 'react'
import { usePlayerStore } from './usePlayerStore'
import { getAudios } from '@/data/audios'

export const usePlayer = () => {
  const ref = useRef<HTMLAudioElement>(null)
  const volumen = usePlayerStore((state) => state.volumen)
  const mute = usePlayerStore((state) => state.mute)
  const changeVolume = usePlayerStore((state) => state.changeVolume)
  const play = usePlayerStore((state) => state.play)
  const playing = usePlayerStore((state) => state.playing)
  const next = usePlayerStore((state) => state.next)
  const prev = usePlayerStore((state) => state.prev)
  const current = usePlayerStore((state) => state.current)
  const first = usePlayerStore((state) => state.first)
  const last = usePlayerStore((state) => state.last)
  const setAudios = usePlayerStore((state) => state.setAudios)
  const setCurrent = usePlayerStore((state) => state.setCurrent)

  const [currentTime, setCurrentTime] = useState(0)
  const [showVolume, setShowVolume] = useState(false)

  useEffect(() => {
    getAudios().then((audios) => {
      setAudios(audios)
      setCurrent(audios[0].id)
    }).catch(() => {})
  }, [setAudios, setCurrent])

  useEffect(() => {
    if (playing && current != null) {
      ref.current?.play().then(() => { }).catch(() => { })
    } else {
      ref.current?.pause()
    }
  }, [current, playing, ref])

  useEffect(() => {
    if (ref.current != null) {
      ref.current.volume = volumen / 100
    }
  }, [volumen, ref])

  const handleTimeUpdate = () => {
    setCurrentTime(ref.current?.currentTime ?? 0)
  }

  const handleUpdateCurrentTime = (seconds: number) => {
    if (ref.current != null) {
      ref.current.currentTime = seconds
    }

    setCurrentTime(seconds)
  }

  const secondsToTime = (seconds?: number) => {
    if (seconds == null || isNaN(seconds)) {
      return '0:00'
    }

    const minutes = Math.floor(seconds / 60)
    const secondsLeft = Math.floor(seconds % 60)
    return `${minutes}:${secondsLeft.toString().padStart(2, '0')}`
  }

  return {
    ref,
    volumen,
    mute,
    changeVolume,
    play,
    playing,
    next,
    prev,
    current,
    first,
    last,
    currentTime,
    showVolume,
    setShowVolume,
    handleTimeUpdate,
    handleUpdateCurrentTime,
    currentTimeString: secondsToTime(ref?.current?.currentTime),
    durationTimeString: secondsToTime(ref?.current?.duration)
  }
}
