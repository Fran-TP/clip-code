import type { ParsedSnippet, Snippet } from '@features/snippets/types'
import type { BundledTheme } from 'shiki'
import { codeToHtml } from 'shiki'

export const parseSnippets = async (
  snippets: Snippet[],
  theme: BundledTheme = 'github-dark-default'
): Promise<ParsedSnippet[]> => {
  const parsedSnippets = snippets.map(async snippet => {
    const html = await codeToHtml(snippet.code, {
      theme,
      lang: snippet.fkLanguageId
    })

    return { ...snippet, code: html, rawCode: snippet.code }
  })

  return Promise.all(parsedSnippets)
}
