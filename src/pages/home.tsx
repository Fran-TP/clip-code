import SnippetList from '@features/snippets/components/snippet-list'
import { ModalProvider } from '@features/snippets/context/modal-context'
import { ParsedSnippetProvider } from '@features/snippets/context/parsed-snippet-context'

const Home: React.FC = () => {
  return (
    <ParsedSnippetProvider>
      <ModalProvider>
        <SnippetList />
      </ModalProvider>
    </ParsedSnippetProvider>
  )
}

export default Home
