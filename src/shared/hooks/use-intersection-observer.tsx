import { useEffect, useRef, useState } from 'react'

const useIntersectionObserver = (
  targetRef: React.RefObject<HTMLDivElement | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    observer.current = new IntersectionObserver(entries => {
      for (const entry of entries) {
        setIsIntersecting(entry.isIntersecting)
      }
    }, options)

    observer.current.observe(target)

    return () => {
      observer.current?.disconnect()
    }
  }, [options, targetRef])

  return {
    isIntersecting,
    observer,
    targetRef
  }
}

export default useIntersectionObserver
