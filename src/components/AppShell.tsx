// src/components/AppShell.tsx
import { Link, useLocation } from "react-router-dom";

export default function AppShell({ title, children }: { title: string; children: React.ReactNode }) {
  const loc = useLocation().pathname;
  
  const NavButton = ({ to, label }: { to: string; label: string }) => (
    <Link 
      to={to} 
      className={`nav-btn ${loc === to ? 'active' : ''}`}
      style={{
        textDecoration: 'none',
        padding: '12px 16px',
        borderRadius: '12px',
        backgroundColor: loc === to ? 'var(--absa-red)' : '#fff',
        color: loc === to ? '#fff' : 'var(--absa-red)',
        border: '1px solid var(--border)',
        minWidth: '90px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all var(--transition-fast)',
        boxShadow: loc === to ? 'var(--shadow-1)' : 'none'
      }}
    >
      {label}
    </Link>
  );

  return (
    <div style={{ 
      fontFamily: 'var(--font-family)', 
      backgroundColor: 'var(--bg)', 
      minHeight: '100vh',
      paddingBottom: '100px' 
    }}>
      {/* Header */}
      <header style={{
        padding: 'var(--space-3)',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <h1 className="h2" style={{ margin: 0, color: 'var(--ink)' }}>
          {title}
        </h1>
      </header>

      {/* Main Content */}
      <main className="container">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: '12px',
        left: 0,
        right: 0,
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        padding: '0 var(--space-3)',
        zIndex: 100
      }}>
        <NavButton to="/concierge" label="Concierge" />
        <NavButton to="/rewards" label="Rewards" />
        <NavButton to="/wallet" label="Wallet" />
        <NavButton to="/mentors" label="Mentors" />
      </nav>
    </div>
  );
}