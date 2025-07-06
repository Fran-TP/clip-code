import { fetchPaginatedSnippets } from '@features/snippets/services/snippet-service'
import type { ParsedSnippet } from '@features/snippets/types'
import { sleep } from '@shared/utils/sleep'
import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'

interface State {
  snippets: ParsedSnippet[]
  hasMore: boolean
  nextCursor: number | null
  isEmpty: boolean
  isLoading: boolean
  error: Error | null
}

interface ParsedSnippetContextProps {
  state: State
  setParsedSnippets: (snippets: ParsedSnippet[]) => void
  handleNextPage: () => void
}

interface ParsedSnippetPropviderProps {
  children: React.ReactNode
  initialData: {
    snippets: ParsedSnippet[]
    hasMore: boolean
    nextCursor: number | null
  }
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

export const ParsedSnippetProvider = ({ children, initialData }: ParsedSnippetPropviderProps) => {
  const [state, dispatch] = useReducer(snippetReducer, {
    snippets: initialData.snippets,
    hasMore: initialData.hasMore,
    nextCursor: initialData.nextCursor,
    isLoading: false,
    isEmpty: initialData.snippets.length === 0,
    error: null
  })

  const seemCursors = useRef<Set<number | null>>(new Set())

  const handleNextPage = () => {
    if (!state.hasMore || state.isLoading) return

    const { nextCursor } = state
    fetchNextPage(nextCursor)
  }

  const setParsedSnippets = (snippets: ParsedSnippet[]) => {
    dispatch({ type: 'SET_SNIPPETS', payload: { snippets } })
  }

  const fetchNextPage = async (cursor: number | null, perPage = 15) => {
    if (seemCursors.current.has(cursor)) return

    try {
      dispatch({ type: 'FETCH_INIT' })
      const result = await fetchPaginatedSnippets(cursor, perPage)

      seemCursors.current.add(result.nextCursor)

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: result
      })
    } catch (error) {
      console.error('Error fetching paginated snippets:', error)
      throw error
    }
  }

  const isEmpty = state.snippets.length === 0

  return (
    <ParsedSnippetContext.Provider
      value={{
        state: { ...state, isEmpty },
        setParsedSnippets,
        handleNextPage
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
