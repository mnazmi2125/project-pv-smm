# Product Requirement Document (PRD) - Front-End Scope
**Project**: SMM Pulse - SaaS SMM Reseller Platform
**Target Architecture**: Single-Page Application (SPA) Front-End Prototype

## 1. Objective & Scope
Membangun antarmuka web (Front-End) platform Reseller Social Media Marketing (SMM) dengan tampilan bertema IDE VSCode modern/futuristik. Scope sistem fokus pada simulasi integrasi Provider API, kalkulasi markup reseller, serta simulasi alur pembayaran via Payment Gateway Webhook untuk pengiriman produk ke alamat target.

## 2. Core Front-End Features
1. **Catalog & Provider Sync Engine (Mock Data)**
   - Menampilkan daftar layanan SMM yang diambil dari Provider 1.
   - Menghitung harga jual ke end-user secara real-time berdasarkan rumus:
     `Selling Price = Provider Base Rate * (1 + Markup % / 100)`

2. **Order Terminal & Payload Validation**
   - User memasukkan URL/Username Alamat Target dan Jumlah Order.
   - Validasi kriteria minimum & maksimum kuantitas pesanan.
   - Simulasi trigger pembayaran via Payment Gateway Webhook.

3. **Live Terminal Logging Console**
   - Stream event log bertema monospaced (terminal) untuk menampilkan proses transaksi, webhook callback, dan respon provider API secara real-time.

4. **Interactive Document Viewer**
   - Tab navigasi VSCode Explorer untuk melihat SOT internal (`AGENTS.md`, `PRD.md`, dll) secara langsung di dalam aplikasi.

## 3. Tech Stack Requirements
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Iconography**: Lucide React
- **Design Aesthetic**: VSCode Dark Theme (`#1e1e1e`, `#252526`, `#007acc`)