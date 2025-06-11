import type { ParsedSnippet, Snippet } from '@features/snippets/types'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLoaderData } from 'react-router'
import { codeToHtml } from 'shiki'

interface ParsedSnippetContextProps {
  parsedSnippets: ParsedSnippet[]
  setParsedSnippets: React.Dispatch<React.SetStateAction<ParsedSnippet[]>>
  isLoading: boolean
  isEmpty: boolean
}

interface ParsedSnippetPropviderProps {
  children: React.ReactNode
}

interface LoaderData {
  snippets: Snippet[]
}

const ParsedSnippetContext = createContext<ParsedSnippetContextProps | null>(
  null
)

export const ParsedSnippetProvider = ({
  children
}: ParsedSnippetPropviderProps) => {
  const { snippets } = useLoaderData<LoaderData>()
  const [parsedSnippets, setParsedSnippets] = useState<ParsedSnippet[]>([])
  const [isLoading, setIsLoading] = useState(snippets.length > 0)
  const processedRef = useRef(false)

  useEffect(() => {
    if (snippets.length === 0 || processedRef.current) return

    processedRef.current = true

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

  return (
    <ParsedSnippetContext.Provider
      value={{ parsedSnippets, setParsedSnippets, isLoading, isEmpty }}
    >
      {children}
    </ParsedSnippetContext.Provider>
  )
}

export const useParsedSnippets = () => {
  const context = useContext(ParsedSnippetContext)

  if (!context) {
    throw new Error(
      'useParsedSnippets must be used within a ParsedSnippetProvider'
    )
  }

  return context
}
