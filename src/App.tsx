
import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  ArrowDownRight,
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  Box,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Command,
  CreditCard,
  LayoutDashboard,
  Map,
  MoreHorizontal,
  Package,
  Search,
  Settings2,
  ShieldCheck,
  Truck,
  Users,
  Zap,
} from 'lucide-react'
import './App.css'

const revenueData = [
  { month: 'Jan', revenue: 28500, previous: 22000 },
  { month: 'Feb', revenue: 34000, previous: 26000 },
  { month: 'Mar', revenue: 30500, previous: 28000 },
  { month: 'Apr', revenue: 42000, previous: 31500 },
  { month: 'May', revenue: 39000, previous: 30000 },
  { month: 'Jun', revenue: 48500, previous: 35500 },
  { month: 'Jul', revenue: 44000, previous: 37000 },
  { month: 'Aug', revenue: 56000, previous: 40500 },
  { month: 'Sep', revenue: 51000, previous: 43000 },
  { month: 'Oct', revenue: 63500, previous: 46500 },
  { month: 'Nov', revenue: 58000, previous: 48000 },
  { month: 'Dec', revenue: 72000, previous: 53000 },
]

const shipmentData = [
  { day: 'Mon', delivered: 128, transit: 45 },
  { day: 'Tue', delivered: 165, transit: 58 },
  { day: 'Wed', delivered: 142, transit: 42 },
  { day: 'Thu', delivered: 198, transit: 67 },
  { day: 'Fri', delivered: 176, transit: 54 },
  { day: 'Sat', delivered: 115, transit: 38 },
  { day: 'Sun', delivered: 92, transit: 28 },
]

const statusData = [
  { name: 'Delivered', value: 68, color: '#a78bfa' },
  { name: 'In transit', value: 20, color: '#7c5cfc' },
  { name: 'Pending', value: 8, color: '#4d3a83' },
  { name: 'Delayed', value: 4, color: '#f59eaa' },
]

const shipments = [
  {
    id: 'SHP-20481',
    customer: 'Ethiopian Trading Co.',
    initials: 'ET',
    color: 'lavender',
    destination: 'Addis Ababa',
    date: 'Oct 19, 2026',
    amount: '$2,480.00',
    status: 'In transit',
  },
  {
    id: 'SHP-20480',
    customer: 'Horizon Retail',
    initials: 'HR',
    color: 'orange',
    destination: 'Nairobi, Kenya',
    date: 'Oct 19, 2026',
    amount: '$1,850.00',
    status: 'Delivered',
  },
  {
    id: 'SHP-20479',
    customer: 'Meridian Supplies',
    initials: 'MS',
    color: 'green',
    destination: 'Dire Dawa',
    date: 'Oct 18, 2026',
    amount: '$960.00',
    status: 'Pending',
  },
  {
    id: 'SHP-20478',
    customer: 'Atlas Distribution',
    initials: 'AD',
    color: 'pink',
    destination: 'Hawassa',
    date: 'Oct 18, 2026',
    amount: '$3,210.00',
    status: 'Delayed',
  },
  {
    id: 'SHP-20477',
    customer: 'Nova Commerce',
    initials: 'NC',
    color: 'blue',
    destination: 'Bahir Dar',
    date: 'Oct 17, 2026',
    amount: '$1,420.00',
    status: 'Delivered',
  },
]

const navGroups = [
  {
    label: 'WORKSPACE',
    items: [
      { label: 'Overview', icon: LayoutDashboard },
      { label: 'Shipments', icon: Package, count: '12' },
      { label: 'Tracking', icon: Map },
      { label: 'Customers', icon: Users },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { label: 'Analytics', icon: Activity },
      { label: 'Billing', icon: CreditCard },
    ],
  },
]

const currency = (value: number) =>
  `$${value.toLocaleString('en-US')}`

