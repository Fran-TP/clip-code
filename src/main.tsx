import CreateSnippet, { createSnippetLoader } from '@pages/create-snippet'
import Home, { ErrorBoundary, loaderHome } from '@pages/home'
import MainLayout from '@shared/ui/layouts/main-layout'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import '@shared/styles/globals.css'
import { ModalProvider } from '@features/snippets/context/modal-context'
import { FormSnippetProvider } from '@shared/context/snippet-form-context'
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
    <ModalProvider>
      <FormSnippetProvider>
        <RouterProvider router={routes} />
        <Toaster closeButton theme="dark" />
      </FormSnippetProvider>
    </ModalProvider>
  </React.StrictMode>
)
