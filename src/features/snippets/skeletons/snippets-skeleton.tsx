import SnippetCardSkeleton from '@features/snippets/skeletons/snippet-card-skeleton'
import MasonryLayout from '@shared/ui/components/atoms/masonry'

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
