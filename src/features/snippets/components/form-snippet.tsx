import LanguagePicker from '@features/snippets/components/language-picker'
import { createSnippet } from '@features/snippets/services/snippet-service'
import type { LoaderDataCreateSnippet } from '@features/snippets/types'
import { extractLanguages } from '@features/snippets/utils/normalize-categories'
import { useFormSnippet } from '@shared/context/snippet-form-context'
import Button from '@shared/ui/components/atoms/button'
import Input from '@shared/ui/components/atoms/input'
import Label from '@shared/ui/components/atoms/label'
import Fuse from 'fuse.js'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import type { BundledLanguage } from 'shiki'
import { toast } from 'sonner'

const FormSnippet: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [searchTerm, setSearchTerm] = useState('')

  const { categoriesWithLanguages, languages } =
    useLoaderData<LoaderDataCreateSnippet>()
  const { formSnippet, setFormSnippet } = useFormSnippet()

  const fuse = new Fuse(languages, {
    keys: ['language']
  })
  const filteredResult = fuse.search(searchTerm, {
    limit: 20
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const success = await createSnippet({
      ...formSnippet,
      snippetId: crypto.randomUUID(),
      fkLanguageId: formSnippet.language
    })

    if (success) {
      setFormSnippet(prev => ({
        title: '',
        description: '',
        code: '// your code here',
        language: prev.language
      }))

      setSearchTerm('')

      toast.success('Snippet created successfully')
    } else {
      console.error('Error creating snippet')
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value

    setSearchTerm(searchValue)
  }

  const handleSelectedLanguage = (language: BundledLanguage) => () => {
    setFormSnippet(prev => ({
      ...prev,
      language
    }))
  }

  const handleSelectedCategory = (category: string) => () => {
    setSearchTerm('')
    setSelectedCategory(category)
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <Label htmlFor="title" className="flex flex-col gap-1">
        Title
        <Input
          id="title"
          type="text"
          name="title"
          value={formSnippet.title}
          placeholder="Title of the snippet"
          autoComplete="off"
          required
          onChange={event => {
            const value = event.currentTarget.value

            setFormSnippet(prev => ({
              ...prev,
              title: value
            }))
          }}
        />
      </Label>
      <Label htmlFor="description" className="flex flex-col gap-1">
        Description
        <textarea
          id="description"
          name="description"
          value={formSnippet.description}
          placeholder="Description of the snippet"
          className="border-2 border-gray-800 field-sizing-content resize-none px-3 bg-gray-950 py-2 rounded-sm outline-2 outline-transparent focus-visible:outline-cyan-500 transition-colors duration-200"
          required
          onChange={event => {
            const value = event.currentTarget.value

            setFormSnippet(prev => ({
              ...prev,
              description: value
            }))
          }}
        />
      </Label>
      <Label htmlFor="language" className="inline-block mb-1">
        Language
      </Label>
      <div className="border-2 border-gray-800 rounded-md flex flex-col divide-gray-800 divide-y-2 bg-base">
        <div className="p-3 relative">
          <Input
            type="search"
            name="search"
            value={searchTerm}
            placeholder="Search language"
            autoComplete="off"
            onChange={handleSearchChange}
            className="peer w-full pl-8.5 text-sm"
          />
          <Search className="absolute left-5 transform -translate-y-1/2 size-5 top-1/2 text-gray-200 opacity-70 peer-focus-visible:opacity-100 peer-focus-visible:text-cyan-500 transition-all" />
        </div>
        <LanguagePicker
          categoriesWithLanguages={categoriesWithLanguages}
          languages={
            searchTerm
              ? extractLanguages(filteredResult)
              : (categoriesWithLanguages[selectedCategory] ?? [])
          }
          selectedCategory={selectedCategory}
          selectedLanguage={formSnippet.language}
          onSelectedCategory={handleSelectedCategory}
          onSelectedLanguage={handleSelectedLanguage}
        />
      </div>
      <Button type="submit" className="px-3 py-2">
        Create Snippet
      </Button>
    </form>
  )
}

export default FormSnippet