function Sidebar({
  activePage,
  onNavigate,
}: {
  activePage: string
  onNavigate: (page: string) => void
}) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" onClick={() => onNavigate('Overview')}>
        <span className="brand-mark">
          <Command size={21} strokeWidth={2.5} />
        </span>
        <span className="brand-name">
          pulse<span>board</span>
        </span>
      </a>

      <button className="workspace-switcher">
        <span className="workspace-icon">P</span>
        <span className="workspace-copy">
          <strong>Pulse Logistics</strong>
          <small>Free workspace</small>
        </span>
        <ChevronDown size={15} className="muted-icon" />
      </button>

      <div className="sidebar-navigation">
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <p className="nav-heading">{group.label}</p>
            {group.items.map(({ label, icon: Icon, count }) => (
              <button
                key={label}
                className={`nav-link ${activePage === label ? 'active' : ''}`}
                onClick={() => onNavigate(label)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{label}</span>
                {count && <span className="nav-count">{count}</span>}
                {activePage === label && <span className="active-indicator" />}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon"><Zap size={17} /></div>
          <strong>Unlock more insights</strong>
          <p>Get advanced reports and real-time shipment analytics.</p>
          <button onClick={() => onNavigate('Upgrade')}>Explore plans <ArrowUpRight size={14} /></button>
        </div>

        <button
          className={`nav-link ${activePage === 'Settings' ? 'active' : ''}`}
          onClick={() => onNavigate('Settings')}
        >
          <Settings2 size={18} />
          <span>Settings</span>
        </button>
        <button
          className={`nav-link ${activePage === 'Help center' ? 'active' : ''}`}
          onClick={() => onNavigate('Help center')}
        >
          <CircleHelp size={18} />
          <span>Help center</span>
        </button>

        <div className="sidebar-user">
          <div className="user-avatar">HA</div>
          <div className="user-copy">
            <strong>Hayat Ahmedjara</strong>
            <small>hayat@example.com</small>
          </div>
          <MoreHorizontal size={19} className="muted-icon" />
        </div>
      </div>
    </aside>
  )
}

function Header({
  activePage,
  search,
  onSearch,
}: {
  activePage: string
  search: string
  onSearch: (value: string) => void
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-divider">/</span>
        <strong>{activePage}</strong>
      </div>

      <div className="topbar-actions">
        <label className="search-box">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search anything..."
            aria-label="Search shipments"
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="notification-wrap">
          <button
            className={`icon-button ${notificationsOpen ? 'selected' : ''}`}
            aria-label="Toggle notifications"
            onClick={() => setNotificationsOpen((value) => !value)}
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="notification-popover">
              <strong>Notifications</strong>
              <p><span className="notice-dot purple-dot" /> 3 shipments are awaiting updates.</p>
              <p><span className="notice-dot green-dot" /> Your weekly report is ready.</p>
            </div>
          )}
        </div>

        <div className="topbar-divider" />
        <div className="topbar-avatar">HA</div>
      </div>
    </header>
  )
}

