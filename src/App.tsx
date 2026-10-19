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

type DateRange = 'Last 7 days' | 'Last 30 days' | 'Last 90 days'

type RevenuePoint = {
  month: string
  revenue: number
  previous: number
}

const revenueData: Record<DateRange, RevenuePoint[]> = {
  'Last 7 days': [
    { month: 'Mon', revenue: 2100, previous: 1800 },
    { month: 'Tue', revenue: 2850, previous: 2200 },
    { month: 'Wed', revenue: 2400, previous: 2500 },
    { month: 'Thu', revenue: 3400, previous: 2700 },
    { month: 'Fri', revenue: 3900, previous: 3100 },
    { month: 'Sat', revenue: 2650, previous: 2300 },
    { month: 'Sun', revenue: 3120, previous: 2600 },
  ],
  'Last 30 days': [
    { month: 'Week 1', revenue: 15800, previous: 14200 },
    { month: 'Week 2', revenue: 18400, previous: 15600 },
    { month: 'Week 3', revenue: 17200, previous: 16100 },
    { month: 'Week 4', revenue: 23460, previous: 19800 },
  ],
  'Last 90 days': [
    { month: 'Oct', revenue: 63500, previous: 46500 },
    { month: 'Nov', revenue: 58000, previous: 48000 },
    { month: 'Dec', revenue: 72000, previous: 53000 },
  ],
}

const rangeMetrics: Record<
  DateRange,
  {
    revenue: string
    revenueChange: string
    shipments: string
    shipmentChange: string
    onTime: string
    onTimeChange: string
    deliveryTime: string
    deliveryChange: string
  }
> = {
  'Last 7 days': {
    revenue: '$20,420',
    revenueChange: '+8.4%',
    shipments: '184',
    shipmentChange: '+6.2%',
    onTime: '97.2%',
    onTimeChange: '+1.8%',
    deliveryTime: '2.2 days',
    deliveryChange: '-0.3 days',
  },
  'Last 30 days': {
    revenue: '$74,860',
    revenueChange: '+12.8%',
    shipments: '742',
    shipmentChange: '+8.2%',
    onTime: '96.8%',
    onTimeChange: '+2.4%',
    deliveryTime: '2.4 days',
    deliveryChange: '-0.6 days',
  },
  'Last 90 days': {
    revenue: '$193,500',
    revenueChange: '+18.6%',
    shipments: '2,165',
    shipmentChange: '+11.5%',
    onTime: '96.4%',
    onTimeChange: '+2.1%',
    deliveryTime: '2.5 days',
    deliveryChange: '-0.4 days',
  },
}

const shipmentData: Record<
  'This week' | 'Last week',
  { day: string; delivered: number; transit: number }[]
