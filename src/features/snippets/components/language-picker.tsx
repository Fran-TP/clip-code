import type { CategoriesWithLanguagesMap, Languages } from '@features/snippets/types'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { BundledLanguage } from 'shiki'

interface LanguagePickerProps {
  categoriesWithLanguages: CategoriesWithLanguagesMap
  languages: Languages[]
  selectedCategory: string
  selectedLanguage: string | null
  onSelectedCategory(category: string): () => void
  onSelectedLanguage(language: BundledLanguage): () => void
}

const LanguagePicker: React.FC<LanguagePickerProps> = ({
  categoriesWithLanguages,
  languages,
  selectedCategory,
  selectedLanguage,
  onSelectedCategory,
  onSelectedLanguage
}) => {
  return (
    <div className="flex h-72 overflow-clip">
      <div className="h-full w-1/3 overflow-y-auto border-border-primary border-r-2 bg-bg-input">
        <ul className="p-2">
          {Object.keys(categoriesWithLanguages).map(category => {
            return (
              <li key={category}>
                <button
                  type="button"
                  className={clsx(
                    'w-full cursor-pointer rounded-md px-3 py-2 text-left text-xs transition-colors',
                    {
                      'bg-bg-elevated': category === selectedCategory,
                      'hover:bg-bg-hover': category !== selectedCategory
                    }
                  )}
                  onClick={onSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="w-2/3 overflow-y-auto bg-bg-input">
        {languages.length > 0 ? (
          <ul className="p-2">
            {languages.map(({ languageId, language }) => {
              return (
                <li key={languageId}>
                  <button
                    type="button"
                    className={clsx(
                      'inline-flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left text-sm outline-base transition-colors',
                      {
                        'bg-bg-elevated': language === selectedLanguage,
                        'hover:bg-bg-hover': language !== selectedLanguage
                      }
                    )}
                    onClick={onSelectedLanguage(languageId)}
                  >
                    <span>{language}</span>
                    {languageId === selectedLanguage && (
                      <Check className="size-4 stroke-4 text-success" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="grid h-full place-items-center text-sm text-text-muted">
            No result for
          </div>
        )}
      </div>
    </div>
  )
}

export default LanguagePicker
