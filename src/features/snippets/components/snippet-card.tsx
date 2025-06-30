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
  code: string
  isFavorite: boolean
  rawCode: string
}

const SnippetCard: FC<SnippetCardProps> = ({ snippetId, title, rawCode, isFavorite, code }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite)
  const { showModal } = useModal()

  const handleClickCopy = () => {
    navigator.clipboard.writeText(rawCode)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 600)
  }

  const handleClickFavorite = async () => {
    const result = await updateFavoriteSnippet(snippetId, !isFavorite)

    if (result.success) {
      setIsFavoriteState(!isFavoriteState)
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  return (
    <article className="overflow-clip rounded-lg border-2 border-gray-800">
      <header className="flex items-center justify-between p-2">
        <h2 className="font-medium text-sm">{title}</h2>
        <div className="flex gap-2">
          <IconButton onClick={handleClickCopy}>
            <AnimatedIcon keyAnimation={isCopied ? 'copied' : 'copy'}>
              {isCopied ? (
                <Check className="size-4 opacity-70 group-hover:opacity-100" />
              ) : (
                <Copy className="size-4 opacity-70 group-hover:opacity-100" />
              )}
            </AnimatedIcon>
          </IconButton>
          <IconButton onClick={handleClickFavorite}>
            <AnimatedIcon keyAnimation={isFavoriteState ? 'favorite' : 'not-favorite'}>
              {isFavoriteState ? (
                <Star className="size-4 fill-gray-200 opacity-70 group-hover:opacity-100" />
              ) : (
                <Star className="size-4 opacity-70 group-hover:opacity-100" />
              )}
            </AnimatedIcon>
          </IconButton>
          <IconButton onClick={showModal({ snippetId, title })}>
            <Trash className="size-4 opacity-70 group-hover:opacity-100" />
          </IconButton>
        </div>
      </header>
      <div className="overflow-clip" dangerouslySetInnerHTML={{ __html: code }} />
    </article>
  )
}

export default SnippetCard
