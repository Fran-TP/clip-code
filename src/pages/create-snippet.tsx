import EditorCode from '@features/editor-code/components/editor-code'
import FormSnippet from '@features/snippets/components/form-snippet'
import { useFormSnippet } from '@shared/context/snippet-form-context'

const CreateSnippet: React.FC = () => {
  const { formSnippet } = useFormSnippet()

  return (
    <>
      <div className="mb-6">
        <h1 className="font-semibold text-2xl">Create Snippet</h1>
        <p className="text-sm text-text-muted">
          Compose metadata and code, then save to your vault.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="flex flex-col gap-3 rounded-2xl border-2 border-border-primary bg-bg-card px-5 py-4 shadow-[var(--shadow-card)]">
          <div>
            <h2 className="font-semibold text-lg">Snippet Details</h2>
            <p className="text-text-muted text-xs">Title, description, and language.</p>
          </div>
          <FormSnippet />
        </div>
        <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-border-primary bg-bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 border-border-primary border-b-2 px-4 py-3">
            <span className="text-text-muted text-xs uppercase tracking-[0.3em]">Language</span>
            <span className="font-semibold text-sm text-text-primary">{formSnippet.language}</span>
          </div>
          <EditorCode />
        </div>
      </div>
    </>
  )
}

export default CreateSnippet
