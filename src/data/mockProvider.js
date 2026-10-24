export const PLATFORM_MARKUP_PERCENT = 25

export const formatIDR = (value) =>
  `Rp ${Math.round(Number(value) || 0).toLocaleString('id-ID')}`

export const calcSellingPer1k = (baseRate, markupPercent = PLATFORM_MARKUP_PERCENT) =>
  baseRate * (1 + markupPercent / 100)

export const dummyUser = {
  name: 'Muhammad Nazmi',
  username: '@nazmi.smm',
  email: 'nazmi@smmpulse.id',
  tier: 'Gold Member',
  joined: '12 Januari 2026',
  phone: '+62 812-8899-0011',
}

export const smmServices = [
  { id: 'IG-FOL-01', platform: 'Instagram', name: 'Followers [HQ Non-Drop]', baseRate: 12000, min: 100, max: 100000 },
  { id: 'IG-LIK-02', platform: 'Instagram', name: 'Post Likes [Real]', baseRate: 3500, min: 50, max: 50000 },
  { id: 'IG-VIE-03', platform: 'Instagram', name: 'Reels Views [Instant]', baseRate: 900, min: 500, max: 1000000 },
  { id: 'IG-CMT-04', platform: 'Instagram', name: 'Custom Comments [HQ]', baseRate: 25000, min: 10, max: 5000 },
  { id: 'TT-FOL-05', platform: 'TikTok', name: 'Followers [Premium]', baseRate: 18500, min: 100, max: 80000 },
  { id: 'TT-LIK-06', platform: 'TikTok', name: 'Video Likes [HQ]', baseRate: 4800, min: 100, max: 60000 },
  { id: 'TT-VIE-07', platform: 'TikTok', name: 'Live Stream Views', baseRate: 2200, min: 100, max: 30000 },
  { id: 'YT-SUB-08', platform: 'YouTube', name: 'Subscribers [Real]', baseRate: 95000, min: 50, max: 20000 },
  { id: 'YT-VIE-09', platform: 'YouTube', name: 'Watch Hours [4K Retention]', baseRate: 38000, min: 1000, max: 40000 },
  { id: 'YT-LIK-10', platform: 'YouTube', name: 'Video Likes [HQ]', baseRate: 8500, min: 50, max: 30000 },
  { id: 'X-FOL-11', platform: 'Twitter / X', name: 'Followers [Global]', baseRate: 24000, min: 100, max: 50000 },
  { id: 'X-RET-12', platform: 'Twitter / X', name: 'Retweets [Real]', baseRate: 12000, min: 50, max: 20000 },
  { id: 'FB-LIK-13', platform: 'Facebook', name: 'Page Likes [HQ]', baseRate: 15000, min: 100, max: 75000 },
  { id: 'TG-MEM-14', platform: 'Telegram', name: 'Channel Members [HQ]', baseRate: 21000, min: 100, max: 50000 },
  { id: 'SP-PLR-15', platform: 'Spotify', name: 'Plays [Save & Stream]', baseRate: 4500, min: 1000, max: 500000 },
]

export const nokosServices = [
  { id: 'NK-WA-ID', platform: 'WhatsApp', country: 'Indonesia', price: 5500, stock: 1240, otpTime: '~5 detik' },
  { id: 'NK-WA-MY', platform: 'WhatsApp', country: 'Malaysia', price: 4200, stock: 860, otpTime: '~8 detik' },
  { id: 'NK-TG-RU', platform: 'Telegram', country: 'Russia', price: 2800, stock: 5620, otpTime: '~12 detik' },
  { id: 'NK-TG-ID', platform: 'Telegram', country: 'Indonesia', price: 6500, stock: 430, otpTime: '~6 detik' },
  { id: 'NK-TT-US', platform: 'TikTok', country: 'United States', price: 12000, stock: 320, otpTime: '~15 detik' },
  { id: 'NK-TT-ID', platform: 'TikTok', country: 'Indonesia', price: 8000, stock: 780, otpTime: '~7 detik' },
  { id: 'NK-FB-ID', platform: 'Facebook', country: 'Indonesia', price: 7500, stock: 540, otpTime: '~9 detik' },
  { id: 'NK-IG-ID', platform: 'Instagram', country: 'Indonesia', price: 6800, stock: 910, otpTime: '~8 detik' },
  { id: 'NK-GG-US', platform: 'Google / Gmail', country: 'United States', price: 9500, stock: 275, otpTime: '~10 detik' },
  { id: 'NK-X-ID', platform: 'Twitter / X', country: 'Indonesia', price: 8200, stock: 390, otpTime: '~11 detik' },
  { id: 'NK-LN-ID', platform: 'LINE', country: 'Indonesia', price: 4900, stock: 650, otpTime: '~6 detik' },
  { id: 'NK-DC-US', platform: 'Discord', country: 'United States', price: 7200, stock: 480, otpTime: '~9 detik' },
]

export const seedOrders = [
  { id: 'ORD-A1B2C3', type: 'smm', service: '[Instagram] Followers [HQ Non-Drop]', detail: 'instagram.com/demas.id', quantity: 1000, price: 15000, status: 'Diproses', time: '22/10/2026 14:32' },
  { id: 'ORD-X9Y8Z7', type: 'nokos', service: '[WhatsApp · Indonesia]', detail: '+62 857-2210-4421', quantity: 2, price: 11000, status: 'Selesai', time: '22/10/2026 09:15' },
  { id: 'ORD-M4N5B6', type: 'smm', service: '[TikTok] Followers [Premium]', detail: 'tiktok.com/@abyay', quantity: 5000, price: 115625, status: 'Selesai', time: '21/10/2026 20:04' },
]