function StatCard({
  title,
  value,
  change,
  positive,
  note,
  icon: Icon,
  iconClass,
  sparkline,
}: {
  title: string
  value: string
  change: string
  positive: boolean
  note: string
  icon: typeof Package
  iconClass: string
  sparkline: number[]
}) {
  const points = sparkline
    .map((point, index) => `${(index / (sparkline.length - 1)) * 100},${34 - point * 0.3}`)
    .join(' ')

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{title}</span>
        <span className={`stat-icon ${iconClass}`}><Icon size={18} /></span>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-bottom">
        <span className={`change-pill ${positive ? 'positive' : 'negative'}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {change}
        </span>
        <span className="stat-note">{note}</span>
      </div>

      <svg className="stat-sparkline" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <polyline points={points} fill="none" stroke={positive ? '#a78bfa' : '#f59eaa'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </article>
  )
}

function RevenueChart() {
  const [period, setPeriod] = useState('12 months')
  const displayedData = period === '6 months' ? revenueData.slice(-6) : revenueData

  return (
    <section className="panel revenue-panel">
      <div className="panel-heading">
        <div>
          <h2>Revenue overview</h2>
          <p>Track your revenue performance over time</p>
        </div>
        <div className="chart-actions">
          <div className="period-toggle">
            {['6 months', '12 months'].map((item) => (
              <button
                key={item}
                className={period === item ? 'selected' : ''}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="more-button" aria-label="Revenue options"><MoreHorizontal size={19} /></button>
        </div>
      </div>

      <div className="revenue-summary">
        <strong>$72,000</strong>
        <span className="change-pill positive"><ArrowUpRight size={13} /> 18.6%</span>
        <span className="summary-caption">vs. previous period</span>
      </div>

      <div className="chart-legend">
        <span><i className="legend-dot current-dot" /> Current period</span>
        <span><i className="legend-dot previous-dot" /> Previous period</span>
      </div>

      <div className="revenue-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayedData} margin={{ top: 12, right: 6, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9b7bff" stopOpacity={0.26} />
                <stop offset="95%" stopColor="#9b7bff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#282630" strokeDasharray="3 5" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#858291', fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#858291', fontSize: 11 }}
              tickFormatter={(value: number) => `$${value / 1000}k`}
              ticks={[0, 20000, 40000, 60000, 80000]}
            />
            <Tooltip
              contentStyle={{
                background: '#1d1b26',
                border: '1px solid #373344',
                borderRadius: 10,
                color: '#f6f4fc',
                fontSize: 12,
              }}
              formatter={(value) => [currency(Number(value)), 'Revenue']}
              labelStyle={{ color: '#b9b2ca', marginBottom: 4 }}
            />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="#635d73"
              strokeWidth={1.8}
              strokeDasharray="5 5"
              fill="transparent"
              activeDot={{ r: 3 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#a78bfa"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              activeDot={{ r: 5, fill: '#c4b5fd', stroke: '#211b34', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

function ShipmentChart() {
  const [mode, setMode] = useState('This week')

  return (
    <section className="panel shipment-chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Shipment activity</h2>
          <p>Daily shipment volume and delivery status</p>
        </div>
        <button className="select-button" onClick={() => setMode(mode === 'This week' ? 'Last week' : 'This week')}>
          {mode} <ChevronDown size={14} />
        </button>
      </div>

      <div className="shipment-chart-legend">
        <span><i className="legend-dot current-dot" /> Delivered</span>
        <span><i className="legend-dot" style={{ background: '#51416e' }} /> In transit</span>
      </div>

      <div className="shipment-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={shipmentData} barGap={5} margin={{ top: 10, right: 0, left: -22, bottom: 0 }}>
            <CartesianGrid stroke="#282630" strokeDasharray="3 5" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#858291', fontSize: 11 }}
              dy={9}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#858291', fontSize: 10 }}
            />
            <Tooltip
              cursor={{ fill: '#ffffff', opacity: 0.035 }}
              contentStyle={{
                background: '#1d1b26',
                border: '1px solid #373344',
                borderRadius: 10,
                color: '#f6f4fc',
                fontSize: 12,
              }}
            />
            <Bar dataKey="delivered" name="Delivered" fill="#9b7bff" radius={[4, 4, 0, 0]} maxBarSize={18} />
            <Bar dataKey="transit" name="In transit" fill="#51416e" radius={[4, 4, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

function DeliveryBreakdown() {
  return (
    <section className="panel breakdown-panel">
      <div className="panel-heading">
        <div>
          <h2>Delivery breakdown</h2>
          <p>Current shipment distribution</p>
        </div>
        <button className="more-button" aria-label="Delivery breakdown options"><MoreHorizontal size={19} /></button>
      </div>

      <div className="donut-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="68%"
              outerRadius="90%"
              paddingAngle={4}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {statusData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1d1b26',
                border: '1px solid #373344',
                borderRadius: 10,
                color: '#f6f4fc',
                fontSize: 12,
              }}
              formatter={(value) => [`${value}%`, 'Share']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <strong>2,847</strong>
          <span>Total shipments</span>
        </div>
      </div>

      <div className="breakdown-legend">
        {statusData.map((item) => (
          <div className="breakdown-row" key={item.name}>
            <span className="breakdown-label">
              <i className="legend-dot" style={{ background: item.color }} />
              {item.name}
            </span>
            <strong>{item.value}%</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

function ShipmentTable({
  search,
}: {
  search: string
}) {
  const [filter, setFilter] = useState('All shipments')

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch = [
        shipment.id,
        shipment.customer,
        shipment.destination,
        shipment.status,
      ].some((value) => value.toLowerCase().includes(search.toLowerCase()))

      const matchesFilter = filter === 'All shipments' || shipment.status === filter
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <section className="panel table-panel">
      <div className="panel-heading table-heading">
        <div>
          <h2>Recent shipments</h2>
          <p>A quick look at your latest logistics activity</p>
        </div>
        <div className="table-actions">
          <label className="filter-select">
            <span className="sr-only">Filter shipments by status</span>
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option>All shipments</option>
              <option>Delivered</option>
              <option>In transit</option>
              <option>Pending</option>
              <option>Delayed</option>
            </select>
            <ChevronDown size={14} />
          </label>
          <button className="export-button" onClick={() => {
            const csvRows = [
              ['Shipment ID', 'Customer', 'Destination', 'Date', 'Amount', 'Status'],
              ...filteredShipments.map((s) => [s.id, s.customer, s.destination, s.date, s.amount, s.status]),
            ]
            const csv = csvRows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n')
            const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
            const link = document.createElement('a')
            link.href = url
            link.download = 'pulseboard-shipments.csv'
            link.click()
            URL.revokeObjectURL(url)
          }}>
            <ArrowDownToLine size={15} /> <span>Export</span>
          </button>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>SHIPMENT</th>
              <th>CUSTOMER</th>
              <th>DESTINATION</th>
              <th>DATE</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th aria-label="More actions" />
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td><span className="shipment-id">{shipment.id}</span></td>
                <td>
                  <div className="customer-cell">
                    <span className={`customer-avatar ${shipment.color}`}>{shipment.initials}</span>
                    <span className="customer-name">{shipment.customer}</span>
                  </div>
                </td>
                <td className="destination-cell">{shipment.destination}</td>
                <td className="date-cell">{shipment.date}</td>
                <td className="amount-cell">{shipment.amount}</td>
                <td>
                  <span className={`status-badge ${shipment.status.toLowerCase().replace(' ', '-')}`}>
                    <i /> {shipment.status}
                  </span>
                </td>
                <td><button className="row-more" aria-label={`More options for ${shipment.id}`}><MoreHorizontal size={17} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredShipments.length === 0 && (
          <div className="empty-state">No shipments match your search.</div>
        )}
      </div>

      <div className="table-footer">
        <span>Showing <strong>{filteredShipments.length}</strong> of {shipments.length} shipments</span>
        <div className="pagination">
          <button disabled aria-label="Previous page">←</button>
          <button className="page-current">1</button>
          <button disabled aria-label="Next page">→</button>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [search, setSearch] = useState('')
  const [range, setRange] = useState('Last 30 days')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button className="mobile-backdrop" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
      )}
      <div className={mobileMenuOpen ? 'sidebar-container mobile-open' : 'sidebar-container'}>
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page)
            setMobileMenuOpen(false)
          }}
        />
      </div>

      <main className="main-area">
        <Header activePage={activePage} search={search} onSearch={setSearch} />

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="live-dot" /> YOUR BUSINESS AT A GLANCE</div>
              <h1>{activePage === 'Overview' ? 'Good morning, Hayat' : activePage}</h1>
              <p className="welcome-description">
                Here's what's happening with your logistics business today.
              </p>
            </div>
            <div className="welcome-actions">
              <label className="date-select">
                <CalendarDays size={16} />
                <select value={range} onChange={(event) => setRange(event.target.value)}>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <ChevronDown size={14} />
              </label>
              <button className="primary-button" onClick={() => window.print()}>
                <ArrowDownToLine size={16} /> Export report
              </button>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard
              title="Total revenue"
              value="$284,592"
              change="+12.8%"
              positive
              note="vs. last month"
              icon={CreditCard}
              iconClass="purple"
              sparkline={[20, 25, 21, 29, 24, 32, 28, 37, 31, 39, 34, 42]}
            />
            <StatCard
              title="Total shipments"
              value="2,847"
              change="+8.2%"
              positive
              note="vs. last month"
              icon={Package}
              iconClass="violet"
              sparkline={[17, 22, 19, 28, 24, 30, 27, 34, 29, 38, 35, 41]}
            />
            <StatCard
              title="On-time delivery"
              value="96.8%"
              change="+2.4%"
              positive
              note="vs. last month"
              icon={ShieldCheck}
              iconClass="green"
              sparkline={[23, 27, 25, 30, 29, 33, 31, 35, 34, 38, 37, 41]}
            />
            <StatCard
              title="Avg. delivery time"
              value="2.4 days"
              change="-0.6 days"
              positive
              note="vs. last month"
              icon={Clock3}
              iconClass="orange"
              sparkline={[39, 36, 37, 31, 34, 29, 30, 26, 29, 23, 24, 19]}
            />
          </section>

          <section className="primary-charts">
            <RevenueChart />
            <ShipmentChart />
          </section>

          <section className="secondary-charts">
            <DeliveryBreakdown />

            <section className="panel performance-panel">
              <div className="panel-heading">
                <div>
                  <h2>Delivery performance</h2>
                  <p>Service quality this month</p>
                </div>
                <span className="performance-icon"><ShieldCheck size={18} /></span>
              </div>

              <div className="performance-score">
                <strong>96.8<span>%</span></strong>
                <span className="change-pill positive"><ArrowUpRight size={13} /> 2.4%</span>
              </div>
              <p className="performance-subtitle">On-time delivery rate</p>

              <div className="performance-progress">
                <div style={{ width: '96.8%' }} />
              </div>
              <div className="progress-labels"><span>0%</span><span>Target: 95%</span><span>100%</span></div>

              <div className="performance-divider" />

              <div className="performance-metric">
                <span><Check size={15} /> Successfully delivered</span>
                <strong>2,756</strong>
              </div>
              <div className="performance-metric">
                <span><Clock3 size={15} /> Average transit time</span>
                <strong>2.4 days</strong>
              </div>
              <div className="performance-metric">
                <span><Truck size={15} /> Active vehicles</span>
                <strong>148</strong>
              </div>
            </section>

            <section className="panel quick-insight-panel">
              <div className="insight-icon"><Zap size={19} /></div>
              <span className="insight-label">PULSE INSIGHT</span>
              <h2>Your logistics are looking good.</h2>
              <p>On-time deliveries have improved by 2.4% this month. Keep it up to reach your 98% target.</p>
              <button onClick={() => setActivePage('Analytics')}>Explore analytics <ArrowUpRight size={15} /></button>
              <div className="insight-decoration" />
            </section>
          </section>

          <ShipmentTable search={search} />

          <footer className="dashboard-footer">
            <span>© 2026 Pulseboard. Built for better decisions.</span>
            <span><i className="footer-status-dot" /> All systems operational</span>
          </footer>
        </div>
      </main>

      <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle navigation">
        {mobileMenuOpen ? <Check size={20} /> : <Command size={20} />}
      </button>
    </div>
  )
}

export default App
