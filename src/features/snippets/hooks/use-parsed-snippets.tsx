import type { ParsedSnippet, Snippet } from '@lib/types'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { codeToHtml } from 'shiki'

interface LoaderData {
  snippets: Snippet[]
}

export const useParsedSnippets = () => {
  const { snippets } = useLoaderData<LoaderData>()
  const [parsedSnippets, setParsedSnippets] = useState<ParsedSnippet[]>([])
  const [isLoading, setIsLoading] = useState(snippets.length > 0)

  useEffect(() => {
    if (snippets.length === 0) return

    const loadAllSnippets = async () => {
      setIsLoading(true)

      const result = await Promise.all(
        snippets.map(async snippet => {
          const html = await codeToHtml(snippet.code, {
            theme: 'github-dark-default',
            lang: snippet.fkLanguageId
          })
          return { ...snippet, code: html, rawCode: snippet.code }
        })
      )

      setParsedSnippets(result)
      setIsLoading(false)
    }

    loadAllSnippets()
  }, [snippets])

  const isEmpty = parsedSnippets.length === 0

  return {
    isEmpty,
    isLoading,
    parsedSnippets,
    setParsedSnippets
  }
}
