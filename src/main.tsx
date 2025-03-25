import React from 'react'
import ReactDOM from 'react-dom/client'
import MainLayout from '@layouts/main-layout'
import Home from './pages/home'
import CreateSnippet from './pages/create-snippet'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@styles/globals.css'

const routes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          return new Response('')
        },
        HydrateFallback: () => <div>Loading...</div>
      },
      {
        path: 'create',
        Component: CreateSnippet,
        loader: async () => {
          return new Response('')
        },
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
