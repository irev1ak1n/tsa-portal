import { NavLink, Outlet, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { Icon, TabBadge } from './UI.jsx';

const TABS = [
    { to: '/', label: 'Home', icon: 'home', end: true },
    { to: '/events', label: 'Events', icon: 'grid' },
    { to: '/chats', label: 'Chats', icon: 'send', badge: true },
    { to: '/team', label: 'Team', icon: 'users' },
    { to: '/profile', label: 'Profile', icon: 'user' },
];

function Wordmark() {
    return (
        <Link to="/" className="wordmark">
            TSA <span className="mark">HUB</span>
        </Link>
    );
}

function Tabs({ unread }) {
    return (
        <nav className="tabbar" aria-label="Main">
            {TABS.map((t) => (
                <NavLink key={t.to} to={t.to} end={t.end} className={({ isActive }) => (isActive ? 'active' : '')}>
          <span className="tab-ico">
            <Icon name={t.icon} size={21} />
              {t.badge && <TabBadge count={unread} />}
          </span>
                    <span>{t.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

export default function Layout() {
    const { profile, unreadTotal } = useApp();
    const who = profile ? `${profile.name} · ${profile.division} · ${profile.state}` : 'TSA Hub';

    return (
        <div className="shell">
            {/* Desktop rail */}
            <aside className="rail">
                <Wordmark />
                <Tabs unread={unreadTotal} />
                <div className="who">{who}</div>
            </aside>

            {/* Mobile topbar */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <header className="topbar">
                    <Wordmark />
                    <div className="spacer" />
                    <div className="who">{profile ? profile.division + ' · ' + profile.state : ''}</div>
                </header>

                <main className="content">
                    <Outlet />
                </main>
            </div>

            {/* Mobile bottom tabs (hidden on desktop via CSS since .rail shows) */}
            <div className="mobile-tabs-holder">
                <MobileTabs unread={unreadTotal} />
            </div>
        </div>
    );
}

// The tab bar element is reused: on mobile it is fixed at the bottom,
// on desktop the copy inside .rail is the one displayed. To keep the
// DOM simple we render the fixed one only on small screens with CSS.
function MobileTabs({ unread }) {
    return (
        <div className="only-mobile">
            <Tabs unread={unread} />
        </div>
    );
}