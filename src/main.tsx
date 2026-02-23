import Home from '@pages/home'
import MainLayout from '@shared/ui/layouts/main-layout'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import '@shared/styles/globals.css'
import ErrorHomeBoundary from '@routes/home/error'
import HomeLoader from '@routes/home/loader'
import HomeLoading from '@routes/home/loading'
import { ThemeProvider } from '@shared/context/theme-context'
import ThemedToaster from '@shared/ui/components/atoms/themed-toaster'

const LazyCreateSnippet = React.lazy(() => import('@pages/create-snippet'))

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
        async lazy() {
          const [{ FormSnippetProvider }, { default: createSnippetLoader }] = await Promise.all([
            import('@shared/context/snippet-form-context'),
            import('@routes/create-snippet/loader')
          ])

          return {
            loader: createSnippetLoader,
            Component: () => (
              <FormSnippetProvider>
                <React.Suspense fallback={<div className="flex h-full animate-pulse bg-bg-code" />}>
                  <LazyCreateSnippet />
                </React.Suspense>
              </FormSnippetProvider>
            )
          }
        },
        errorElement: <ErrorHomeBoundary />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={routes} />
      <ThemedToaster />
    </ThemeProvider>
  </React.StrictMode>
)
