import MainLayout from '@layouts/main-layout'
import CreateSnippet, { createSnippetLoader } from '@pages/create-snippet'
import Home, { loaderHome } from '@pages/home'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import '@styles/globals.css'

const routes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: loaderHome,
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
    <RouterProvider router={routes} />
  </React.StrictMode>
)
