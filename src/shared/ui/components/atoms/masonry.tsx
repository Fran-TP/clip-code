import { Masonry } from 'react-plock'

interface MasonryProps<T> {
  items: T[]
  children: (item: T, index: number) => React.ReactNode
}

const CONFIG = {
  columns: [1, 2, 3],
  gap: [16, 16, 18],
  media: [640, 1024],
  useBalancedLayout: true
}

const MasonryLayout = <T,>({ items, children }: MasonryProps<T>) => {
  return <Masonry items={items} config={CONFIG} render={(item, index) => children(item, index)} />
}

export default MasonryLayout
