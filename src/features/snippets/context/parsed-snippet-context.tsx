import type { ParsedSnippet } from '@features/snippets/types'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { fetchPaginatedSnippets } from '../services/snippet-service'

interface ParsedSnippetContextProps {
  parsedSnippets: ParsedSnippet[]
  setParsedSnippets: React.Dispatch<React.SetStateAction<ParsedSnippet[]>>
  handleNextPage: () => void
  isLoading: boolean
  isEmpty: boolean
  hasMore: boolean
}

interface ParsedSnippetPropviderProps {
  children: React.ReactNode
}

const ParsedSnippetContext = createContext<ParsedSnippetContextProps | null>(null)

export const ParsedSnippetProvider = ({ children }: ParsedSnippetPropviderProps) => {
  const [snippets, setSnippets] = useState<ParsedSnippet[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const [nextCursor, setNextCursor] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const seemCursors = useRef<Set<number | null>>(new Set())

  const handleNextPage = useCallback(() => {
    if (!hasMore || isLoading) return

    setCursor(nextCursor)
  }, [hasMore, isLoading, nextCursor])

  useEffect(() => {
    if (seemCursors.current.has(cursor)) return
    seemCursors.current.add(cursor)

    console.log('Fetching snippets with cursor:', cursor)
    setIsLoading(true)
    fetchPaginatedSnippets(cursor, 15)
      .then(async ({ snippets: newSnippets, hasMore, nextCursor }) => {
        setSnippets(prev => [...prev, ...newSnippets])
        setHasMore(hasMore)
        setNextCursor(nextCursor)
      })
      .catch(error => {
        console.error('Error fetching snippets:', error)
        throw new Error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [cursor])

  const isEmpty = snippets.length === 0

  return (
    <ParsedSnippetContext.Provider
      value={{
        parsedSnippets: snippets,
        setParsedSnippets: setSnippets,
        handleNextPage,
        isLoading,
        isEmpty,
        hasMore
      }}
    >
      {children}
    </ParsedSnippetContext.Provider>
  )
}

export const useParsedSnippets = () => {
  const context = useContext(ParsedSnippetContext)

  if (!context) {
    throw new Error('useParsedSnippets must be used within a ParsedSnippetProvider')
  }

  return context
}
