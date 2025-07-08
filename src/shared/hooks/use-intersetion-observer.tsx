import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (
  targetRef: React.RefObject<HTMLDivElement | null>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!targetRef.current) return

    observer.current = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          console.log('Element is in view')
        } else {
          setIsIntersecting(false)
          console.log('Element is out of view')
        }
      }
    }, options)

    observer.current.observe(targetRef.current)

    return () => {
      if (observer) {
        observer.current?.disconnect()
      }
    }
  }, [options, targetRef.current])

  return {
    isIntersecting,
    observer,
    targetRef
  }
}

export default useIntersectionObserver
