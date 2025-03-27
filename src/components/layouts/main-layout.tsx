import { Outlet, useLocation } from 'react-router'
import Header from '@components/molecules/header'
import Sidebar from '@components/molecules/sidenav'
import Progressbar from '@components/atoms/progressbar'
import { AnimatePresence, motion } from 'motion/react'

const MainLayout: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col min-h-screen h-screen text-gray-200 bg-gray-950">
      <Header />
      <Progressbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="flex flex-col flex-1 p-4 overflow-y-auto"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainLayout
