import { Bell, Radio, Activity, Zap, Menu } from 'lucide-react'

const CATEGORIES = [
  { id: 'smm', label: 'SMM Services' },
  { id: 'nokos', label: 'Nokos OTP' },
]

export default function Header({ category, onCategoryChange, onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between h-12 bg-vscode-sidebar border-b border-vscode-border px-4 shrink-0 relative z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 -ml-1 text-vscode-border hover:text-vscode-text transition-colors"
          aria-label="Buka menu sidebar"
        >
          <Menu size={18} />
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-sm font-semibold text-vscode-text select-none">
          SMM<span className="text-vscode-accent">Pulse</span>
        </span>

        <nav className="flex items-center gap-1 ml-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategoryChange(c.id)}
              className={`px-4 py-1.5 text-xs rounded transition-colors ${
                category === c.id
                  ? 'bg-vscode-accent text-white font-semibold'
                  : 'text-vscode-border hover:text-vscode-text hover:bg-vscode-tab'
              }`}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <span className="hidden lg:flex items-center gap-1.5 text-vscode-green">
          <Activity size={13} />
          Provider: OK
        </span>
        <span className="hidden lg:block text-vscode-border">|</span>
        <span className="hidden lg:flex items-center gap-1.5 text-vscode-cyan">
          <Zap size={13} />
          Gateway: LIVE
        </span>
        <span className="hidden lg:block text-vscode-border">|</span>
        <span className="hidden xl:flex items-center gap-1.5 text-vscode-orange">
          <Radio size={13} />
          Pool: SEA-1
        </span>
        <button className="relative p-1.5 text-vscode-border hover:text-vscode-text transition-colors">
          <Bell size={15} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#f48771]" />
        </button>
      </div>
    </header>
  )
}
