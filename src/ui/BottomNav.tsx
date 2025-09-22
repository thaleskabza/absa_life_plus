// src/ui/BottomNav.tsx - Responsive navigation for all screen sizes
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
      isActive: currentPath === "/offers" // Fixed: was "/d"
    }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#1a1a1a',
      borderTop: '1px solid #333',
      padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
      overflowX: 'auto', // Allow horizontal scroll if needed
      scrollbarWidth: 'none', // Hide scrollbar on Firefox
      msOverflowStyle: 'none', // Hide scrollbar on IE/Edge
    }}>
      {/* Hide scrollbar on Webkit browsers */}
      <style>
        {`
          nav::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between', // Changed from space-around
        alignItems: 'center',
        minWidth: '100%', // Ensure full width usage
        padding: '0 8px', // Reduced padding
        boxSizing: 'border-box'
      }}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px', // Reduced gap
              padding: '6px 2px', // Reduced padding
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              borderRadius: '8px', // Reduced border radius
              flex: '1', // Make each item take equal space
              maxWidth: '70px', // Maximum width per item
              minWidth: '45px', // Minimum width per item
              position: 'relative',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {/* Special styling for Life+ button */}
            {item.isSpecial ? (
              <div style={{
                width: '40px', // Reduced size
                height: '40px', // Reduced size
                background: item.isActive 
                  ? '#C41E3A' 
                  : 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: item.isActive ? '0 4px 12px rgba(196, 30, 58, 0.3)' : '0 2px 8px rgba(196, 30, 58, 0.2)',
                transform: item.isActive ? 'scale(1.05)' : 'scale(1)'
              }}>
                <span className="material-icons-outlined" style={{
                  fontSize: '20px', // Reduced icon size
                  color: '#fff'
                }}>
                  {item.icon}
                </span>
              </div>
            ) : (
              <span 
                className="material-icons-outlined" 
                style={{
                  fontSize: '20px', // Reduced icon size
                  color: item.isActive ? '#C41E3A' : '#999',
                  transition: 'color 0.2s ease'
                }}
              >
                {item.icon}
              </span>
            )}
            
            <span style={{
              fontSize: '10px', // Reduced font size
              fontWeight: item.isActive ? '600' : '400',
              color: item.isActive ? '#C41E3A' : '#999',
              transition: 'color 0.2s ease',
              textAlign: 'center',
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}>
              {item.label}
            </span>

            {/* Active indicator for non-special items */}
            {item.isActive && !item.isSpecial && (
              <div style={{
                position: 'absolute',
                top: '1px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '3px',
                height: '3px',
                background: '#C41E3A',
                borderRadius: '50%'
              }} />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}