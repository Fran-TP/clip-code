import GitHub from '@components/icons/github'
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
    <aside className="p-3 flex flex-col h-full items-center justify-between border-r-2 border-gray-800">
      <nav>
        <ul className="flex flex-col items-center justify-center gap-2">
          {links.map(link => {
            const Icon = link.icon

            return (
              <li
                key={link.name}
                className={clsx(
                  'text-gray-200 rounded-lg transition-all duration-200',
                  {
                    'bg-cyan-500 button-raised': pathname === link.path,
                    'hover:bg-cyan-600': pathname !== link.path
                  }
                )}
              >
                <Link
                  to={link.path}
                  className="p-2 inline-flex rounded-md outline-base"
                >
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
        className="group p-2 bg-linear-45 from-gray-950 to-cyan-500 outline-base rounded-lg"
      >
        <GitHub className="size-6 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
      </Link>
    </aside>
  )
}

export default Sidebar
