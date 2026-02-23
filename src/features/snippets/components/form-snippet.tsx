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
import { useMemo, useState } from 'react'
import { useLoaderData } from 'react-router'
import type { BundledLanguage } from 'shiki'
import { toast } from 'sonner'

const FormSnippet: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('General')
  const [searchTerm, setSearchTerm] = useState('')

  const { categoriesWithLanguages, languages } = useLoaderData<LoaderDataCreateSnippet>()
  const { formSnippet, setFormSnippet } = useFormSnippet()

  const fuse = useMemo(() => new Fuse(languages, { keys: ['language'] }), [languages])
  const filteredResult = fuse.search(searchTerm, {
    limit: 20
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const success = await createSnippet({
        ...formSnippet,
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
        toast.error('Failed to create snippet')
      }
    } catch {
      toast.error('An error occurred while creating the snippet')
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Label htmlFor="title" className="flex flex-col gap-1 text-sm text-text-muted">
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
      <Label htmlFor="description" className="flex flex-col gap-1 text-sm text-text-muted">
        Description
        <textarea
          id="description"
          name="description"
          value={formSnippet.description}
          placeholder="Description of the snippet"
          className="field-sizing-content resize-none rounded-sm border-2 border-border-primary bg-bg-input px-3 py-2 text-sm outline-2 outline-transparent transition-colors duration-200 focus-visible:outline-accent"
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
      <div className="flex flex-col divide-y-2 divide-border-primary rounded-lg border-2 border-border-primary bg-bg-code">
        <div className="relative p-3">
          <Label htmlFor="language-search" className="mb-1.5 inline-block text-sm text-text-muted">
            Language
          </Label>
          <Input
            id="language-search"
            type="search"
            name="search"
            value={searchTerm}
            placeholder="Search language"
            autoComplete="off"
            onChange={handleSearchChange}
            className="peer w-full pl-8.5"
          />
          <Search className="absolute bottom-6 left-5 size-5 transform text-text-primary opacity-70 transition-all peer-focus-visible:text-accent peer-focus-visible:opacity-100" />
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
      <Button type="submit" className="px-4 py-2 text-sm">
        Create Snippet
      </Button>
    </form>
  )
}

export default FormSnippet
