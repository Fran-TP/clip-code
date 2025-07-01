import SnippetList from '@features/snippets/components/snippet-list'
import { ModalProvider } from '@features/snippets/context/modal-context'
import { ParsedSnippetProvider } from '@features/snippets/context/parsed-snippet-context'

const Home: React.FC = () => {
  return (
    <ParsedSnippetProvider>
      <ModalProvider>
        <h1 className="mb-4 font-bold text-3xl">Snippets</h1>
        <SnippetList />
      </ModalProvider>
    </ParsedSnippetProvider>
  )
}

export default Home
