import type { Snippet } from '@features/snippets/types'
import { codeToHtml } from 'shiki'

interface ParsedSnippet extends Snippet {
  rawCode: string
}

export const parseSnippets = async (snippets: Snippet[]): Promise<ParsedSnippet[]> => {
  const parsedSnippets = snippets.map(async snippet => {
    const html = await codeToHtml(snippet.code, {
      theme: 'github-dark-default',
      lang: snippet.fkLanguageId
    })

    return { ...snippet, code: html, rawCode: snippet.code }
  })

  return Promise.all(parsedSnippets)
}
