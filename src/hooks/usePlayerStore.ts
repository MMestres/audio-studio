import { create } from 'zustand'

import { type Audio } from '@/types/Audio'

interface PlayerStore {
  audios: Audio[]
  playing: boolean
  currentIndex: number
  volumen: number
  prevVolulmen: number
  current: Audio | undefined
  first: boolean
  last: boolean
  mute: () => void
  changeVolume: (volume: number) => void
  setCurrent: (id: string) => boolean
  play: () => void
  playID: (id: string) => void
  next: () => void
  prev: () => void
  setAudios: (audios: Audio[]) => void
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  audios: [],
  currentIndex: 0,
  playing: false,
  volumen: 50,
  prevVolulmen: 50,
  current: undefined,
  first: true,
  last: false,
  mute: () => {
    set((state) => {
      if (state.volumen === 0) {
        return { ...state, volumen: state.prevVolulmen }
      } else {
        return { ...state, volumen: 0, prevVolulmen: state.volumen }
      }
    })
  },
  changeVolume: (volumen) => {
    set((state) => ({ ...state, volumen }))
  },
  play: () => {
    set((state) => ({ ...state, playing: !state.playing }))
  },
  playID: (id) => {
    set((state) => {
      return {
        ...state,
        current: state.audios.find((audio) => audio.id === id),
        currentIndex: state.audios.findIndex((audio) => audio.id === id),
        playing: true,
        first: state.audios.findIndex((audio) => audio.id === id) === 0,
        last: state.audios.findIndex((audio) => audio.id === id) === state.audios.length - 1
      }
    })
  },
  setCurrent: (id) => {
    set((state) => ({
      ...state,
      current: state.audios.find((audio) => audio.id === id),
      currentIndex: state.audios.findIndex((audio) => audio.id === id),
      first: state.audios.findIndex((audio) => audio.id === id) === 0,
      last: state.audios.findIndex((audio) => audio.id === id) === state.audios.length - 1
    }))
    return true
  },
  next: () => {
    set((state) => {
      const nextIndex = state.currentIndex + 1
      if (nextIndex <= state.audios.length) {
        return {
          ...state,
          current: state.audios[nextIndex],
          currentIndex: nextIndex,
          first: false,
          last: nextIndex === state.audios.length - 1
        }
      } else {
        return {
          ...state,
          current: state.audios[0],
          currentIndex: 0,
          first: true,
          last: false
        }
      }
    })
  },
  prev: () => {
    set((state) => {
      const prevIndex = state.currentIndex - 1
      if (prevIndex >= 0) {
        return {
          ...state,
          current: state.audios[prevIndex],
          currentIndex: prevIndex,
          first: prevIndex === 0,
          last: false
        }
      } else {
        return {
          ...state,
          current: state.audios[state.audios.length - 1],
          currentIndex: state.audios.length - 1,
          first: false,
          last: true
        }
      }
    })
  },
  setAudios (audios) {
    set((state) => ({ ...state, audios }))
  }
}))
