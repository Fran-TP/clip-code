import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '@layouts/main-layout'
import Home from './pages/home'
import CreateSnippet from './pages/create-snippet'

const routes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    errorElement: <div>Oops! Something went wrong.</div>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'create',
        Component: CreateSnippet,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
)
