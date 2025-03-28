import { Masonry } from 'react-plock'

interface MasonryProps {
  items: { id: number; title: string; description: string; code: string }[]
  children: (item: {
    id: number
    title: string
    description: string
    code: string
  }) => React.ReactNode
}

const CONFIG = {
  columns: [1, 2],
  gap: [16, 16],
  media: [640, 768]
}

const MasonryLayout: React.FC<MasonryProps> = ({ items, children }) => {
  return (
    <Masonry items={items} config={CONFIG} render={item => children(item)} />
  )
}

export default MasonryLayout
