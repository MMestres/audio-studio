import { useState } from 'react'

interface DragSwapperProps {
  onSwap?: (source: string, destination: string) => Promise<void>
}

export const useDragSwapper = ({
  onSwap
}: DragSwapperProps) => {
  const [state, setState] = useState<'none' | 'pending' | 'success' | 'error'>('none')

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>) => {
    const target = e.target as HTMLTableRowElement
    e.dataTransfer.setData('id', target.id)
    target.classList.add('opacity-20')
  }

  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    const target = e.target as HTMLTableRowElement
    target.classList.remove('opacity-20')
  }

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    if (e.preventDefault != null) {
      e.preventDefault()
    }
    const target = e.target as HTMLTableRowElement
    target.closest('tr')?.classList.add('bg-black/20')
    return false
  }

  function handleDragEnter (e: React.DragEvent<HTMLTableRowElement>) {
    e.preventDefault()
    const target = e.target as HTMLTableRowElement
    target.closest('tr')?.classList.add('bg-black/20')
  }

  function handleDragLeave (e: React.DragEvent<HTMLTableRowElement>) {
    e.preventDefault()
    const target = e.target as HTMLTableRowElement
    target.closest('tr')?.classList.remove('bg-black/20')
  }

  function handleDrop (e: React.DragEvent<HTMLTableRowElement>) {
    setState('pending')
    e.preventDefault()
    const target = e.target as HTMLTableRowElement
    target.closest('tr')?.classList.remove('bg-black/20')
    const idSource = e.dataTransfer.getData('id')
    const source = document.getElementById(idSource)
    const destination = target.closest('tr')
    if (source != null && destination != null) {
      const parent = destination.parentNode
      const idDestination = destination.id
      if (parent != null && (idSource !== idDestination)) {
        if (onSwap != null) {
          onSwap(idSource, idDestination).then(() => {
            // swapInnerHtml(source, destination)
            setTemporallyState('success')
          }).catch(() => {
            setTemporallyState('error')
          })
        } else {
          swapInnerHtml(source, destination)
          setTemporallyState('success')
        }
      }
    }
    return false
  }

  function setTemporallyState (state: 'success' | 'error') {
    setState(state)
    setTimeout(() => {
      setState('none')
    }, 1000)
  }

  function swapInnerHtml (source: HTMLElement, destination: HTMLElement) {
    const auxDest = destination.innerHTML
    destination.innerHTML = source.innerHTML
    source.innerHTML = auxDest
  }

  return {
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    state
  }
}
