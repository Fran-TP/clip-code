import type { BundledLanguage } from 'shiki'

export interface Snippet {
  snippetId: string
  title: string
  description: string
  code: string
  isFavorite?: boolean
  createdAt?: Date
  fkLanguageId: string
}

export interface Languages {
  languageId: BundledLanguage
  language: string
}

export interface CategoriesWithLanguages extends Languages {
  categoryId: number
  category: string
}

export interface CategoriesWithLanguagesMap
  extends Partial<Record<string, CategoriesWithLanguages[]>> {}

export interface LoaderDataCreateSnippet {
  categoriesWithLanguages: CategoriesWithLanguagesMap
  languages: Languages[]
}

export interface ParsedSnippet extends Snippet {
  rawCode: string
}
