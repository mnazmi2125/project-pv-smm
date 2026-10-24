import { useState, useCallback } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StatusBar from './components/StatusBar'
import OrderTerminal from './components/OrderTerminal'
import LiveConsole from './components/LiveConsole'
import HistoryView from './components/HistoryView'
import TopupView from './components/TopupView'
import SettingsView from './components/SettingsView'
import { dummyUser, seedOrders } from './data/mockProvider'

export default function App() {
  const [menu, setMenu] = useState('order')
  const [category, setCategory] = useState('smm')
  const [saldo, setSaldo] = useState(250000)
  const [orders, setOrders] = useState(seedOrders)
  const [logs, setLogs] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const addLog = useCallback((type, message) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false })
    setLogs((prev) => [...prev, { time, type, message }])
  }, [])

  const clearLogs = useCallback(() => setLogs([]), [])

  const handleCategoryChange = useCallback((c) => {
    setCategory(c)
    setMenu('order')
    setSidebarOpen(false)
  }, [])

  const handleMenuChange = useCallback((m) => {
    setMenu(m)
    setSidebarOpen(false)
  }, [])

  const handleOrderSuccess = useCallback((order) => {
    setSaldo((prev) => prev - order.price)
    setOrders((prev) => [order, ...prev])
  }, [])

  const handleTopupSuccess = useCallback((amount) => {
    setSaldo((prev) => prev + amount)
  }, [])

  const renderContent = () => {
    switch (menu) {
      case 'order':
        return (
          <OrderTerminal
            category={category}
            saldo={saldo}
            onLog={addLog}
            onOrderSuccess={handleOrderSuccess}
          />
        )
      case 'history':
        return <HistoryView orders={orders} />
      case 'topup':
        return (
          <TopupView saldo={saldo} onLog={addLog} onTopupSuccess={handleTopupSuccess} />
        )
      case 'console':
        return <LiveConsole logs={logs} onClear={clearLogs} />
      case 'settings':
        return <SettingsView user={dummyUser} orders={orders} />
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-vscode-bg text-vscode-text font-mono text-sm overflow-hidden">
      <Header
        category={category}
        onCategoryChange={handleCategoryChange}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-12 bottom-6 bg-black/60 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          menu={menu}
          onMenuChange={handleMenuChange}
          saldo={saldo}
          orderCount={orders.length}
          user={dummyUser}
          open={sidebarOpen}
        />

        <main className="flex-1 overflow-hidden">{renderContent()}</main>
      </div>

      <StatusBar saldo={saldo} orderCount={orders.length} />
    </div>
  )
}
