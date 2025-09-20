// src/pages/RetailBank.tsx - Banking Dashboard Landing Screen
import { useState } from 'react';
import BottomNav from "../ui/BottomNav";

export default function RetailBank() {
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { icon: 'payments', label: 'Pay', color: '#C41E3A' },
    { icon: 'phone_android', label: 'Buy Airtime', color: '#C41E3A' },
    { icon: 'sync_alt', label: 'Transfer', color: '#C41E3A' },
    { icon: 'account_balance_wallet', label: 'CashSend', color: '#C41E3A' }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a1a',
      color: '#fff'
    }}>
      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px 8px',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        <span>15:33</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px' }}>📶</span>
          <span style={{ fontSize: '12px' }}>📶</span>
          <span style={{ 
            background: '#C41E3A', 
            color: '#fff', 
            borderRadius: '10px', 
            padding: '2px 6px', 
            fontSize: '12px' 
          }}>20</span>
        </div>
      </div>

      {/* Header Section */}
      <header style={{ 
        padding: '0 20px 20px',
        borderBottom: '1px solid #333'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
              color: '#fff'
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
            <div style={{
              background: '#C41E3A',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span className="material-icons-outlined" style={{ fontSize: '20px', color: '#fff' }}>
                chat
              </span>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#999',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Log out
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              style={{
                background: action.color,
                border: 'none',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                marginBottom: '8px'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span className="material-icons-outlined" style={{
                fontSize: '24px',
                color: '#fff'
              }}>
                {action.icon}
              </span>
            </button>
          ))}
        </div>
        
        {/* Action Labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '8px'
        }}>
          {quickActions.map((action, index) => (
            <span key={index} style={{
              fontSize: '12px',
              color: '#ccc',
              textAlign: 'center',
              width: '56px'
            }}>
              {action.label}
            </span>
          ))}
        </div>
      </header>

      {/* Account Cards Section */}
      <main style={{ 
        padding: '20px',
        paddingBottom: '100px'
      }}>
        {/* Current Account */}
        <div style={{
          background: 'linear-gradient(135deg, #C41E3A 0%, #A91B47 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
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
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div></div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '4px'
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
        </div>

        {/* Savings Account */}
        <div style={{
          background: 'linear-gradient(135deg, #C41E3A 0%, #B91C3F 100%)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
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
            <div></div>
            <div style={{ textAlign: 'right' }}>
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
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
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
            <div></div>
            <div style={{ textAlign: 'right' }}>
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
          
          {/* New Challenge Badge */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#C41E3A',
            borderRadius: '20px',
            padding: '8px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <span className="material-icons-outlined" style={{ fontSize: '16px' }}>
              emoji_events
            </span>
            New challenge available
          </div>
        </div>

        {/* Illustration Section */}
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #C41E3A 100%)',
          borderRadius: '16px',
          padding: '20px',
          minHeight: '120px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#fff'
          }}>
            <span className="material-icons-outlined" style={{ fontSize: '48px', marginBottom: '8px' }}>
              person
            </span>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
              Discover more features
            </p>
          </div>
          
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
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

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}