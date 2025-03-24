import { Outlet, NavLink } from 'react-router'

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">My Application</h1>
      </header>
      <nav>
        <ul className="flex space-x-4 p-4 bg-gray-700 text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create"
              className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}
            >
              Create Snippet
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4">
        {/* This is where the child routes will be rendered */}
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <p>&copy; 2023 My Application</p>
      </footer>
    </div>
  )
}

export default MainLayout
