import { Link } from 'react-router'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 h-16 border-b-2 border-gray-800 px-4">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Link to="/" className="">
            Home
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
