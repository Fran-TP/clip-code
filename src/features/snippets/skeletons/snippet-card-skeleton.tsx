import clsx from 'clsx'

interface SnippetSkeletonProps {
  size: 'normal' | 'medium' | 'large' | 'xlarge'
}
const SnippetCardSkeleton: React.FC<SnippetSkeletonProps> = ({ size }) => {
  return (
    <div className="animate-pulse overflow-clip rounded-xl border-2 border-border-primary bg-bg-card">
      <div className="space-y-3 border-border-primary border-b-2 p-3">
        <div className="h-3 w-24 rounded bg-bg-skeleton" />
        <div className="h-4 w-3/4 rounded bg-bg-skeleton" />
        <div className="h-3 w-2/3 rounded bg-bg-skeleton" />
      </div>
      <div
        className={clsx('rounded bg-bg-skeleton', {
          'h-20': size === 'normal',
          'h-32': size === 'medium',
          'h-52': size === 'large',
          'h-72': size === 'xlarge'
        })}
      />
    </div>
  )
}

export default SnippetCardSkeleton
