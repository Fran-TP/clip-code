import type { FC } from 'react'

const EmptyState: FC = () => (
  <div className="flex flex-col items-center justify-center flex-1">
    <h1 className="text-3xl font-bold mb-4">No Snippets Found</h1>
    <p className="text-gray-500">Create your first snippet!</p>
  </div>
)

export default EmptyState
