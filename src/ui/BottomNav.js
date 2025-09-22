import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/ui/BottomNav.tsx - Fixed with all navigation routes
import { Link, useLocation } from "react-router-dom";
export default function BottomNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navItems = [
        {
            to: "/",
            icon: "home",
            label: "Home",
            isActive: currentPath === "/"
        },
        {
            to: "/mentors", // Add mentors navigation
            icon: "school",
            label: "Mentors",
            isActive: currentPath === "/mentors"
        },
        {
            to: "/Concierge",
            icon: "add_circle",
            label: "Life+",
            isActive: currentPath === "/Concierge",
            isSpecial: true
        },
        {
            to: "/wallet",
            icon: "credit_card",
            label: "Wallet",
            isActive: currentPath === "/wallet"
        },
        {
            to: "/quiz",
            icon: "quiz",
            label: "Quiz",
            isActive: currentPath === "/quiz"
        },
        {
            to: "/rewards",
            icon: "card_giftcard",
            label: "Rewards",
            isActive: currentPath === "/rewards"
        }
    ];
    return (_jsx("nav", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#1a1a1a',
            borderTop: '1px solid #333',
            padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
            zIndex: 1000,
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)'
        }, children: _jsx("div", { style: {
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '0 16px'
            }, children: navItems.map((item) => (_jsxs(Link, { to: item.to, style: {
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderRadius: '12px',
                    minWidth: '60px',
                    position: 'relative',
                    textDecoration: 'none',
                    color: 'inherit'
                }, children: [item.isSpecial ? (_jsx("div", { style: {
                            width: '48px',
                            height: '48px',
                            background: item.isActive
                                ? '#C41E3A'
                                : 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: item.isActive ? '0 4px 12px rgba(196, 30, 58, 0.3)' : '0 2px 8px rgba(196, 30, 58, 0.2)',
                            transform: item.isActive ? 'scale(1.05)' : 'scale(1)'
                        }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                fontSize: '24px',
                                color: '#fff'
                            }, children: item.icon }) })) : (_jsx("span", { className: "material-icons-outlined", style: {
                            fontSize: '24px',
                            color: item.isActive ? '#C41E3A' : '#999',
                            transition: 'color 0.2s ease'
                        }, children: item.icon })), _jsx("span", { style: {
                            fontSize: '12px',
                            fontWeight: item.isActive ? '600' : '400',
                            color: item.isActive ? '#C41E3A' : '#999',
                            transition: 'color 0.2s ease'
                        }, children: item.label }), item.isActive && !item.isSpecial && (_jsx("div", { style: {
                            position: 'absolute',
                            top: '2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '4px',
                            background: '#C41E3A',
                            borderRadius: '50%'
                        } }))] }, item.to))) }) }));
}
