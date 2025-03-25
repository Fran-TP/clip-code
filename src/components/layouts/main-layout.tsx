import { Outlet } from 'react-router'
import Header from '@components/molecules/header'
import Sidebar from '@components/molecules/sidenav'
import Progressbar from '@components/atoms/progressbar'

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen h-screen text-gray-200 bg-gray-950">
      <Header />
      <Progressbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
