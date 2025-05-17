import clsx from 'clsx'

interface SnippetSkeletonProps {
  size: 'normal' | 'medium' | 'large' | 'xlarge'
}
const SnippetCardSkeleton: React.FC<SnippetSkeletonProps> = ({ size }) => {
  return (
    <div className="animate-pulse overflow-clip rounded-lg border-2 border-gray-800">
      <div className="flex items-center justify-between p-2">
        <div className="h-4 w-1/4 rounded bg-base" />
        <div className="h-6 w-6 rounded bg-base" />
      </div>
      <div
        className={clsx('rounded bg-base', {
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
