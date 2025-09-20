// src/pages/RetailBank.tsx - Mobile-Optimized Banking Dashboard
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";

export default function RetailBank() {
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const quickActions = [
    { icon: 'payments', label: 'Pay', color: '#C41E3A' },
    { icon: 'phone_android', label: 'Buy Airtime', color: '#C41E3A' },
    { icon: 'sync_alt', label: 'Transfer', color: '#C41E3A' },
    { icon: 'account_balance_wallet', label: 'CashSend', color: '#C41E3A' }
  ];

  // Simulate loading and update time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 60000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  // Mobile-friendly touch handler for balance toggle
  const handleBalanceToggle = () => {
    setShowBalance(!showBalance);
    // Add haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #333',
            borderTop: '3px solid #C41E3A',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ fontSize: '16px', opacity: 0.8 }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a1a',
      color: '#fff',
      paddingBottom: '80px' // Account for bottom nav
    }}>
      {/* Mobile Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px 8px',
        fontSize: '14px',
        fontWeight: '600',
        background: '#1a1a1a',
        borderBottom: '1px solid #333'
      }}>
        <span>{currentTime.toLocaleTimeString('en-ZA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        })}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{
            width: '18px',
            height: '12px',
            border: '1px solid #fff',
            borderRadius: '2px',
            position: 'relative',
            opacity: 0.8
          }}>
            <div style={{
              width: '70%',
              height: '100%',
              background: '#4CAF50',
              borderRadius: '1px'
            }} />
          </div>
          <span style={{ 
            background: '#C41E3A', 
            color: '#fff', 
            borderRadius: '10px', 
            padding: '2px 6px', 
            fontSize: '12px',
            minWidth: '20px',
            textAlign: 'center'
          }}>3</span>
        </div>
      </div>

      {/* Header Section */}
      <header style={{ 
        padding: '0 20px 20px',
        background: '#1a1a1a'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          paddingTop: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '52px', // Slightly larger for better touch
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(196, 30, 58, 0.3)'
            }}>
              KM
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '2px'
              }}>
                Kabelo Modipa
              </h2>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#999',
                fontWeight: '400'
              }}>
                Personal Bank Account
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              style={{
                background: '#C41E3A',
                borderRadius: '50%',
                width: '44px', // Optimal touch target
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(196, 30, 58, 0.3)'
              }}
              onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span className="material-icons-outlined" style={{ fontSize: '20px', color: '#fff' }}>
                chat
              </span>
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#999',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '8px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Log out
            </button>
          </div>
        </div>

        {/* Quick Actions - Mobile Optimized */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {quickActions.map((action, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <button
                style={{
                  background: action.color,
                  border: 'none',
                  borderRadius: '50%',
                  width: '56px',
                  height: '56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  margin: '0 auto 8px',
                  boxShadow: '0 4px 12px rgba(196, 30, 58, 0.2)',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.9)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(196, 30, 58, 0.4)';
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(196, 30, 58, 0.2)';
                  }, 100);
                }}
              >
                <span className="material-icons-outlined" style={{
                  fontSize: '24px',
                  color: '#fff'
                }}>
                  {action.icon}
                </span>
              </button>
              <span style={{
                fontSize: '12px',
                color: '#ccc',
                fontWeight: '500'
              }}>
                {action.label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Account Cards Section - Mobile Optimized */}
      <main style={{ 
        padding: '0 20px',
        display: 'grid',
        gap: '16px'
      }}>
        {/* Current Account */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #C41E3A 0%, #A91B47 100%)',
            borderRadius: '16px',
            padding: '24px 20px',
            position: 'relative',
            overflow: 'hidden',
            touchAction: 'manipulation',
            cursor: 'pointer'
          }}
          onClick={handleBalanceToggle}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                Current account
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                opacity: 0.8
              }}>
                4106 1956 48
              </p>
            </div>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleBalanceToggle();
              }}
            >
              <span className="material-icons-outlined" style={{
                fontSize: '16px',
                color: '#fff'
              }}>
                {showBalance ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '4px',
                transition: 'all 0.3s ease'
              }}>
                {showBalance ? 'R 24.50' : 'R ••••'}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.8
              }}>
                Available balance
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
        </div>

        {/* Savings Account */}
        <div style={{
          background: 'linear-gradient(135deg, #C41E3A 0%, #B91C3F 100%)',
          borderRadius: '16px',
          padding: '24px 20px',
          touchAction: 'manipulation'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                Savings account
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                opacity: 0.8
              }}>
                9378 1429 69
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                {showBalance ? 'R 1.70' : 'R ••••'}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.8
              }}>
                Current Balance
              </div>
            </div>
          </div>
        </div>

        {/* Absa Rewards */}
        <div style={{
          background: 'linear-gradient(135deg, #D4847C 0%, #C41E3A 100%)',
          borderRadius: '16px',
          padding: '24px 20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '16px'
          }}>
            <div>
              <h3 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                Absa Rewards
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                opacity: 0.8
              }}>
                2303 2400 6277
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '16px'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                {showBalance ? 'R 0.56' : 'R ••••'}
              </div>
              <div style={{
                fontSize: '14px',
                opacity: 0.8
              }}>
                Current Balance
              </div>
            </div>
          </div>
          
          {/* New Challenge Badge - Mobile Optimized */}
          <button style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#C41E3A',
            borderRadius: '20px',
            padding: '12px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            minHeight: '44px',
            transition: 'all 0.2s ease'
          }}>
            <span className="material-icons-outlined" style={{ fontSize: '16px' }}>
              emoji_events
            </span>
            New challenge available
          </button>
        </div>

        {/* Illustration Section - Mobile Optimized */}
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #C41E3A 100%)',
          borderRadius: '16px',
          padding: '24px 20px',
          minHeight: '120px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#fff'
          }}>
            <span className="material-icons-outlined" style={{ 
              fontSize: '48px', 
              marginBottom: '8px',
              display: 'block'
            }}>
              explore
            </span>
            <p style={{ 
              margin: 0, 
              fontSize: '14px', 
              opacity: 0.8,
              fontWeight: '500'
            }}>
              Discover Life+ features
            </p>
          </div>
          
          {/* Enhanced decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '-10px',
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}