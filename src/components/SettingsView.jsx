import { useState } from 'react'
import { User, Tag, Bell, ShieldCheck } from 'lucide-react'
import { PLATFORM_MARKUP_PERCENT, formatIDR, calcSellingPer1k } from '../data/mockProvider'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${
        checked ? 'bg-vscode-accent' : 'bg-vscode-border'
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
          checked ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

export default function SettingsView({ user, orders }) {
  const [notif, setNotif] = useState({ email: true, webhook: true, sound: false })

  const exampleBase = 12000
  const exampleSell = calcSellingPer1k(exampleBase)

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-lg font-semibold text-vscode-text">
            <span className="text-vscode-yellow">const</span> account{' '}
            <span className="text-vscode-cyan">=</span> settings.panel()
          </h1>
          <p className="text-vscode-border text-xs mt-1">
            Kelola profil, preferensi notifikasi, dan informasi harga platform.
          </p>
        </div>

        <div className="panel p-5">
          <h2 className="flex items-center gap-2 text-vscode-cyan text-xs uppercase tracking-wider font-semibold mb-4">
            <User size={14} />
            profil_akun()
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-vscode-border mb-1">Nama lengkap</p>
              <p className="text-vscode-text">{user.name}</p>
            </div>
            <div>
              <p className="text-vscode-border mb-1">Username</p>
              <p className="text-vscode-orange">{user.username}</p>
            </div>
            <div>
              <p className="text-vscode-border mb-1">Email</p>
              <p className="text-vscode-text">{user.email}</p>
            </div>
            <div>
              <p className="text-vscode-border mb-1">No. HP</p>
              <p className="text-vscode-text">{user.phone}</p>
            </div>
            <div>
              <p className="text-vscode-border mb-1">Tier member</p>
              <p className="text-vscode-yellow font-semibold">{user.tier}</p>
            </div>
            <div>
              <p className="text-vscode-border mb-1">Total order</p>
              <p className="text-vscode-text tabular-nums">{orders.length} transaksi</p>
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="flex items-center gap-2 text-vscode-yellow text-xs uppercase tracking-wider font-semibold mb-3">
            <Tag size={14} />
            struktur_harga_platform()
          </h2>
          <p className="text-xs text-vscode-text leading-6">
            <span className="text-vscode-green">/*</span> <br />
            <span className="text-vscode-green">
              {' '}
              * Margin (markup) adalah keuntungan platform di atas harga modal provider.
            </span>
            <br />
            <span className="text-vscode-green">
              {' '}
              * Rumus: Harga Jual = Harga Provider × (1 + Markup% / 100)
            </span>
            <br />
            <span className="text-vscode-green"> */</span>
          </p>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-vscode-border">Markup aktif (diatur platform)</span>
              <span className="text-vscode-cyan font-semibold">{PLATFORM_MARKUP_PERCENT}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-vscode-border">Contoh: harga provider Instagram Followers</span>
              <span className="text-vscode-orange">{formatIDR(exampleBase)}/1k</span>
            </div>
            <div className="flex justify-between border-t border-vscode-border pt-2">
              <span className="text-vscode-border">Maka harga tampil untuk Anda</span>
              <span className="text-vscode-green font-semibold">{formatIDR(exampleSell)}/1k</span>
            </div>
          </div>
          <p className="text-[10px] text-vscode-border mt-3">
            Harga yang Anda bayar di halaman Pesan sudah final dan termasuk margin di atas.
          </p>
        </div>

        <div className="panel p-5">
          <h2 className="flex items-center gap-2 text-[#c586c0] text-xs uppercase tracking-wider font-semibold mb-4">
            <Bell size={14} />
            notifikasi()
          </h2>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vscode-text">Notifikasi email saat order selesai</p>
                <p className="text-vscode-border">Ringkasan dikirim ke {user.email}</p>
              </div>
              <Toggle
                checked={notif.email}
                onChange={(v) => setNotif((n) => ({ ...n, email: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vscode-text">Notifikasi webhook real-time</p>
                <p className="text-vscode-border">Update status Provider 1 di Live Log</p>
              </div>
              <Toggle
                checked={notif.webhook}
                onChange={(v) => setNotif((n) => ({ ...n, webhook: v }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vscode-text">Suara saat OTP masuk (Nokos)</p>
                <p className="text-vscode-border">Alert audio ketika kode OTP diterima</p>
              </div>
              <Toggle
                checked={notif.sound}
                onChange={(v) => setNotif((n) => ({ ...n, sound: v }))}
              />
            </div>
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="flex items-center gap-2 text-vscode-green text-xs uppercase tracking-wider font-semibold mb-4">
            <ShieldCheck size={14} />
            keamanan()
          </h2>
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="text-vscode-text">Two-Factor Authentication (2FA)</p>
              <p className="text-vscode-border">Autentikasi dua faktor via WhatsApp aktif</p>
            </div>
            <span className="px-2 py-1 rounded bg-vscode-green/10 border border-vscode-green/30 text-vscode-green font-semibold">
              AKTIF
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
