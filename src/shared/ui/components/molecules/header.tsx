const Header = () => {
  return (
    <header className="sticky top-0 z-10 h-16 shrink-0 border-border-primary border-b-2 bg-bg-primary/95 px-5 backdrop-blur">
      <div className="flex h-full items-center gap-3">
        {/* Logo mark: < clip > */}
        <div className="flex items-center gap-1 text-accent">
          <span className="font-mono font-semibold text-base leading-none opacity-60">&lt;</span>

          {/* Paperclip icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-accent"
          >
            <path
              d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="font-mono font-semibold text-base leading-none opacity-60">&gt;</span>
        </div>

        {/* Wordmark */}
        <span className="font-semibold text-base text-text-primary tracking-tight">ClipCode</span>
      </div>
    </header>
  )
}

export default Header
