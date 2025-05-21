import { createContext, useContext, useState } from 'react'
import type { BundledLanguage } from 'shiki'

interface EditorCodeContextProps {
  selectedLanguage: BundledLanguage
  setSelectedLanguage: (language: BundledLanguage) => void
}

interface EditorCodeProviderProps {
  children: React.ReactNode
}

const EditorCodeContext = createContext<EditorCodeContextProps | null>(null)

export const EditorCodeProvider = ({ children }: EditorCodeProviderProps) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<BundledLanguage>('javascript')

  return (
    <EditorCodeContext.Provider
      value={{ selectedLanguage, setSelectedLanguage }}
    >
      {children}
    </EditorCodeContext.Provider>
  )
}

export const useEditorCode = () => {
  const context = useContext(EditorCodeContext)

  if (!context) {
    throw new Error('useEditorCode must be used within an EditorCodeProvider')
  }

  return context
}
