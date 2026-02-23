import { useTheme } from '@shared/context/theme-context'
import GitHub from '@shared/ui/icons/github'
import clsx from 'clsx'
import { House, Monitor, Moon, Plus, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router'

const links = [
  { name: 'home', path: '/', icon: House },
  { name: 'create', path: '/create', icon: Plus }
]

const THEME_ICON = {
  dark: Moon,
  light: Sun,
  system: Monitor
} as const

const THEME_LABEL = {
  dark: 'Dark mode',
  light: 'Light mode',
  system: 'System theme'
} as const

const Sidebar = () => {
  const { pathname } = useLocation()
  const { mode, cycleMode } = useTheme()

  const ThemeIcon = THEME_ICON[mode]

  return (
    <aside className="sticky top-16 left-0 flex h-sidebar flex-col items-center justify-between border-border-primary border-r-2 p-3">
      <nav>
        <ul className="flex flex-col items-center justify-center gap-2">
          {links.map(link => {
            const Icon = link.icon

            return (
              <li
                key={link.name}
                className={clsx('rounded-lg text-text-primary transition-all duration-200', {
                  'button-raised bg-accent': pathname === link.path,
                  'hover:bg-bg-hover': pathname !== link.path
                })}
              >
                <Link to={link.path} className="inline-flex rounded-md p-2 outline-base">
                  <Icon
                    className={clsx('stroke-text-primary', {
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
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={cycleMode}
          className="group rounded-lg p-2 outline-base transition-colors duration-200 hover:bg-bg-hover"
          aria-label={THEME_LABEL[mode]}
          title={THEME_LABEL[mode]}
        >
          <ThemeIcon className="size-5 stroke-text-primary opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
        </button>
        <Link
          to="https://github.com/Fran-TP/clip-code"
          target="_blank"
          className="group rounded-lg bg-linear-45 from-bg-secondary to-accent p-2 outline-base"
        >
          <GitHub className="size-6 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
