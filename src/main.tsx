import CreateSnippet from '@pages/create-snippet'
import Home from '@pages/home'
import MainLayout from '@shared/ui/layouts/main-layout'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import '@shared/styles/globals.css'
import createSnippetLoader from '@routes/create-snippet/loader'
import ErrorHomeBoundary from '@routes/home/error'
import HomeLoader from '@routes/home/loader'
import HomeLoading from '@routes/home/loading'
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
        loader: HomeLoader,
        errorElement: <ErrorHomeBoundary />,
        HydrateFallback: HomeLoading
      },
      {
        path: 'create',
        Component: () => (
          <FormSnippetProvider>
            <CreateSnippet />
          </FormSnippetProvider>
        ),
        loader: createSnippetLoader,
        HydrateFallback: () => <div>Loading...</div>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
    <Toaster closeButton theme="dark" />
  </React.StrictMode>
)
