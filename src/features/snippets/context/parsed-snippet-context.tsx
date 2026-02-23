import { fetchPaginatedSnippets } from '@features/snippets/services/snippet-service'
import type { ParsedSnippet } from '@features/snippets/types'
import { parseSnippets } from '@features/snippets/utils/parse-snippets'
import { useTheme } from '@shared/context/theme-context'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'

interface State {
  snippets: ParsedSnippet[]
  hasMore: boolean
  nextCursor: number | null
  isEmpty: boolean
  isLoading: boolean
  isInitialLoading: boolean
  error: Error | null
}

interface ParsedSnippetContextProps {
  state: State
  setParsedSnippets: (snippets: ParsedSnippet[]) => void
  handleNextPage: () => void
}

interface ParsedSnippetProviderProps {
  children: React.ReactNode
}

type Action =
  | {
      type: 'FETCH_INIT'
    }
  | {
      type: 'FETCH_SUCCESS'
      payload: {
        snippets: ParsedSnippet[]
        hasMore: boolean
        nextCursor: number | null
      }
    }
  | {
      type: 'FETCH_FAILURE'
      payload: {
        error: Error
      }
    }
  | {
      type: 'SET_SNIPPETS'
      payload: {
        snippets: ParsedSnippet[]
      }
    }

const snippetReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_INIT': {
      return { ...state, isLoading: true, error: null }
    }
    case 'FETCH_SUCCESS': {
      const { snippets, hasMore, nextCursor } = action.payload
      return {
        ...state,
        isLoading: false,
        isInitialLoading: false,
        snippets: [...state.snippets, ...snippets],
        hasMore,
        nextCursor
      }
    }
    case 'FETCH_FAILURE': {
      const { error } = action.payload
      return { ...state, isLoading: false, error }
    }
    case 'SET_SNIPPETS': {
      const { snippets } = action.payload
      return { ...state, snippets }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

const ParsedSnippetContext = createContext<ParsedSnippetContextProps | null>(null)

export const ParsedSnippetProvider = ({ children }: ParsedSnippetProviderProps) => {
  const { editorTheme } = useTheme()
  const [state, dispatch] = useReducer(snippetReducer, {
    snippets: [],
    hasMore: false,
    nextCursor: null,
    isLoading: true,
    isInitialLoading: true,
    isEmpty: true,
    error: null
  })

  const seenCursors = useRef<Set<number | null>>(new Set())
  const snippetsRef = useRef<ParsedSnippet[]>([])

  // Keep ref in sync with state
  snippetsRef.current = state.snippets

  const fetchNextPage = useCallback(
    async (cursor: number | null, perPage = 15) => {
      if (seenCursors.current.has(cursor)) return
      seenCursors.current.add(cursor)

      try {
        dispatch({ type: 'FETCH_INIT' })
        const result = await fetchPaginatedSnippets(cursor, perPage, editorTheme)

        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result
        })
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILURE',
          payload: { error: error instanceof Error ? error : new Error('Unknown error') }
        })
      }
    },
    [editorTheme]
  )

  // Initial fetch
  const initialFetchDone = useRef(false)
  useEffect(() => {
    if (initialFetchDone.current) return
    initialFetchDone.current = true
    fetchNextPage(null)
  }, [fetchNextPage])

  // Re-parse existing snippets when editor theme changes (skip initial)
  const isFirstThemeRender = useRef(true)
  useEffect(() => {
    if (isFirstThemeRender.current) {
      isFirstThemeRender.current = false
      return
    }

    const currentSnippets = snippetsRef.current
    if (currentSnippets.length === 0) return

    // Reconstruct original Snippet objects from ParsedSnippet (rawCode -> code)
    const originalSnippets = currentSnippets.map(s => ({
      ...s,
      code: s.rawCode
    }))

    parseSnippets(originalSnippets, editorTheme).then(reparsed => {
      dispatch({ type: 'SET_SNIPPETS', payload: { snippets: reparsed } })
    })
  }, [editorTheme])

  const handleNextPage = useCallback(() => {
    if (!state.hasMore || state.isLoading) return
    fetchNextPage(state.nextCursor)
  }, [state.hasMore, state.isLoading, state.nextCursor, fetchNextPage])

  const setParsedSnippets = useCallback((snippets: ParsedSnippet[]) => {
    dispatch({ type: 'SET_SNIPPETS', payload: { snippets } })
  }, [])

  const isEmpty = !state.isLoading && state.snippets.length === 0

  const value = useMemo<ParsedSnippetContextProps>(
    () => ({
      state: { ...state, isEmpty },
      setParsedSnippets,
      handleNextPage
    }),
    [state, isEmpty, setParsedSnippets, handleNextPage]
  )

  return <ParsedSnippetContext.Provider value={value}>{children}</ParsedSnippetContext.Provider>
}

export const useParsedSnippets = () => {
  const context = useContext(ParsedSnippetContext)

  if (!context) {
    throw new Error('useParsedSnippets must be used within a ParsedSnippetProvider')
  }

  return context
}
