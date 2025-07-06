import { Masonry } from 'react-plock'

interface MasonryProps<T> {
  items: T[]
  children: (item: T) => React.ReactNode
}

const CONFIG = {
  columns: [1, 2],
  gap: [16, 16],
  media: [640, 768],
  useBalancedLayout: true
}

const MasonryLayout = <T,>({ items, children }: MasonryProps<T>) => {
  return <Masonry items={items} config={CONFIG} render={item => children(item)} />
}

export default MasonryLayout
