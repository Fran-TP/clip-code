import { Code, Plus } from 'lucide-react'
import type { FC } from 'react'
import { Link } from 'react-router'

const EmptyState: FC = () => (
  <div className="flex flex-1 flex-col items-center justify-center">
    <div className="relative flex w-full max-w-2xl flex-col items-center gap-6 rounded-2xl border-2 border-border-primary border-dashed bg-bg-card px-6 py-10 text-center shadow-[var(--shadow-elevated)]">
      <div className="-top-6 absolute flex items-center gap-2 rounded-full border-2 border-border-primary bg-bg-primary px-4 py-2 text-text-muted text-xs uppercase tracking-[0.2em]">
        <Code className="size-4" />
        Empty vault
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="grid size-16 place-items-center rounded-2xl border-2 border-border-primary bg-bg-elevated shadow-[var(--shadow-card)]">
          <Plus className="size-7 text-text-primary" />
        </div>
        <h1 className="font-semibold text-2xl">No snippets yet</h1>
        <p className="max-w-md text-sm text-text-secondary">
          Your local vault is ready. Create your first snippet and start building a personal library
          of code you trust.
        </p>
      </div>
      <Link
        to="/create"
        className="button-raised rounded-xl bg-accent px-4 py-2 text-sm text-text-inverse outline-2 outline-transparent outline-offset-3 transition-all duration-200 hover:bg-accent-hover focus-visible:outline-focus-ring"
      >
        Create Snippet
      </Link>
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_55%)]" />
    </div>
  </div>
)

export default EmptyState
