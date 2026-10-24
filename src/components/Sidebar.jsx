import {
  ShoppingBag,
  History,
  Wallet,
  Terminal,
  Settings,
  Crown,
  PlusCircle,
  LogOut,
} from 'lucide-react'
import { formatIDR } from '../data/mockProvider'

const MENU_ITEMS = [
  { id: 'order', label: 'Pesan Sekarang', icon: ShoppingBag },
  { id: 'history', label: 'Riwayat Order', icon: History },
  { id: 'topup', label: 'Isi Saldo', icon: Wallet },
  { id: 'console', label: 'Live Log', icon: Terminal },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
]

export default function Sidebar({ menu, onMenuChange, saldo, orderCount, user, open }) {
  const initial = user.name.charAt(0).toUpperCase()

  return (
    <aside
      className={`w-64 bg-vscode-sidebar border-r border-vscode-border flex flex-col overflow-y-auto fixed top-12 bottom-6 left-0 z-40 transition-transform duration-200 ease-out md:static md:z-auto md:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="px-4 py-2 text-[11px] uppercase tracking-widest text-vscode-border border-b border-vscode-border">
        Akun Saya
      </div>

      <div className="px-4 py-4 border-b border-vscode-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-vscode-accent flex items-center justify-center text-white text-lg font-bold shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-vscode-text truncate">{user.name}</p>
            <p className="text-[11px] text-vscode-border truncate">{user.username}</p>
            <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-[#dcdcaa]/10 border border-[#dcdcaa]/30 text-[10px] text-vscode-yellow">
              <Crown size={10} />
              {user.tier}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-b border-vscode-border">
        <p className="text-[10px] uppercase tracking-widest text-vscode-border mb-1">
          Total Saldo
        </p>
        <p className="text-xl font-bold text-vscode-green tabular-nums">{formatIDR(saldo)}</p>
        <button
          onClick={() => onMenuChange('topup')}
          className="mt-3 w-full flex items-center justify-center gap-1.5 bg-vscode-accent text-white text-xs font-semibold py-2 rounded hover:brightness-110 active:scale-[0.99] transition-all"
        >
          <PlusCircle size={14} />
          Isi Saldo
        </button>
      </div>

      <nav className="py-2 flex-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = menu === item.id
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-left transition-colors border-l-2 ${
                isActive
                  ? 'bg-vscode-tab text-vscode-text border-vscode-accent font-semibold'
                  : 'text-vscode-border border-transparent hover:text-vscode-text hover:bg-vscode-tab/40'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-vscode-cyan' : ''} />
              {item.label}
              {item.id === 'history' && (
                <span className="ml-auto px-1.5 py-0.5 rounded bg-vscode-bg text-[10px] text-vscode-border tabular-nums">
                  {orderCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="px-4 py-3 border-t border-vscode-border">
        <p className="text-[10px] text-vscode-border mb-2">
          Member sejak {user.joined}
        </p>
        <button className="w-full flex items-center gap-2 px-2 py-2 text-xs text-[#f48771] hover:bg-[#f48771]/10 rounded transition-colors">
          <LogOut size={14} />
          Keluar dari akun
        </button>
      </div>
    </aside>
  )
}
