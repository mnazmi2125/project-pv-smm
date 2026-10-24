# AGENTS.md - System Single Source of Truth (SOT)

## System Identity & Constraints
- Platform: SMM Pulse - Reseller Order Terminal
- Focus: Front-End Architecture Only (Zero DB overhead, lightweight token usage)

## Strict Developer Rules for AI Agents
1. **No External DB / Backend Dependencies**: Gunakan state React lokal dan data mock untuk merepresentasikan Provider 1 API.
2. **Design Tokens Precision**: Ikuti tabel warna di `UI-GUIDELINE.md`. Jangan gunakan warna generic jika tidak sesuai dengan skema VSCode.
3. **Token Optimization**: Tulis kode yang modular, bersih, dan hindari abstraksi berlebihan yang menguras token context.