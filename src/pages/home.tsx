import SnippetList from '@features/snippets/components/snippet-list'
import { ModalProvider } from '@features/snippets/context/modal-context'
import { ParsedSnippetProvider } from '@features/snippets/context/parsed-snippet-context'
import SnippetsSkeleton from '@features/snippets/skeletons/snippets-skeleton'
import type { ParsedSnippet } from '@features/snippets/types'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router'

const Home: React.FC = () => {
  const snippetsDataPromise =
    useLoaderData<
      Promise<{
        snippets: ParsedSnippet[]
        hasMore: boolean
        nextCursor: number | null
      }>
    >()

  return (
    <>
      <h1 className="mb-4 font-bold text-3xl">Snippets</h1>
      <Suspense fallback={<SnippetsSkeleton />}>
        <Await resolve={snippetsDataPromise} errorElement={<div>Error loading snippets</div>}>
          {({ snippets, hasMore, nextCursor }) => (
            <ModalProvider>
              <ParsedSnippetProvider initialData={{ snippets, hasMore, nextCursor }}>
                <SnippetList />
              </ParsedSnippetProvider>
            </ModalProvider>
          )}
        </Await>
      </Suspense>
    </>
  )
}

export default Home
// <ParsedSnippetProvider initialData={{ snippets, hasMore, nextCursor }}>
// <SnippetList />
// </ParsedSnippetProvider>
// </Await>
