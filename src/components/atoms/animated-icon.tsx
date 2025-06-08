import { AnimatePresence, motion } from 'motion/react'
import type { FC } from 'react'

interface AnimatedIconProps {
  keyAnimation: string
  children: React.ReactNode
}

const AnimatedIcon: FC<AnimatedIconProps> = ({ keyAnimation, children }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={keyAnimation}
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.5 }}
        transition={{ duration: 0.25 }}
        className="inline-flex items-center justify-center"
      >
        {children}
      </motion.span>
    </AnimatePresence>
  )
}

export default AnimatedIcon
