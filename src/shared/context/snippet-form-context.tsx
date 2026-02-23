import { createContext, useContext, useMemo, useState } from 'react'
import type { BundledLanguage } from 'shiki'

type FormSnippet = {
  title: string
  description: string
  code: string
  language: BundledLanguage
}

interface FormSnippetContextProps {
  formSnippet: FormSnippet
  setFormSnippet: React.Dispatch<React.SetStateAction<FormSnippet>>
}

interface FormSnippetProviderProps {
  children: React.ReactNode
}

const formSnippetContext = createContext<FormSnippetContextProps | null>(null)

export const FormSnippetProvider = ({ children }: FormSnippetProviderProps) => {
  const [formSnippet, setFormSnippet] = useState<FormSnippet>({
    title: '',
    description: '',
    code: '// your code here',
    language: 'javascript' as BundledLanguage
  })

  const value = useMemo<FormSnippetContextProps>(
    () => ({ formSnippet, setFormSnippet }),
    [formSnippet]
  )

  return <formSnippetContext.Provider value={value}>{children}</formSnippetContext.Provider>
}

export const useFormSnippet = () => {
  const context = useContext(formSnippetContext)

  if (!context) {
    throw new Error('useFormSnippet must be used within a FormSnippetProvider')
  }

  return context
}
