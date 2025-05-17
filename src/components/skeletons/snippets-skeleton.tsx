import MasonryLayout from '@components/atoms/masonry'
import SnippetCardSkeleton from './snippet-card-skeleton'

const SnippetsSkeleton: React.FC = () => {
  const skeletonSizes: Array<'normal' | 'medium' | 'large' | 'xlarge'> = [
    'normal',
    'xlarge',
    'medium',
    'large',
    'xlarge',
    'medium',
    'normal',
    'large',
    'xlarge'
  ]
  return (
    <MasonryLayout items={skeletonSizes}>
      {size => <SnippetCardSkeleton key={size} size={size} />}
    </MasonryLayout>
  )
}

export default SnippetsSkeleton
