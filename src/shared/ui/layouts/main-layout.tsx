import Progressbar from '@shared/ui/components/atoms/progressbar'
import Header from '@shared/ui/components/molecules/header'
import Sidebar from '@shared/ui/components/molecules/sidenav'
import { AnimatePresence, motion } from 'motion/react'
import { Outlet, useLocation } from 'react-router'

const MainLayout: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col text-gray-200">
      <Header />
      <Progressbar />
      <div className="flex flex-1 overflow-x-clip">
        <Sidebar />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname}
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex flex-1 flex-col p-4"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainLayout
