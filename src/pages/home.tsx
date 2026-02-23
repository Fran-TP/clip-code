import SnippetList from '@features/snippets/components/snippet-list'
import { ModalProvider } from '@features/snippets/context/modal-context'
import { ParsedSnippetProvider } from '@features/snippets/context/parsed-snippet-context'

const Home: React.FC = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl">Snippets</h1>
          <p className="text-sm text-text-muted">Your local library of code fragments.</p>
        </div>
      </div>
      <ParsedSnippetProvider>
        <ModalProvider>
          <SnippetList />
        </ModalProvider>
      </ParsedSnippetProvider>
    </>
  )
}

export default Home
