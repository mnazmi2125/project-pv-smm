import { useEffect, useRef } from 'react'
import { ScrollText, Trash2 } from 'lucide-react'

const TYPE_COLORS = {
  INFO: 'text-vscode-cyan',
  HTTP: 'text-vscode-orange',
  GATEWAY: 'text-vscode-yellow',
  WEBHOOK: 'text-[#c586c0]',
  PROVIDER: 'text-vscode-cyan',
  SUCCESS: 'text-vscode-green',
  ERROR: 'text-[#f48771]',
}

export default function LiveConsole({ logs, onClear }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [logs])

  return (
    <div className="h-full flex flex-col bg-vscode-bg">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-vscode-border text-xs shrink-0">
        <ScrollText size={14} className="text-vscode-green" />
        <span className="text-vscode-text">logs/live-transaction.log</span>
        <span className="text-vscode-border">— {logs.length} entries</span>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="ml-auto flex items-center gap-1 text-vscode-border hover:text-[#f48771] transition-colors"
          >
            <Trash2 size={12} />
            clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-xs leading-6">
        {logs.length === 0 ? (
          <div className="text-vscode-border">
            <span className="text-vscode-green">/*</span>
            <br />
            <span className="text-vscode-green"> * No transaction logs yet.</span>
            <br />
            <span className="text-vscode-green"> * Create an order in OrderTerminal to stream</span>
            <br />
            <span className="text-vscode-green"> * webhook &amp; provider API events here.</span>
            <br />
            <span className="text-vscode-green"> */</span>
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-3 hover:bg-vscode-tab/40 px-1 -mx-1 rounded">
              <span className="text-vscode-border shrink-0 select-none tabular-nums">
                [{log.time}]
              </span>
              <span
                className={`shrink-0 w-[76px] font-semibold ${
                  TYPE_COLORS[log.type] || 'text-vscode-text'
                }`}
              >
                {log.type}
              </span>
              <span className="text-vscode-text break-all">{log.message}</span>
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
