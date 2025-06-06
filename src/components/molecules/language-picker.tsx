import type { CategoriesWithLanguagesMap, Languages } from '@lib/types'
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
    <div className="flex overflow-clip h-72">
      <div className="w-1/3 h-full border-r-2 border-gray-800 bg-gray-950 overflow-y-auto">
        <ul className="p-1">
          {Object.keys(categoriesWithLanguages).map(category => {
            return (
              <li key={category}>
                <button
                  type="button"
                  className={clsx(
                    'w-full cursor-pointer text-left px-3 py-2 rounded-md text-sm transition-colors',
                    {
                      'bg-gray-800': category === selectedCategory,
                      'hover:bg-gray-800': category !== selectedCategory
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
      <div className="w-2/3 bg-gray-950 overflow-y-auto">
        {languages.length > 0 ? (
          <ul className="p-1">
            {languages.map(({ languageId, language }) => {
              return (
                <li key={languageId}>
                  <button
                    type="button"
                    className={clsx(
                      'w-full inline-flex justify-between outline-base items-center cursor-pointer text-left px-3 py-2 rounded-md text-sm transition-colors',
                      {
                        'bg-gray-800': language === selectedLanguage,
                        'hover:bg-gray-800': language !== selectedLanguage
                      }
                    )}
                    onClick={onSelectedLanguage(languageId)}
                  >
                    <span>{language}</span>
                    {languageId === selectedLanguage && (
                      <Check className="size-4 text-green-500 stroke-4" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="text-sm grid place-items-center h-full">
            No result for
          </div>
        )}
      </div>
    </div>
  )
}

export default LanguagePicker
