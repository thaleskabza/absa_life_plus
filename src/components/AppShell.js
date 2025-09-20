import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/AppShell.tsx
import { Link, useLocation } from "react-router-dom";
export default function AppShell({ title, children }) {
    const loc = useLocation().pathname;
    const NavButton = ({ to, label }) => (_jsx(Link, { to: to, className: `nav-btn ${loc === to ? 'active' : ''}`, style: {
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
        }, children: label }));
    return (_jsxs("div", { style: {
            fontFamily: 'var(--font-family)',
            backgroundColor: 'var(--bg)',
            minHeight: '100vh',
            paddingBottom: '100px'
        }, children: [_jsx("header", { style: {
                    padding: 'var(--space-3)',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid var(--border)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 50
                }, children: _jsx("h1", { className: "h2", style: { margin: 0, color: 'var(--ink)' }, children: title }) }), _jsx("main", { className: "container", children: children }), _jsxs("nav", { style: {
                    position: 'fixed',
                    bottom: '12px',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    padding: '0 var(--space-3)',
                    zIndex: 100
                }, children: [_jsx(NavButton, { to: "/concierge", label: "Concierge" }), _jsx(NavButton, { to: "/rewards", label: "Rewards" }), _jsx(NavButton, { to: "/wallet", label: "Wallet" }), _jsx(NavButton, { to: "/mentors", label: "Mentors" })] })] }));
}
