import { useState, useMemo } from 'react'
import {
  Link2,
  Hash,
  ShoppingCart,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  KeyRound,
  Info,
} from 'lucide-react'
import {
  smmServices,
  nokosServices,
  formatIDR,
  calcSellingPer1k,
} from '../data/mockProvider'

const genOrderId = () => 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase()
const genOtp = () => String(Math.floor(100000 + Math.random() * 900000))
const genPhone = (country) => {
  const heads = { Indonesia: '+62 8', Malaysia: '+60 1', Russia: '+7 9', 'United States': '+1 2' }
  const head = heads[country] || '+1 2'
  const digits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')
  return `${head}${digits(3)}-${digits(4)}-${digits(3)}`
}
const nowStamp = () =>
  new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

async function runSteps(steps, onLog) {
  let prev = 0
  for (const s of steps) {
    await new Promise((r) => setTimeout(r, s.t - prev))
    prev = s.t
    onLog(s.type, s.msg)
  }
}

function SmmPanel({ saldo, onLog, onOrderSuccess }) {
  const [selectedId, setSelectedId] = useState(smmServices[0].id)
  const [targetUrl, setTargetUrl] = useState('')
  const [quantity, setQuantity] = useState(1000)
  const [result, setResult] = useState(null)
  const [processing, setProcessing] = useState(false)

  const service = smmServices.find((s) => s.id === selectedId)
  const sellingPer1k = calcSellingPer1k(service.baseRate)
  const totalPrice = (sellingPer1k * (Number(quantity) || 0)) / 1000

  const validationError = useMemo(() => {
    if (!targetUrl.trim()) return 'Target URL / username wajib diisi.'
    const q = Number(quantity)
    if (!q || q <= 0) return 'Quantity harus angka positif.'
    if (q < service.min) return `Quantity minimal ${service.min.toLocaleString('id-ID')} unit.`
    if (q > service.max) return `Quantity maksimal ${service.max.toLocaleString('id-ID')} unit.`
    if (totalPrice > saldo)
      return `Saldo tidak mencukupi. Butuh ${formatIDR(totalPrice)}, saldo Anda ${formatIDR(saldo)}.`
    return null
  }, [targetUrl, quantity, service, totalPrice, saldo])

  const handleOrder = async () => {
    if (validationError) {
      onLog('ERROR', validationError)
      return
    }
    setProcessing(true)
    setResult(null)
    const orderId = genOrderId()
    const q = Number(quantity)
    await runSteps(
      [
        { t: 200, type: 'INFO', msg: `INITIALIZING TRANSACTION [${orderId}] ...` },
        {
          t: 600,
          type: 'HTTP',
          msg: `POST /api/v2 → { service: "${service.id}", link: "${targetUrl.trim()}", quantity: ${q} }`,
        },
        {
          t: 1300,
          type: 'GATEWAY',
          msg: `Payment Gateway: menunggu settlement ${formatIDR(totalPrice)} ...`,
        },
        {
          t: 2100,
          type: 'WEBHOOK',
          msg: `WEBHOOK RECEIVED → PAID_SETTLEMENT (HTTP 200 OK) — ${formatIDR(totalPrice)}`,
        },
        {
          t: 2800,
          type: 'PROVIDER',
          msg: `DISPATCH TO PROVIDER API 1 → order ${orderId} accepted (queue: pending)`,
        },
        {
          t: 3400,
          type: 'SUCCESS',
          msg: `ORDER ${orderId} DISPATCHED — estimasi mulai 0-2 jam.`,
        },
      ],
      onLog,
    )

    const order = {
      id: orderId,
      type: 'smm',
      service: `[${service.platform}] ${service.name}`,
      detail: targetUrl.trim(),
      quantity: q,
      price: totalPrice,
      status: 'Diproses',
      time: nowStamp(),
    }
    setResult(order)
    onOrderSuccess(order)
    setProcessing(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="panel p-4">
          <label className="label-syntax">service_catalog.select()</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="input-field"
          >
            {smmServices.map((s) => (
              <option key={s.id} value={s.id}>
                [{s.platform}] {s.name} — {formatIDR(calcSellingPer1k(s.baseRate))}/1k
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-vscode-border">
            <span>
              id: <span className="text-vscode-orange">{service.id}</span>
            </span>
            <span>
              min: <span className="text-vscode-yellow">{service.min.toLocaleString('id-ID')}</span>
            </span>
            <span>
              max: <span className="text-vscode-yellow">{service.max.toLocaleString('id-ID')}</span>
            </span>
          </div>
        </div>

        <div className="panel p-4">
          <label className="label-syntax">target_url / username</label>
          <div className="relative">
            <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vscode-border" />
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://instagram.com/username"
              className="input-field pl-9"
            />
          </div>
        </div>

        <div className="panel p-4">
          <label className="label-syntax">quantity (unit)</label>
          <div className="relative">
            <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vscode-border" />
            <input
              type="number"
              value={quantity}
              min={service.min}
              max={service.max}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-field pl-9"
            />
          </div>
        </div>

        {validationError && (
          <div className="flex items-center gap-2 text-[#f48771] text-xs bg-[#f48771]/10 border border-[#f48771]/30 rounded px-3 py-2">
            <AlertTriangle size={14} className="shrink-0" />
            {validationError}
          </div>
        )}

        <button
          onClick={handleOrder}
          disabled={processing || !!validationError}
          className="w-full bg-vscode-accent text-white px-4 py-3 rounded hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
        >
          {processing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              MEMPROSES TRANSAKSI ...
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              BAYAR &amp; KIRIM ORDER SEKARANG
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div className="panel p-4 space-y-3">
          <h3 className="text-vscode-yellow text-xs uppercase tracking-wider font-semibold">
            ringkasan_pembelian()
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-vscode-border">Harga / 1.000 unit</span>
              <span className="text-vscode-yellow font-semibold">{formatIDR(sellingPer1k)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vscode-border">Quantity</span>
              <span className="text-vscode-text">
                {(Number(quantity) || 0).toLocaleString('id-ID')} unit
              </span>
            </div>
            <div className="border-t border-vscode-border pt-2.5 flex justify-between text-base">
              <span className="text-vscode-text">Total Bayar</span>
              <span className="text-vscode-green font-bold">{formatIDR(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-vscode-border">Saldo Anda</span>
              <span className={totalPrice > saldo ? 'text-[#f48771]' : 'text-vscode-text'}>
                {formatIDR(saldo)}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-vscode-border pt-1 flex items-start gap-1">
            <Info size={11} className="shrink-0 mt-0.5 text-vscode-green" />
            <span>
              <span className="text-vscode-green">// </span>
              Harga sudah termasuk margin platform 25% dari harga provider.
            </span>
          </p>
        </div>

        {result && (
          <div className="panel border-vscode-green/40 p-4 space-y-2">
            <div className="flex items-center gap-2 text-vscode-green text-sm font-semibold">
              <CheckCircle2 size={16} />
              Order Terkirim
            </div>
            <div className="text-[11px] space-y-1.5 text-vscode-border">
              <p>
                id: <span className="text-vscode-orange font-semibold">{result.id}</span>
              </p>
              <p>
                service: <span className="text-vscode-text">{result.service}</span>
              </p>
              <p className="break-all">
                target: <span className="text-vscode-text">{result.detail}</span>
              </p>
              <p>
                quantity:{' '}
                <span className="text-vscode-yellow">
                  {result.quantity.toLocaleString('id-ID')}
                </span>
              </p>
              <p>
                charged:{' '}
                <span className="text-vscode-green font-semibold">{formatIDR(result.price)}</span>
              </p>
              <p>
                status: <span className="text-vscode-cyan">{result.status}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NokosPanel({ saldo, onLog, onOrderSuccess }) {
  const [selectedId, setSelectedId] = useState(nokosServices[0].id)
  const [quantity, setQuantity] = useState(1)
  const [result, setResult] = useState(null)
  const [processing, setProcessing] = useState(false)

  const service = nokosServices.find((s) => s.id === selectedId)
  const totalPrice = service.price * (Number(quantity) || 0)

  const validationError = useMemo(() => {
    const q = Number(quantity)
    if (!q || q <= 0) return 'Quantity harus angka positif.'
    if (q < 1) return 'Minimal pembelian 1 nomor.'
    if (q > service.stock)
      return `Stok tersisa hanya ${service.stock.toLocaleString('id-ID')} nomor.`
    if (totalPrice > saldo)
      return `Saldo tidak mencukupi. Butuh ${formatIDR(totalPrice)}, saldo Anda ${formatIDR(saldo)}.`
    return null
  }, [quantity, service, totalPrice, saldo])

  const handleOrder = async () => {
    if (validationError) {
      onLog('ERROR', validationError)
      return
    }
    setProcessing(true)
    setResult(null)
    const orderId = genOrderId()
    const q = Number(quantity)
    const numbers = Array.from({ length: q }, () => ({
      number: genPhone(service.country),
      otp: genOtp(),
    }))
    await runSteps(
      [
        { t: 200, type: 'INFO', msg: `INITIALIZING NOKOS ORDER [${orderId}] ...` },
        {
          t: 600,
          type: 'HTTP',
          msg: `POST /api/nokos → { service: "${service.id}", quantity: ${q} }`,
        },
        {
          t: 1300,
          type: 'GATEWAY',
          msg: `Payment Gateway: menunggu settlement ${formatIDR(totalPrice)} ...`,
        },
        {
          t: 2000,
          type: 'WEBHOOK',
          msg: `WEBHOOK RECEIVED → PAID_SETTLEMENT (HTTP 200 OK) — ${formatIDR(totalPrice)}`,
        },
        {
          t: 2600,
          type: 'PROVIDER',
          msg: `Mengalokasikan ${q} nomor ${service.platform} dari pool ${service.country} ...`,
        },
        {
          t: 3200,
          type: 'PROVIDER',
          msg: `Nomor dialokasikan: ${numbers.map((n) => n.number).join(', ')}`,
        },
        {
          t: 3800,
          type: 'PROVIDER',
          msg: `Menunggu masuknya OTP (${service.otpTime}) ...`,
        },
        {
          t: 4600,
          type: 'SUCCESS',
          msg: `OTP diterima → ${q} kode aktif untuk order ${orderId}.`,
        },
      ],
      onLog,
    )

    const order = {
      id: orderId,
      type: 'nokos',
      service: `[${service.platform} · ${service.country}]`,
      detail: q === 1 ? numbers[0].number : `${q} nomor (${numbers[0].number}, ...)`,
      quantity: q,
      price: totalPrice,
      status: 'Selesai',
      time: nowStamp(),
    }
    setResult({ ...order, numbers })
    onOrderSuccess(order)
    setProcessing(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="panel p-4">
          <label className="label-syntax">nokos_catalog.select()</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="input-field"
          >
            {nokosServices.map((s) => (
              <option key={s.id} value={s.id}>
                [{s.platform} · {s.country}] — {formatIDR(s.price)}/nomor (stok {s.stock})
              </option>
            ))}
          </select>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-vscode-border">
            <span>
              id: <span className="text-vscode-orange">{service.id}</span>
            </span>
            <span>
              stok pool:{' '}
              <span className="text-vscode-yellow">{service.stock.toLocaleString('id-ID')}</span>
            </span>
            <span>
              estimasi OTP: <span className="text-vscode-cyan">{service.otpTime}</span>
            </span>
          </div>
        </div>

        <div className="panel p-4">
          <label className="label-syntax">quantity (nomor)</label>
          <div className="relative">
            <Smartphone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-vscode-border" />
            <input
              type="number"
              value={quantity}
              min={1}
              max={service.stock}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-field pl-9"
            />
          </div>
        </div>

        {validationError && (
          <div className="flex items-center gap-2 text-[#f48771] text-xs bg-[#f48771]/10 border border-[#f48771]/30 rounded px-3 py-2">
            <AlertTriangle size={14} className="shrink-0" />
            {validationError}
          </div>
        )}

        <button
          onClick={handleOrder}
          disabled={processing || !!validationError}
          className="w-full bg-vscode-accent text-white px-4 py-3 rounded hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-semibold tracking-wide"
        >
          {processing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              MENGALOKASIKAN NOMOR &amp; MENUNGGU OTP ...
            </>
          ) : (
            <>
              <KeyRound size={16} />
              BELI NOMOR &amp; AMBIL OTP
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        <div className="panel p-4 space-y-3">
          <h3 className="text-vscode-yellow text-xs uppercase tracking-wider font-semibold">
            ringkasan_pembelian()
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-vscode-border">Harga / nomor</span>
              <span className="text-vscode-yellow font-semibold">{formatIDR(service.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vscode-border">Quantity</span>
              <span className="text-vscode-text">{Number(quantity) || 0} nomor</span>
            </div>
            <div className="border-t border-vscode-border pt-2.5 flex justify-between text-base">
              <span className="text-vscode-text">Total Bayar</span>
              <span className="text-vscode-green font-bold">{formatIDR(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-vscode-border">Saldo Anda</span>
              <span className={totalPrice > saldo ? 'text-[#f48771]' : 'text-vscode-text'}>
                {formatIDR(saldo)}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-vscode-border pt-1 flex items-start gap-1">
            <Info size={11} className="shrink-0 mt-0.5 text-vscode-green" />
            <span>
              <span className="text-vscode-green">// </span>
              Nomor aktif sekali pakai. OTP tampil setelah pembayaran sukses.
            </span>
          </p>
        </div>

        {result && (
          <div className="panel border-vscode-green/40 p-4 space-y-3">
            <div className="flex items-center gap-2 text-vscode-green text-sm font-semibold">
              <CheckCircle2 size={16} />
              Nomor &amp; OTP Siap
            </div>
            <p className="text-[11px] text-vscode-border">
              id: <span className="text-vscode-orange font-semibold">{result.id}</span> · charged:{' '}
              <span className="text-vscode-green">{formatIDR(result.price)}</span>
            </p>
            <div className="space-y-2">
              {result.numbers.map((n, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-xs"
                >
                  <span className="text-vscode-text">{n.number}</span>
                  <span className="flex items-center gap-1.5 text-vscode-yellow font-bold tabular-nums">
                    <KeyRound size={12} />
                    {n.otp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function OrderTerminal({ category, saldo, onLog, onOrderSuccess }) {
  const isSmm = category === 'smm'
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-lg font-semibold text-vscode-text">
            {isSmm ? (
              <>
                <span className="text-vscode-yellow">const</span> order{' '}
                <span className="text-vscode-cyan">=</span> smm.purchase()
              </>
            ) : (
              <>
                <span className="text-vscode-yellow">const</span> nokos{' '}
                <span className="text-vscode-cyan">=</span> otp.acquire()
              </>
            )}
          </h1>
          <p className="text-vscode-border text-xs mt-1">
            {isSmm
              ? 'Pilih layanan SMM, masukkan target, bayar langsung dari saldo — order terkirim real-time ke Provider 1.'
              : 'Beli nomor virtual (nokos) untuk menerima kode OTP akun — nomor & kode tampil langsung setelah pembayaran.'}
          </p>
        </div>
        {isSmm ? (
          <SmmPanel saldo={saldo} onLog={onLog} onOrderSuccess={onOrderSuccess} />
        ) : (
          <NokosPanel saldo={saldo} onLog={onLog} onOrderSuccess={onOrderSuccess} />
        )}
      </div>
    </div>
  )
}
