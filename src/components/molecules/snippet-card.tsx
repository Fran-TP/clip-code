import AnimatedIcon from '@components/atoms/animated-icon'
import IconButton from '@components/atoms/icon-button'
import { useModal } from '@lib/context/modal-context'
import { Check, Copy, Star, Trash } from 'lucide-react'
import { useState } from 'react'

interface SnippetCardProps {
  snippetId: string
  title: string
  code: string
  rawCode: string
}

const SnippetCard: React.FC<SnippetCardProps> = ({
  snippetId,
  title,
  rawCode,
  code
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const { showModal } = useModal()

  const handleClickCopy = () => {
    navigator.clipboard.writeText(rawCode)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 600)
  }

  return (
    <article className="border-2 border-gray-800 rounded-lg overflow-clip">
      <header className="p-2 flex items-center justify-between">
        <h2 className="text-sm font-medium">{title}</h2>
        <div className="flex gap-2">
          <IconButton onClick={handleClickCopy}>
            <AnimatedIcon keyAnimation={isCopied ? 'copied' : 'copy'}>
              {isCopied ? (
                <Check className="opacity-70 group-hover:opacity-100 size-4" />
              ) : (
                <Copy className="opacity-70 group-hover:opacity-100 size-4" />
              )}
            </AnimatedIcon>
          </IconButton>
          <IconButton>
            <Star className="opacity-70 group-hover:opacity-100 size-4" />
          </IconButton>
          <IconButton onClick={showModal({ snippetId, title })}>
            <Trash className="opacity-70 group-hover:opacity-100 size-4" />
          </IconButton>
        </div>
      </header>
      <div
        className="overflow-clip"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </article>
  )
}

export default SnippetCard
