export interface Snippet {
  id: number
  title: string
  description: string
  code: string
  rawCode: string
}

export interface Languages {
  languageId: string
  language: string
}

export interface CategoriesWithLanguages extends Languages {
  categoryId: number
  category: string
}

export interface CategoriesWithLanguagesMap
  extends Partial<Record<string, CategoriesWithLanguages[]>> {}

export type LoaderDataCreateSnippet = {
  categoriesWithLanguages: CategoriesWithLanguagesMap
  languages: Languages[]
}
