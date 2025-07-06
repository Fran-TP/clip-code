import SnippetsSkeleton from '@features/snippets/skeletons/snippets-skeleton'

const HomeLoading = () => {
  return (
    <div className="min-h-screen">
      <h1 className="mb-4 font-bold text-3xl">Snippets</h1>
      <SnippetsSkeleton />
    </div>
  )
}

export default HomeLoading
