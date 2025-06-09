import MainLayout from '@layouts/main-layout'
import CreateSnippet, { createSnippetLoader } from '@pages/create-snippet'
import Home, { ErrorBoundary, loaderHome } from '@pages/home'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import '@styles/globals.css'
import { EditorCodeProvider } from '@lib/context/editor-code-context'
import { FormSnippetProvider } from '@lib/context/form-snippet-context'
import { ModalProvider } from '@lib/context/modal-context'
import { Toaster } from 'sonner'

const routes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: loaderHome,
        errorElement: <ErrorBoundary />,
        HydrateFallback: () => <div>Loading...</div>
      },
      {
        path: 'create',
        Component: CreateSnippet,
        loader: createSnippetLoader,
        HydrateFallback: () => <div>Loading...</div>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EditorCodeProvider>
      <ModalProvider>
        <FormSnippetProvider>
          <RouterProvider router={routes} />
          <Toaster closeButton theme="dark" />
        </FormSnippetProvider>
      </ModalProvider>
    </EditorCodeProvider>
  </React.StrictMode>
)
