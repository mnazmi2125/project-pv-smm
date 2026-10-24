import { GitBranch, ShieldCheck, Wallet, ShoppingCart } from 'lucide-react'
import { formatIDR } from '../data/mockProvider'

export default function StatusBar({ saldo = 0, orderCount = 0 }) {
  return (
    <footer className="flex items-center justify-between h-6 bg-vscode-accent text-white text-[11px] px-3 shrink-0 select-none">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <GitBranch size={12} />
          main*
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={12} />
          Gateway: LIVE
        </span>
        <span>Provider 1: CONNECTED</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Wallet size={12} />
          {formatIDR(saldo)}
        </span>
        <span className="flex items-center gap-1">
          <ShoppingCart size={12} />
          {orderCount} order
        </span>
        <span>UTF-8</span>
        <span>SMM Pulse v1.0.0</span>
      </div>
    </footer>
  )
}
