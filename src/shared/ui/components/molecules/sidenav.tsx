import GitHub from '@shared/ui/icons/github'
import clsx from 'clsx'
import { House, Plus } from 'lucide-react'
import { Link, useLocation } from 'react-router'

const links = [
  { name: 'home', path: '/', icon: House },
  { name: 'create', path: '/create', icon: Plus }
]

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <aside className="sticky top-16 left-0 flex h-sidebar flex-col items-center justify-between border-gray-800 border-r-2 p-3">
      <nav>
        <ul className="flex flex-col items-center justify-center gap-2">
          {links.map(link => {
            const Icon = link.icon

            return (
              <li
                key={link.name}
                className={clsx('rounded-lg text-gray-200 transition-all duration-200', {
                  'button-raised bg-cyan-500': pathname === link.path,
                  'hover:bg-cyan-600': pathname !== link.path
                })}
              >
                <Link to={link.path} className="inline-flex rounded-md p-2 outline-base">
                  <Icon
                    className={clsx('stroke-gray-200', {
                      'opacity-80': pathname !== link.path,
                      'opacity-100': pathname === link.path
                    })}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <Link
        to="https://github.com/Fran-TP/clip-code"
        target="_blank"
        className="group rounded-lg bg-linear-45 from-gray-950 to-cyan-500 p-2 outline-base"
      >
        <GitHub className="size-6 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
      </Link>
    </aside>
  )
}

export default Sidebar
