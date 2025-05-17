import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface SnippetCardProps {
  title: string
  code: string
  rawCode: string
}

const SnippetCard: React.FC<SnippetCardProps> = ({ title, rawCode, code }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleClickCopy = () => {
    navigator.clipboard.writeText(rawCode)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 600)
  }

  return (
    <article className="border-2 border-gray-800 rounded-lg overflow-clip">
      <header className="p-2 flex items-center justify-between">
        <h2 className="text-sm font-medium">{title}</h2>
        <button
          type="button"
          className="group p-2 cursor-pointer border-2 border-gray-800 rounded-sm hover:bg-gray-900 transition-colors duration-200 inline-flex items-center justify-center"
          onClick={handleClickCopy}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isCopied ? 'copied' : 'copy'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center justify-center"
            >
              {isCopied ? (
                <Check className="opacity-70 group-hover:opacity-100 size-4" />
              ) : (
                <Copy className="opacity-70 group-hover:opacity-100 size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </header>
      <div
        className="overflow-clip"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </article>
  )
}

export default SnippetCard
