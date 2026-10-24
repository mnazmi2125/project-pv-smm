import { useState } from 'react'
import { History, Receipt } from 'lucide-react'
import { formatIDR } from '../data/mockProvider'

const FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'smm', label: 'SMM' },
  { id: 'nokos', label: 'Nokos OTP' },
]

export default function HistoryView({ orders }) {
  const [filter, setFilter] = useState('all')

  const filtered = orders.filter((o) => filter === 'all' || o.type === filter)
  const totalSpent = filtered.reduce((sum, o) => sum + o.price, 0)

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-lg font-semibold text-vscode-text">
            <span className="text-vscode-yellow">const</span> history{' '}
            <span className="text-vscode-cyan">=</span> orders.filter()
          </h1>
          <p className="text-vscode-border text-xs mt-1">
            Semua transaksi Anda — status real-time dari Payment Gateway &amp; Provider 1.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="panel p-4">
            <p className="text-[10px] uppercase tracking-widest text-vscode-border">Total Order</p>
            <p className="text-xl font-bold text-vscode-cyan mt-1 tabular-nums">{filtered.length}</p>
          </div>
          <div className="panel p-4">
            <p className="text-[10px] uppercase tracking-widest text-vscode-border">
              Total Pengeluaran
            </p>
            <p className="text-xl font-bold text-vscode-orange mt-1 tabular-nums">
              {formatIDR(totalSpent)}
            </p>
          </div>
          <div className="panel p-4 col-span-2 sm:col-span-1">
            <p className="text-[10px] uppercase tracking-widest text-vscode-border">Status</p>
            <p className="text-xl font-bold text-vscode-green mt-1">
              {filtered.filter((o) => o.status === 'Selesai').length} selesai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                filter === f.id
                  ? 'bg-vscode-accent text-white border-vscode-accent font-semibold'
                  : 'text-vscode-border border-vscode-border hover:text-vscode-text hover:bg-vscode-tab'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="panel divide-y divide-vscode-border">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-vscode-border text-xs">
              <Receipt size={28} />
              Belum ada order pada filter ini.
            </div>
          ) : (
            filtered.map((o) => (
              <div
                key={o.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 text-xs hover:bg-vscode-tab/40 transition-colors"
              >
                <span className="text-vscode-border tabular-nums w-[120px] shrink-0">{o.time}</span>
                <span
                  className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold shrink-0 ${
                    o.type === 'smm'
                      ? 'text-vscode-cyan border-vscode-cyan/40 bg-vscode-cyan/10'
                      : 'text-vscode-yellow border-vscode-yellow/40 bg-vscode-yellow/10'
                  }`}
                >
                  {o.type === 'smm' ? 'SMM' : 'NOKOS'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-vscode-text truncate">{o.service}</p>
                  <p className="text-vscode-border truncate">{o.detail}</p>
                </div>
                <span className="text-vscode-border tabular-nums shrink-0">
                  x{o.quantity.toLocaleString('id-ID')}
                </span>
                <span className="text-vscode-orange font-semibold tabular-nums shrink-0 w-[110px] text-right">
                  {formatIDR(o.price)}
                </span>
                <span
                  className={`shrink-0 w-[70px] text-right font-semibold ${
                    o.status === 'Selesai' ? 'text-vscode-green' : 'text-vscode-yellow'
                  }`}
                >
                  {o.status}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-vscode-border">
          <History size={12} />
          Data dummy untuk keperluan prototipe front-end.
        </div>
      </div>
    </div>
  )
}