> = {
  'This week': [
    { day: 'Mon', delivered: 128, transit: 45 },
    { day: 'Tue', delivered: 165, transit: 58 },
    { day: 'Wed', delivered: 142, transit: 42 },
    { day: 'Thu', delivered: 198, transit: 67 },
    { day: 'Fri', delivered: 176, transit: 54 },
    { day: 'Sat', delivered: 115, transit: 38 },
    { day: 'Sun', delivered: 92, transit: 28 },
  ],
  'Last week': [
    { day: 'Mon', delivered: 110, transit: 52 },
    { day: 'Tue', delivered: 142, transit: 48 },
    { day: 'Wed', delivered: 156, transit: 61 },
    { day: 'Thu', delivered: 174, transit: 58 },
    { day: 'Fri', delivered: 160, transit: 49 },
    { day: 'Sat', delivered: 102, transit: 34 },
    { day: 'Sun', delivered: 86, transit: 25 },
  ],
}

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
      <a
        className="brand"
        href="#overview"
        onClick={() => onNavigate('Overview')}
      >
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
                {activePage === label && (
                  <span className="active-indicator" />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Zap size={17} />
          </div>
          <strong>Unlock more insights</strong>
          <p>
            Get advanced reports and real-time shipment analytics.
          </p>
          <button onClick={() => onNavigate('Upgrade')}>
            Explore plans <ArrowUpRight size={14} />
          </button>
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
            placeholder="Search shipments..."
            aria-label="Search shipments"
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="notification-wrap">
          <button
            className={`icon-button ${notificationsOpen ? 'selected' : ''}`}
            aria-label="Toggle notifications"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((value) => !value)}
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          {notificationsOpen && (
            <div className="notification-popover">
              <strong>Notifications</strong>
              <p>
                <span className="notice-dot purple-dot" />
                3 shipments are awaiting updates.
              </p>
              <p>
                <span className="notice-dot green-dot" />
                Your weekly report is ready.
              </p>
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
    .map(
      (point, index) =>
        `${(index / (sparkline.length - 1)) * 100},${34 - point * 0.3}`,
    )
    .join(' ')

  return (
    <article className="stat-card">
      <div className="stat-card-top">
        <span className="stat-label">{title}</span>
        <span className={`stat-icon ${iconClass}`}>
          <Icon size={18} />
        </span>
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-bottom">
        <span className={`change-pill ${positive ? 'positive' : 'negative'}`}>
          {positive ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          {change}
        </span>
        <span className="stat-note">{note}</span>
      </div>

      <svg
        className="stat-sparkline"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points={points}
          fill="none"
          stroke={positive ? '#a78bfa' : '#f59eaa'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </article>
  )
}

function RevenueChart({ range }: { range: DateRange }) {
  const displayedData = revenueData[range]

  const totalRevenue = displayedData.reduce(
    (total, item) => total + item.revenue,
    0,
  )

  const previousRevenue = displayedData.reduce(
    (total, item) => total + item.previous,
    0,
  )

  const change =
    previousRevenue === 0
      ? 0
      : ((totalRevenue - previousRevenue) / previousRevenue) * 100

  return (
    <section className="panel revenue-panel">
      <div className="panel-heading">
        <div>
          <h2>Revenue overview</h2>
          <p>Track your revenue performance over time</p>
        </div>
        <span className="summary-caption">{range}</span>
      </div>

      <div className="revenue-summary">
        <strong>{currency(totalRevenue)}</strong>
        <span className={`change-pill ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          {Math.abs(change).toFixed(1)}%
        </span>
        <span className="summary-caption">vs. previous period</span>
      </div>

      <div className="chart-legend">
        <span>
          <i className="legend-dot current-dot" /> Current period
        </span>
        <span>
          <i className="legend-dot previous-dot" /> Previous period
        </span>
      </div>

      <div className="revenue-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayedData}
            margin={{ top: 12, right: 6, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="revenueFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#9b7bff" stopOpacity={0.26} />
                <stop offset="95%" stopColor="#9b7bff" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#282630"
              strokeDasharray="3 5"
              vertical={false}
            />

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
              tickFormatter={(value: number) =>
                value >= 1000 ? `$${value / 1000}k` : `$${value}`
              }
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
              name="Previous period"
              stroke="#635d73"
              strokeWidth={1.8}
              strokeDasharray="5 5"
              fill="transparent"
              activeDot={{ r: 3 }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              name="Current period"
              stroke="#a78bfa"
              strokeWidth={2.5}
              fill="url(#revenueFill)"
              activeDot={{
                r: 5,
                fill: '#c4b5fd',
                stroke: '#211b34',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

function ShipmentChart() {
  const [mode, setMode] = useState<'This week' | 'Last week'>('This week')
  const displayedData = shipmentData[mode]

  return (
    <section className="panel shipment-chart-panel">
      <div className="panel-heading">
        <div>
          <h2>Shipment activity</h2>
          <p>Daily shipment volume and delivery status</p>
        </div>
        <label className="select-button">
          <span className="sr-only">Shipment activity period</span>
          <select
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as 'This week' | 'Last week')
            }
          >
            <option>This week</option>
            <option>Last week</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>

      <div className="shipment-chart-legend">
        <span>
          <i className="legend-dot current-dot" /> Delivered
        </span>
        <span>
          <i className="legend-dot" style={{ background: '#51416e' }} /> In
          transit
        </span>
      </div>

      <div className="shipment-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={displayedData}
            barGap={5}
            margin={{ top: 10, right: 0, left: -22, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#282630"
              strokeDasharray="3 5"
              vertical={false}
            />
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
            <Bar
              dataKey="delivered"
              name="Delivered"
              fill="#9b7bff"
              radius={[4, 4, 0, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="transit"
              name="In transit"
              fill="#51416e"
              radius={[4, 4, 0, 0]}
              maxBarSize={18}
            />
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
        <span className="performance-icon">
          <Activity size={18} />
        </span>
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

function ShipmentTable({ search }: { search: string }) {
  const [filter, setFilter] = useState('All shipments')

  const filteredShipments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return shipments.filter((shipment) => {
      const matchesSearch = [
        shipment.id,
        shipment.customer,
        shipment.destination,
        shipment.status,
      ].some((value) => value.toLowerCase().includes(normalizedSearch))

      const matchesFilter =
        filter === 'All shipments' || shipment.status === filter

      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const exportCsv = () => {
    const csvRows = [
      [
        'Shipment ID',
        'Customer',
        'Destination',
        'Date',
        'Amount',
        'Status',
      ],
      ...filteredShipments.map((shipment) => [
        shipment.id,
        shipment.customer,
        shipment.destination,
        shipment.date,
        shipment.amount,
        shipment.status,
      ]),
    ]

    const csv = csvRows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\r\n')

    const blob = new Blob(['\uFEFF', csv], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'pulseboard-shipments.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

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
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            >
              <option>All shipments</option>
              <option>Delivered</option>
              <option>In transit</option>
              <option>Pending</option>
              <option>Delayed</option>
            </select>
            <ChevronDown size={14} />
          </label>

          <button
            className="export-button"
            onClick={exportCsv}
            disabled={filteredShipments.length === 0}
          >
            <ArrowDownToLine size={15} />
            <span>Export</span>
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
                <td>
                  <span className="shipment-id">{shipment.id}</span>
                </td>
                <td>
                  <div className="customer-cell">
                    <span
                      className={`customer-avatar ${shipment.color}`}
                    >
                      {shipment.initials}
                    </span>
                    <span className="customer-name">
                      {shipment.customer}
                    </span>
                  </div>
                </td>
                <td className="destination-cell">{shipment.destination}</td>
                <td className="date-cell">{shipment.date}</td>
                <td className="amount-cell">{shipment.amount}</td>
                <td>
                  <span
                    className={`status-badge ${shipment.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    <i /> {shipment.status}
                  </span>
                </td>
                <td>
                  <button
                    className="row-more"
                    aria-label={`More options for ${shipment.id}`}
                    title={`Shipment ${shipment.id}`}
                    onClick={() =>
                      window.alert(
                        `${shipment.id}\nCustomer: ${shipment.customer}\nDestination: ${shipment.destination}\nStatus: ${shipment.status}`,
                      )
                    }
                  >
                    <MoreHorizontal size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredShipments.length === 0 && (
          <div className="empty-state">
            No shipments match your search or selected status.
          </div>
        )}
      </div>

      <div className="table-footer">
        <span>
          Showing <strong>{filteredShipments.length}</strong> of{' '}
          {shipments.length} shipments
        </span>
        <div className="pagination">
          <button disabled aria-label="Previous page">
            ←
          </button>
          <button className="page-current" aria-current="page">
            1
          </button>
          <button disabled aria-label="Next page">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Overview')
  const [search, setSearch] = useState('')
  const [range, setRange] = useState<DateRange>('Last 30 days')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const metrics = rangeMetrics[range]

  return (
    <div className="app-shell">
      {mobileMenuOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={
          mobileMenuOpen
            ? 'sidebar-container mobile-open'
            : 'sidebar-container'
        }
      >
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page)
            setMobileMenuOpen(false)
          }}
        />
      </div>

      <main className="main-area">
        <Header
          activePage={activePage}
          search={search}
          onSearch={setSearch}
        />

        <div className="dashboard-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow">
                <span className="live-dot" /> YOUR BUSINESS AT A GLANCE
              </div>
              <h1>
                {activePage === 'Overview'
                  ? 'Good morning, Hayat'
                  : activePage}
              </h1>
              <p className="welcome-description">
                Here's what's happening with your logistics business today.
              </p>
            </div>

            <div className="welcome-actions">
              <label className="date-select">
                <CalendarDays size={16} />
                <select
                  aria-label="Select analytics date range"
                  value={range}
                  onChange={(event) =>
                    setRange(event.target.value as DateRange)
                  }
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <ChevronDown size={14} />
              </label>

              <button
                className="primary-button"
                onClick={() => window.print()}
              >
                <ArrowDownToLine size={16} /> Export report
              </button>
            </div>
          </section>

          <section className="stats-grid">
            <StatCard
              title="Total revenue"
              value={metrics.revenue}
              change={metrics.revenueChange}
              positive
              note={range.toLowerCase()}
              icon={CreditCard}
              iconClass="purple"
              sparkline={[20, 25, 21, 29, 24, 32, 28, 37, 31, 39, 34, 42]}
            />
            <StatCard
              title="Total shipments"
              value={metrics.shipments}
              change={metrics.shipmentChange}
              positive
              note={range.toLowerCase()}
              icon={Package}
              iconClass="violet"
              sparkline={[17, 22, 19, 28, 24, 30, 27, 34, 29, 38, 35, 41]}
            />
            <StatCard
              title="On-time delivery"
              value={metrics.onTime}
              change={metrics.onTimeChange}
              positive
              note={range.toLowerCase()}
              icon={ShieldCheck}
              iconClass="green"
              sparkline={[23, 27, 25, 30, 29, 33, 31, 35, 34, 38, 37, 41]}
            />
            <StatCard
              title="Avg. delivery time"
              value={metrics.deliveryTime}
              change={metrics.deliveryChange}
              positive
              note={range.toLowerCase()}
              icon={Clock3}
              iconClass="orange"
              sparkline={[39, 36, 37, 31, 34, 29, 30, 26, 29, 23, 24, 19]}
            />
          </section>

          <section className="primary-charts">
            <RevenueChart range={range} />
            <ShipmentChart />
          </section>

          <section className="secondary-charts">
            <DeliveryBreakdown />

            <section className="panel performance-panel">
              <div className="panel-heading">
                <div>
                  <h2>Delivery performance</h2>
                  <p>Service quality for the selected period</p>
                </div>
                <span className="performance-icon">
                  <ShieldCheck size={18} />
                </span>
              </div>

              <div className="performance-score">
                <strong>
                  {metrics.onTime.replace('%', '')}
                  <span>%</span>
                </strong>
                <span className="change-pill positive">
                  <ArrowUpRight size={13} /> {metrics.onTimeChange}
                </span>
              </div>
              <p className="performance-subtitle">On-time delivery rate</p>

              <div className="performance-progress">
                <div style={{ width: metrics.onTime }} />
              </div>
              <div className="progress-labels">
                <span>0%</span>
                <span>Target: 95%</span>
                <span>100%</span>
              </div>

              <div className="performance-divider" />

              <div className="performance-metric">
                <span>
                  <Check size={15} /> Successfully delivered
                </span>
                <strong>
                  {Math.round(
                    Number(metrics.shipments.replace(',', '')) *
                      (Number(metrics.onTime.replace('%', '')) / 100),
                  ).toLocaleString('en-US')}
                </strong>
              </div>
              <div className="performance-metric">
                <span>
                  <Clock3 size={15} /> Average transit time
                </span>
                <strong>{metrics.deliveryTime}</strong>
              </div>
              <div className="performance-metric">
                <span>
                  <Truck size={15} /> Active vehicles
                </span>
                <strong>148</strong>
              </div>
            </section>

            <section className="panel quick-insight-panel">
              <div className="insight-icon">
                <Zap size={19} />
              </div>
              <span className="insight-label">PULSE INSIGHT</span>
              <h2>Your logistics are looking good.</h2>
              <p>
                On-time deliveries are at {metrics.onTime}. Keep improving
                your operations to reach your 98% target.
              </p>
              <button onClick={() => setActivePage('Analytics')}>
                Explore analytics <ArrowUpRight size={15} />
              </button>
              <div className="insight-decoration" />
            </section>
          </section>

          <ShipmentTable search={search} />

          <footer className="dashboard-footer">
            <span>© 2026 Pulseboard. Built for better decisions.</span>
            <span>
              <i className="footer-status-dot" /> All systems operational
            </span>
          </footer>
        </div>
      </main>

      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen((value) => !value)}
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <Check size={20} /> : <Command size={20} />}
      </button>
    </div>
  )
}

export default App