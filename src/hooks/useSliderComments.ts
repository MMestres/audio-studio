import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { type Comment } from '@/types/Comment'

interface useSliderCommentsProps {
  comments: Comment[]
  className: string
}

export const useSliderComments = ({
  comments, className
}: useSliderCommentsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  className += inView ? ' animatecss animatecss-fast animatecss-slideInUp' : ' opacity-0'

  const [current, setCurrent] = useState(0)
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    setMatches(window !== undefined ? window?.matchMedia('(min-width: 1024px)').matches : false)
  }, [])

  const prev = () => {
    if (current === 0) {
      setCurrent(comments.length - 1)
    } else {
      setCurrent(current - 1)
    }
  }

  const next = () => {
    if (current === comments.length - 1) {
      setCurrent(0)
    } else {
      setCurrent(current + 1)
    }
  }

  useEffect(() => {
    window
      .matchMedia('(min-width: 1024px)')
      .addEventListener('change', e => { setMatches(e.matches) })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 10000)
    return () => { clearInterval(interval) }
  })

  const getComment = (i: number) => {
    return comments[(i % comments.length + comments.length) % comments.length]
  }

  const getComments = (i: number, size: number) => {
    const comments = []
    for (let j = 0; j < size; j++) {
      comments.push(getComment(i + j))
    }
    return comments
  }

  const filteredComments = getComments(current, matches ? 2 : 1)

  return {
    filteredComments,
    controledClassName: className,
    ref,
    prev,
    next
  }
}
