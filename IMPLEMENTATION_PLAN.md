# Front-End Implementation Plan

## Phase 1: Project Setup & Config
1. Inisialisasi Vite + React.
2. Konfigurasi `tailwind.config.js` dengan token warna VSCode dan font `Fira Code`.
3. Pasang ikon `lucide-react`.

## Phase 2: Core Components Architecture
1. **Layout Shell** (`Header`, `Sidebar`, `StatusBar`).
2. **OrderTerminal Tab** (`ServiceSelector`, `TargetInput`, `PriceCalculator`, `PaymentTriggerBtn`).
3. **LiveConsole Tab** (Array of log strings dengan auto-scroll).
4. **SOT Viewer Tab** (Markdown rendered/code block view).

## Phase 3: State Management & Mock Handlers
1. State untuk `services`, `selectedService`, `targetLink`, `quantity`, dan `orderLogs`.
2. Handler `handleCreateOrder`:
   - Validasi input.
   - Append log: "INITIALIZING TRANSACTION" -> "WEBHOOK PAID_SETTLEMENT" -> "DISPATCH TO PROVIDER API 1".
   - Tampilkan kartu status order sukses.