import { useState } from 'react'
import { Wallet, Loader2, CheckCircle2, AlertTriangle, Zap } from 'lucide-react'
import { formatIDR } from '../data/mockProvider'

const NOMINALS = [50000, 100000, 250000, 500000, 1000000]
const METHODS = ['QRIS', 'DANA', 'OVO', 'GoPay', 'Bank Transfer']

async function runSteps(steps, onLog) {
  let prev = 0
  for (const s of steps) {
    await new Promise((r) => setTimeout(r, s.t - prev))
    prev = s.t
    onLog(s.type, s.msg)
  }
}

export default function TopupView({ saldo, onLog, onTopupSuccess }) {
  const [amount, setAmount] = useState(100000)
  const [custom, setCustom] = useState('')
  const [method, setMethod] = useState('QRIS')
  const [processing, setProcessing] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)

  const finalAmount = custom ? Number(custom) : amount

  const validationError = (() => {
    if (!finalAmount || Number.isNaN(finalAmount) || finalAmount <= 0)
      return 'Nominal topup harus angka positif.'
    if (finalAmount < 10000) return 'Minimal topup Rp 10.000.'
    if (finalAmount > 10000000) return 'Maksimal topup Rp 10.000.000 per transaksi.'
    return null
  })()

  const handleTopup = async () => {
    if (validationError) {
      onLog('ERROR', validationError)
      return
    }
    setProcessing(true)
    setSuccessMsg(null)
    const topId = 'TOP-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    await runSteps(
      [
        { t: 200, type: 'INFO', msg: `INITIALIZING TOPUP [${topId}] — ${formatIDR(finalAmount)}` },
        {
          t: 800,
          type: 'GATEWAY',
          msg: `Payment Gateway (${method}): menunggu konfirmasi pembayaran ...`,
        },
        {
          t: 1800,
          type: 'WEBHOOK',
          msg: `WEBHOOK RECEIVED → TOPUP_SETTLED (HTTP 200 OK) — ${formatIDR(finalAmount)} masuk`,
        },
        {
          t: 2400,
          type: 'SUCCESS',
          msg: `TOPUP ${topId} SELESAI — saldo bertambah ${formatIDR(finalAmount)}.`,
        },
      ],
      onLog,
    )
    onTopupSuccess(finalAmount)
    setSuccessMsg(`Topup ${formatIDR(finalAmount)} via ${method} berhasil. Saldo baru ${formatIDR(saldo + finalAmount)}.`)
    setProcessing(false)
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-lg font-semibold text-vscode-text">
            <span className="text-vscode-yellow">const</span> topup{' '}
            <span className="text-vscode-cyan">=</span> gateway.deposit()
          </h1>
          <p className="text-vscode-border text-xs mt-1">
            Isi saldo akun via Payment Gateway — dana masuk real-time setelah webhook settlement.
          </p>
        </div>

        <div className="panel p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-vscode-accent/20 border border-vscode-accent/40 flex items-center justify-center">
              <Wallet size={18} className="text-vscode-accent" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-vscode-border">
                Saldo Saat Ini
              </p>
              <p className="text-2xl font-bold text-vscode-green tabular-nums">{formatIDR(saldo)}</p>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-vscode-cyan">
            <Zap size={13} />
            Auto-credit via webhook
          </span>
        </div>

        <div className="panel p-5 space-y-4">
          <div>
            <label className="label-syntax">pilih_nominal()</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {NOMINALS.map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setAmount(n)
                    setCustom('')
                  }}
                  disabled={!!custom}
                  className={`py-3 text-xs font-semibold rounded border transition-colors tabular-nums ${
                    !custom && amount === n
                      ? 'bg-vscode-accent text-white border-vscode-accent'
                      : 'text-vscode-text border-vscode-border hover:bg-vscode-tab disabled:opacity-40'
                  }`}
                >
                  {formatIDR(n)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label-syntax">nominal_lainnya()</label>
            <input
              type="number"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Masukkan nominal manual, mis. 350000"
              className="input-field"
            />
          </div>

          <div>
            <label className="label-syntax">metode_pembayaran()</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="input-field"
            >
              {METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between text-xs border-t border-vscode-border pt-3">
            <span className="text-vscode-border">Biaya admin</span>
            <span className="text-vscode-green">Rp 0 (gratis)</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span className="text-vscode-text">Total Topup</span>
            <span className="text-vscode-yellow tabular-nums">{formatIDR(finalAmount || 0)}</span>
          </div>

          {validationError && (
            <div className="flex items-center gap-2 text-[#f48771] text-xs bg-[#f48771]/10 border border-[#f48771]/30 rounded px-3 py-2">
              <AlertTriangle size={14} className="shrink-0" />
              {validationError}
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 text-vscode-green text-xs bg-vscode-green/10 border border-vscode-green/30 rounded px-3 py-2">
              <CheckCircle2 size={14} className="shrink-0" />
              {successMsg}
            </div>
          )}

          <button
            onClick={handleTopup}
            disabled={processing || !!validationError}
            className="w-full bg-vscode-accent text-white px-4 py-3 rounded hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-semibold"
          >
            {processing ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                MENUNGGU WEBHOOK SETTLEMENT ...
              </>
            ) : (
              <>
                <Zap size={16} />
                BAYAR SEKARANG VIA {method.toUpperCase()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
