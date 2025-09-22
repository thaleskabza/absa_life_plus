import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/ui/BottomNav.tsx - Better responsive navigation with proper sizing
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
            to: "/mentors",
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
        },
        {
            to: "/offers",
            icon: "local_offer",
            label: "Offers",
            isActive: currentPath === "/offers"
        }
    ];
    return (_jsxs("nav", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#1a1a1a',
            borderTop: '1px solid #333',
            padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
            zIndex: 1000,
            boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
        }, children: [_jsx("style", { dangerouslySetInnerHTML: {
                    __html: `
          nav::-webkit-scrollbar {
            display: none;
          }
          
          /* Fade effect for scroll indication */
          nav::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 20px;
            background: linear-gradient(to right, transparent, #1a1a1a);
            pointer-events: none;
            z-index: 1;
          }
          
          nav::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 20px;
            background: linear-gradient(to left, transparent, #1a1a1a);
            pointer-events: none;
            z-index: 1;
          }
        `
                } }), _jsx("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 'max-content',
                    padding: '0 8px',
                    gap: '4px'
                }, children: navItems.map((item, index) => (_jsxs(Link, { to: item.to, style: {
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderRadius: '10px',
                        minWidth: '52px', // Proper minimum touch target
                        position: 'relative',
                        textDecoration: 'none',
                        color: 'inherit',
                        flexShrink: 0
                    }, children: [item.isSpecial ? (_jsx("div", { style: {
                                width: '42px',
                                height: '42px',
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
                                    fontSize: '22px',
                                    color: '#fff'
                                }, children: item.icon }) })) : (_jsx("span", { className: "material-icons-outlined", style: {
                                fontSize: '22px',
                                color: item.isActive ? '#C41E3A' : '#999',
                                transition: 'color 0.2s ease'
                            }, children: item.icon })), _jsx("span", { style: {
                                fontSize: '10px',
                                fontWeight: item.isActive ? '600' : '400',
                                color: item.isActive ? '#C41E3A' : '#999',
                                transition: 'color 0.2s ease',
                                textAlign: 'center',
                                lineHeight: '1.2',
                                whiteSpace: 'nowrap'
                            }, children: item.label }), item.isActive && !item.isSpecial && (_jsx("div", { style: {
                                position: 'absolute',
                                top: '2px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '4px',
                                height: '4px',
                                background: '#C41E3A',
                                borderRadius: '50%'
                            } }))] }, item.to))) })] }));
}
