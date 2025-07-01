import type { FC } from 'react'

const EmptyState: FC = () => (
  <div className="flex flex-1 flex-col items-center justify-center">
    <h1 className="mb-4 font-bold text-3xl">No Snippets Found</h1>
    <p className="text-gray-500">Create your first snippet!</p>
  </div>
)

export default EmptyState
