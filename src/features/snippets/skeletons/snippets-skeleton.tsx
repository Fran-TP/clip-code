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
    <>
      <h1 className="text-3xl font-bold mb-4">Snippets</h1>
      <MasonryLayout items={skeletonSizes}>
        {size => <SnippetCardSkeleton key={size} size={size} />}
      </MasonryLayout>
    </>
  )
}

export default SnippetsSkeleton
