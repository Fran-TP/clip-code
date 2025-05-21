import type { ParsedSnippet, Snippet } from '@lib/types'
import { useEffect, useState } from 'react'
import { codeToHtml } from 'shiki'

interface ParsedSnippetsProps {
  snippets?: Snippet[]
}

export const useParsedSnippets = ({ snippets = [] }: ParsedSnippetsProps) => {
  const [parsedSnippets, setParsedSnippets] = useState<ParsedSnippet[]>([])

  useEffect(() => {
    const loadAllSnippets = async () => {
      const result = await Promise.all(
        snippets.map(async snippet => {
          const html = await codeToHtml(snippet.code, {
            theme: 'github-dark-default',
            lang: 'javascript'
          })
          return { ...snippet, code: html, rawCode: snippet.code }
        })
      )

      setParsedSnippets(result)
    }

    loadAllSnippets()
  }, [snippets])

  const hasParsedSnippets = parsedSnippets.length > 0

  return {
    parsedSnippets,
    setParsedSnippets,
    hasParsedSnippets
  }
}
