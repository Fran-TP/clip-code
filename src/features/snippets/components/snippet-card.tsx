import { useModal } from '@features/snippets/context/modal-context'
import updateFavoriteSnippet from '@features/snippets/services/update-favorite-snippet'
import AnimatedIcon from '@shared/ui/components/atoms/animated-icon'
import IconButton from '@shared/ui/components/atoms/icon-button'
import { Check, Copy, Star, Trash } from 'lucide-react'
import { type FC, useState } from 'react'
import { toast } from 'sonner'

interface SnippetCardProps {
  snippetId: number
  title: string
  description: string
  code: string
  isFavorite: boolean
  rawCode: string
  createdAt?: Date
  fkLanguageId: string
}

const SnippetCard: FC<SnippetCardProps> = ({
  snippetId,
  title,
  description,
  rawCode,
  isFavorite,
  code,
  createdAt,
  fkLanguageId
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)
  const { showModal } = useModal()

  const formattedDate = createdAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }).format(new Date(createdAt))
    : 'Unknown date'

  const handleClickCopy = () => {
    navigator.clipboard.writeText(rawCode)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 600)
  }

  const handleClickFavorite = async () => {
    const result = await updateFavoriteSnippet(snippetId, !isFavoriteState)

    if (result.success) {
      setIsFavoriteState(!isFavoriteState)
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <article className="group/snippet hover:-translate-y-0.5 relative overflow-hidden rounded-xl border-2 border-border-primary bg-bg-card shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-float)]">
      <header className="flex items-start justify-between gap-3 border-border-primary border-b-2 p-3">
        <div className="min-w-0 space-y-1">
          <span className="inline-flex items-center rounded-full border border-border-primary bg-bg-elevated px-2 py-0.5 text-[10px] text-text-muted uppercase tracking-[0.22em]">
            {fkLanguageId}
          </span>
          <h2 className="truncate font-semibold text-sm text-text-primary">{title}</h2>
          <p className="line-clamp-2 text-text-secondary text-xs">{description}</p>
          <p className="text-[11px] text-text-muted">{formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <IconButton onClick={handleClickCopy} aria-label="Copy snippet" title="Copy snippet">
            <AnimatedIcon keyAnimation={isCopied ? 'copied' : 'copy'}>
              {isCopied ? (
                <Check className="size-4 opacity-70 group-hover:opacity-100" />
              ) : (
                <Copy className="size-4 opacity-70 group-hover:opacity-100" />
              )}
            </AnimatedIcon>
          </IconButton>
          <IconButton
            onClick={handleClickFavorite}
            aria-label="Toggle favorite"
            title="Toggle favorite"
          >
            <AnimatedIcon keyAnimation={isFavoriteState ? 'favorite' : 'not-favorite'}>
              {isFavoriteState ? (
                <Star className="size-4 fill-text-primary opacity-70 group-hover:opacity-100" />
              ) : (
                <Star className="size-4 opacity-70 group-hover:opacity-100" />
              )}
            </AnimatedIcon>
          </IconButton>
          <IconButton
            onClick={showModal({ snippetId, title })}
            aria-label="Delete snippet"
            title="Delete snippet"
          >
            <Trash className="size-4 opacity-70 group-hover:opacity-100" />
          </IconButton>
        </div>
      </header>
      <div
        className="snippet-code relative max-h-52 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: code }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-bg-card to-transparent opacity-0 transition-opacity duration-200 group-hover/snippet:opacity-100" />
    </article>
  )
}

export default SnippetCard
