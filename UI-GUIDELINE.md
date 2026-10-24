# UI/UX & Design Tokens Guideline

## 1. Visual Theme (VSCode Dark IDE Aesthetic)
- **Primary Background**: `#1e1e1e` (Editor BG)
- **Sidebar Background**: `#252526` (Explorer Panel)
- **Active Tab / Hover**: `#37373d`
- **Primary Accent / Button**: `#007acc` (VSCode Blue)
- **Text Primary**: `#cccccc` (Syntax Default)
- **Syntax Colors**:
  - Yellow: `#dcdcaa` (Functions / Amounts)
  - Blue/Cyan: `#4fc1ff` (Types / Labels)
  - Green: `#6a9955` (Comments / Status OK)
  - Orange/Peach: `#ce9178` (Strings / Attributes)
  - Border: `#3c3c3c`

## 2. Typography & Fonts
- **Primary Font Family**: `Fira Code`, `Consolas`, `Monaco`, monospace.
- **Code Indicators**: Gunakan format sintaksis JavaScript/React dalam label UI (contoh: `const targetUrl = "..."`).

## 3. Component Hierarchy & Layout
- **Top Header Bar**: Window controls (red, yellow, green dots) + Status bar koneksi Provider.
- **Left Sidebar**: Explorer tree menu untuk berpindah antar dokumen dan modul terminal.
- **Main Editor Workspace**: Form transaksi, preview kalkulasi harga, dan console log.
- **Bottom Status Bar**: Status git branch (`main*`), encoding (`UTF-8`), dan versi platform.