import Progressbar from '@shared/ui/components/atoms/progressbar'
import Header from '@shared/ui/components/molecules/header'
import Sidebar from '@shared/ui/components/molecules/sidenav'
import { AnimatePresence, motion } from 'motion/react'
import { Outlet, useLocation } from 'react-router'

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
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="flex flex-col flex-1 p-4 overflow-y-auto scroll-base"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MainLayout
