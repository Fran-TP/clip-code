import { useTheme } from '@shared/context/theme-context'
import GitHub from '@shared/ui/icons/github'
import clsx from 'clsx'
import { House, Monitor, Moon, Plus, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router'

const links = [
  { name: 'Home', path: '/', icon: House },
  { name: 'Create', path: '/create', icon: Plus }
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
    <aside className="group/sidebar sticky top-16 left-0 flex h-sidebar w-14 flex-col justify-between overflow-hidden border-border-primary border-r-2 p-2 transition-[width] duration-200 focus-within:w-36 hover:w-36">
      <nav>
        <ul className="flex flex-col gap-1">
          {links.map(link => {
            const Icon = link.icon
            const isActive = pathname === link.path

            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={clsx(
                    'flex h-10 items-center gap-2.5 rounded-lg px-2.5 outline-base transition-colors duration-200',
                    isActive ? 'button-raised bg-accent' : 'hover:bg-bg-hover'
                  )}
                >
                  <Icon
                    className={clsx('size-5 shrink-0 stroke-text-primary', {
                      'opacity-100': isActive,
                      'opacity-70': !isActive
                    })}
                  />
                  <span className="overflow-hidden whitespace-nowrap text-sm text-text-primary opacity-0 transition-[opacity] duration-200 group-focus-within/sidebar:opacity-100 group-hover/sidebar:opacity-100">
                    {link.name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={cycleMode}
          className="flex h-10 items-center gap-2.5 rounded-lg px-2.5 outline-base transition-colors duration-200 hover:bg-bg-hover"
          aria-label={THEME_LABEL[mode]}
          title={THEME_LABEL[mode]}
        >
          <ThemeIcon className="size-5 shrink-0 stroke-text-primary opacity-70" />
          <span className="overflow-hidden whitespace-nowrap text-sm text-text-primary opacity-0 transition-[opacity] duration-200 group-focus-within/sidebar:opacity-100 group-hover/sidebar:opacity-100">
            Theme
          </span>
        </button>

        <Link
          to="https://github.com/Fran-TP/clip-code"
          target="_blank"
          className="flex h-10 items-center gap-2.5 rounded-lg bg-linear-45 from-bg-secondary to-accent px-2.5 outline-base"
        >
          <GitHub className="size-5 shrink-0 opacity-70" />
          <span className="overflow-hidden whitespace-nowrap text-sm text-text-primary opacity-0 transition-[opacity] duration-200 group-focus-within/sidebar:opacity-100 group-hover/sidebar:opacity-100">
            GitHub
          </span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
