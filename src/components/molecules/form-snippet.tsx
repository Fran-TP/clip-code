import Button from '@components/atoms/button'
import Input from '@components/atoms/input'
import Label from '@components/atoms/label'
import clsx from 'clsx'
import Fuse from 'fuse.js'
import { Check, Search } from 'lucide-react'
import { useState } from 'react'
import { useLoaderData } from 'react-router'

const FormSnippet = () => {
  const { categoriesWithLanguages, languages } = useLoaderData<{
    categoriesWithLanguages: Record<
      string,
      { categoryName: string; langName: string }[]
    >
    languages: { langId: string; langName: string }[]
  }>()

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [selectedLang, setSelectedLang] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  console.log(languages)

  const fuse = new Fuse(languages, {
    keys: ['langName']
  })
  const filteredResult = fuse.search(searchTerm, {
    limit: 20
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = Object.fromEntries(new FormData(event.currentTarget))

    console.log(formData)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value

    setSearchTerm(searchValue)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Label htmlFor="title" className="flex flex-col gap-3">
        Title
        <Input
          id="title"
          type="text"
          name="title"
          placeholder="Title of the snippet"
          autoComplete="off"
        />
      </Label>
      <Label htmlFor="description" className="flex flex-col gap-3">
        Description
        <textarea
          id="description"
          name="description"
          placeholder="Description of the snippet"
          className="border-2 border-gray-800 field-sizing-content resize-none px-3 bg-gray-950 py-2 rounded-sm outline-2 outline-transparent focus-visible:outline-cyan-500 transition-colors duration-200"
        />
      </Label>
      <div className="border-2 border-gray-800 rounded-md flex flex-col divide-gray-800 divide-y-2 bg-base">
        <div className="p-3 relative">
          <Input
            type="search"
            value={searchTerm}
            placeholder="Search language"
            onChange={handleSearchChange}
            className="peer w-full pl-8.5 text-sm"
          />
          <Search className="absolute left-5 transform -translate-y-1/2 size-5 top-1/2 text-gray-200 opacity-70 peer-focus-visible:opacity-100 peer-focus-visible:text-cyan-500 transition-all" />
        </div>
        <div className="flex overflow-clip h-72">
          <div className="w-1/3 h-full border-r-2 border-gray-800 bg-gray-950 overflow-y-auto">
            <ul className="p-1">
              {Object.keys(categoriesWithLanguages).map(name => {
                return (
                  <li
                    key={name}
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory(name)
                    }}
                    onKeyUp={() => {}}
                  >
                    <button
                      type="button"
                      className={clsx(
                        'w-full cursor-pointer text-left px-3 py-2 rounded-md text-sm transition-colors',
                        {
                          'bg-gray-800': name === selectedCategory,
                          'hover:bg-gray-800': name !== selectedCategory
                        }
                      )}
                    >
                      {name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="w-2/3 bg-gray-950 overflow-y-auto">
            {!searchTerm ? (
              <ul className="p-1">
                {categoriesWithLanguages[selectedCategory].map(
                  ({ langName }) => {
                    return (
                      <li key={langName}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLang(langName)
                          }}
                          className={clsx(
                            'w-full inline-flex justify-between items-center cursor-pointer text-left px-3 py-2 rounded-md text-sm transition-colors',
                            {
                              'bg-gray-800': langName === selectedLang,
                              'hover:bg-gray-800': langName !== selectedLang
                            }
                          )}
                        >
                          <span>{langName}</span>
                          {langName === selectedLang && (
                            <Check className="size-4 text-green-500 stroke-4" />
                          )}
                        </button>
                      </li>
                    )
                  }
                )}
              </ul>
            ) : (
              <ul className="p-1">
                {filteredResult.map(({ item: { langId, langName } }) => {
                  return (
                    <li key={langId}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLang(langName)
                        }}
                        className={clsx(
                          'w-full inline-flex justify-between items-center cursor-pointer text-left px-3 py-2 rounded-md text-sm transition-colors',
                          {
                            'bg-gray-800': langName === selectedLang,
                            'hover:bg-gray-800': langName !== selectedLang
                          }
                        )}
                      >
                        <span>{langName}</span>
                        {langName === selectedLang && (
                          <Check className="size-4 text-green-500 stroke-4" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Button type="submit" className="px-3 py-2">
        Create Snippet
      </Button>
    </form>
  )
}

export default FormSnippet
