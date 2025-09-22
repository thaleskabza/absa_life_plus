// src/pages/Wallet.tsx - Absa Life+ Smart Money Hub
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";
import absaLogo from '../assets/absa-logo-red-bg.svg'; // ABSA logo with red background

// Enhanced interfaces for Life+ ecosystem
interface Card {
  id: string;
  type: 'debit' | 'credit' | 'fx' | 'envelope';
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex';
  balance: number;
  actualBalance?: number; // Life+ Smart Money Hub feature
  creditLimit?: number;
  isActive: boolean;
  expiryDate: string;
  nickname: string;
  category?: string;
}

interface FXRate {
  currency: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
  symbol: string;
}

interface EnvelopeAccount {
  id: string;
  name: string;
  balance: number;
  target: number;
  category: 'travel' | 'emergency' | 'business' | 'savings';
  color: string;
}

interface ConciergeCard {
  id: string;
  type: 'fx_alert' | 'travel_perk' | 'business_opportunity' | 'mentor_session';
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  data?: any;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'debit' | 'credit';
  merchant: string;
  cardId: string;
  category: string;
  location?: string;
}

// Enhanced API with Life+ features
const lifeAPI = {
  getSmartMoneyData: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      cards: [
        {
          id: '1',
          type: 'debit' as const,
          last4: '1956',
          brand: 'visa' as const,
          balance: 2450.50,
          actualBalance: 1950.50, // Available after pending transactions
          isActive: true,
          expiryDate: '12/26',
          nickname: 'Current Account',
          category: 'primary'
        },
        {
          id: '2',
          type: 'fx' as const,
          last4: '8274',
          brand: 'mastercard' as const,
          balance: 1200.00,
          isActive: true,
          expiryDate: '08/27',
          nickname: 'Global FX Card',
          category: 'fx'
        }
      ],
      envelopes: [
        {
          id: 'env1',
          name: 'Europe Trip',
          balance: 8500.00,
          target: 15000.00,
          category: 'travel' as const,
          color: '#4CAF50'
        },
        {
          id: 'env2',
          name: 'Emergency Fund',
          balance: 12000.00,
          target: 20000.00,
          category: 'emergency' as const,
          color: '#FF9800'
        },
        {
          id: 'env3',
          name: 'Business Capital',
          balance: 5500.00,
          target: 10000.00,
          category: 'business' as const,
          color: '#2196F3'
        }
      ],
      fxRates: [
        { currency: 'USD', rate: 18.45, trend: 'down' as const, symbol: '$' },
        { currency: 'EUR', rate: 20.15, trend: 'up' as const, symbol: '€' },
        { currency: 'GBP', rate: 23.28, trend: 'stable' as const, symbol: '£' },
        { currency: 'KES', rate: 0.12, trend: 'up' as const, symbol: 'KSh' }
      ]
    };
  },

  getConciergeCards: async (): Promise<ConciergeCard[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    return [
      {
        id: 'cc1',
        type: 'fx_alert',
        title: 'USD Rate Drop',
        description: 'USD dropped 2.3% - perfect time for your Nairobi trip conversion',
        action: 'Convert Now',
        priority: 'high',
        data: { currency: 'USD', amount: 500, savings: 23.45 }
      },
      {
        id: 'cc2',
        type: 'travel_perk',
        title: 'Lounge Access Available',
        description: 'Your OR Tambo Priority Pass expires in 30 days',
        action: 'Book Visit',
        priority: 'medium'
      },
      {
        id: 'cc3',
        type: 'business_opportunity',
        title: 'SME Workshop: Scaling Up',
        description: 'Join 50+ entrepreneurs this Thursday at Sandton',
        action: 'Register Free',
        priority: 'medium'
      }
    ];
  },

  getTransactions: async (cardId: string): Promise<Transaction[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const transactions = [
      {
        id: '1',
        amount: -89.50,
        description: 'Adobe Creative Suite',
        date: '2025-09-19',
        type: 'debit' as const,
        merchant: 'Adobe',
        cardId: '1',
        category: 'subscription',
        location: 'Online'
      },
      {
        id: '2',
        amount: -450.00,
        description: 'Co-working Space',
        date: '2025-09-18',
        type: 'debit' as const,
        merchant: 'WeWork Sandton',
        cardId: '1',
        category: 'workspace'
      },
      {
        id: '3',
        amount: 2500.00,
        description: 'Freelance Payment',
        date: '2025-09-15',
        type: 'credit' as const,
        merchant: 'Client Transfer',
        cardId: '1',
        category: 'income',
        location: 'Variable Income'
      },
      {
        id: '4',
        amount: -1200.00,
        description: 'Flight to Nairobi',
        date: '2025-09-14',
        type: 'debit' as const,
        merchant: 'Kenya Airways',
        cardId: '2',
        category: 'travel'
      }
    ];

    return transactions.filter(t => t.cardId === cardId);
  },

  convertFX: async (fromCurrency: string, toCurrency: string, amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      convertedAmount: amount * 18.45,
      fee: amount * 0.015,
      reference: `FX${Date.now()}`
    };
  },

  transferToEnvelope: async (envelopeId: string, amount: number) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, newBalance: Math.random() * 1000 + amount };
  }
};

export default function Wallet() {
  const [smartMoneyData, setSmartMoneyData] = useState<any>(null);
  const [conciergeCards, setConciergeCards] = useState<ConciergeCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'cards' | 'envelopes' | 'fx'>('overview');
  const [loading, setLoading] = useState(true);
  const [showFXConverter, setShowFXConverter] = useState(false);
  const [fxAmount, setFxAmount] = useState<string>('');
  const [selectedFXRate, setSelectedFXRate] = useState<FXRate | null>(null);

  useEffect(() => {
    loadSmartMoneyData();
    loadConciergeCards();
  }, []);

  useEffect(() => {
    if (selectedCard) {
      loadTransactions(selectedCard.id);
    }
  }, [selectedCard]);

  const loadSmartMoneyData = async () => {
    try {
      setLoading(true);
      const data = await lifeAPI.getSmartMoneyData();
      setSmartMoneyData(data);
      if (data.cards.length > 0) {
        setSelectedCard(data.cards[0]);
      }
    } catch (error) {
      console.error('Failed to load smart money data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConciergeCards = async () => {
    try {
      const cards = await lifeAPI.getConciergeCards();
      setConciergeCards(cards);
    } catch (error) {
      console.error('Failed to load concierge cards:', error);
    }
  };

  const loadTransactions = async (cardId: string) => {
    try {
      const transactionsData = await lifeAPI.getTransactions(cardId);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  };

  const handleFXConversion = async () => {
    if (!selectedFXRate || !fxAmount) return;

    try {
      const result = await lifeAPI.convertFX('ZAR', selectedFXRate.currency, parseFloat(fxAmount));
      if (result.success) {
        setShowFXConverter(false);
        setFxAmount('');
        // Refresh data
        loadSmartMoneyData();
      }
    } catch (error) {
      console.error('FX conversion failed:', error);
    }
  };

  const getConciergeCardIcon = (type: string) => {
    switch (type) {
      case 'fx_alert': return 'trending_down';
      case 'travel_perk': return 'flight';
      case 'business_opportunity': return 'business_center';
      case 'mentor_session': return 'school';
      default: return 'info';
    }
  };

  const getConciergeCardColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#C41E3A';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#666';
    }
  };

  if (loading) {
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
            width: '40px',
            height: '40px',
            border: '3px solid #333',
            borderTop: '3px solid #C41E3A',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p>Loading Smart Money Hub...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff' }}>
      {/* Header */}
      <header style={{
        padding: '20px',
        borderBottom: '1px solid #333'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
              marginBottom: '4px'
            }}>
              Smart Money Hub
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#999'
            }}>
              Your Life+ financial command center
            </p>
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img
              src={absaLogo}
              alt="ABSA Logo"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'cards', label: 'Cards' },
            { id: 'envelopes', label: 'Envelopes' },
            { id: 'fx', label: 'FX Rates' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: activeTab === tab.id ? '#C41E3A' : '#333',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ padding: '20px', paddingBottom: '100px' }}>
        {/* AI Concierge Cards */}
        {activeTab === 'overview' && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
                assistant
              </span>
              AI Concierge
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {conciergeCards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '16px',
                    borderLeft: `4px solid ${getConciergeCardColor(card.priority)}`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: getConciergeCardColor(card.priority),
                      borderRadius: '8px',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span className="material-icons-outlined" style={{
                        fontSize: '20px',
                        color: '#fff'
                      }}>
                        {getConciergeCardIcon(card.type)}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '4px'
                      }}>
                        {card.title}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#ccc',
                        margin: 0,
                        marginBottom: '12px'
                      }}>
                        {card.description}
                      </p>
                      <button style={{
                        background: getConciergeCardColor(card.priority),
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        {card.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Smart Balance Overview */}
        {activeTab === 'overview' && smartMoneyData && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Available vs Actual Balance
            </h3>
            <div style={{
              background: 'linear-gradient(135deg, #C41E3A 0%, #A91B47 100%)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    opacity: 0.8
                  }}>
                    Available Balance
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: '700'
                  }}>
                    R {smartMoneyData.cards[0].actualBalance?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    opacity: 0.8
                  }}>
                    Actual Balance
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    R {smartMoneyData.cards[0].balance?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px'
              }}>
                Pending: R {(smartMoneyData.cards[0].balance - smartMoneyData.cards[0].actualBalance).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        )}

        {/* Envelope Accounts */}
        {(activeTab === 'overview' || activeTab === 'envelopes') && smartMoneyData?.envelopes && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Money Envelopes
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {smartMoneyData.envelopes.map((envelope: EnvelopeAccount) => (
                <div
                  key={envelope.id}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '16px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: envelope.color
                      }} />
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {envelope.name}
                      </h4>
                    </div>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      margin: 0
                    }}>
                      R {envelope.balance.toLocaleString('en-ZA')}
                    </p>
                  </div>
                  <div style={{
                    background: '#333',
                    borderRadius: '8px',
                    height: '8px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: envelope.color,
                      height: '100%',
                      width: `${(envelope.balance / envelope.target) * 100}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: '8px 0 0 0'
                  }}>
                    {Math.round((envelope.balance / envelope.target) * 100)}% of R {envelope.target.toLocaleString('en-ZA')} goal
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FX Rates */}
        {(activeTab === 'overview' || activeTab === 'fx') && smartMoneyData?.fxRates && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: 0
              }}>
                Live FX Rates
              </h3>
              <button
                onClick={() => setShowFXConverter(true)}
                style={{
                  background: '#C41E3A',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Convert
              </button>
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {smartMoneyData.fxRates.map((rate: FXRate) => (
                <div
                  key={rate.currency}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{rate.symbol}</span>
                    <span style={{ fontWeight: '600' }}>{rate.currency}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>R {rate.rate.toFixed(2)}</span>
                    <span className="material-icons-outlined" style={{
                      fontSize: '16px',
                      color: rate.trend === 'up' ? '#4CAF50' : rate.trend === 'down' ? '#f44336' : '#999'
                    }}>
                      {rate.trend === 'up' ? 'trending_up' : rate.trend === 'down' ? 'trending_down' : 'trending_flat'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cards Section */}
        {activeTab === 'cards' && smartMoneyData?.cards && (
          <div>
            <div style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              marginBottom: '24px'
            }}>
              {smartMoneyData.cards.map((card: Card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  style={{
                    minWidth: '280px',
                    height: '180px',
                    background: card.type === 'fx'
                      ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                      : 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                    borderRadius: '16px',
                    padding: '20px',
                    cursor: 'pointer',
                    border: selectedCard?.id === card.id ? '2px solid #fff' : '2px solid transparent'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        opacity: 0.8,
                        marginBottom: '4px'
                      }}>
                        {card.nickname}
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        opacity: 0.6,
                        textTransform: 'uppercase'
                      }}>
                        {card.type === 'fx' ? 'Global FX' : card.type}
                      </p>
                    </div>
                    <span className="material-icons-outlined" style={{
                      fontSize: '28px',
                      opacity: 0.9
                    }}>
                      {card.type === 'fx' ? 'language' : 'credit_card'}
                    </span>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <p style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: '600',
                      letterSpacing: '2px'
                    }}>
                      •••• •••• •••• {card.last4}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}>
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: '700'
                      }}>
                        R {card.balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        opacity: 0.7
                      }}>
                        {card.expiryDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transactions */}
            {selectedCard && (
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Recent Transactions
                </h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      style={{
                        background: '#2a2a2a',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: transaction.type === 'credit' ? '#4CAF50' : '#333',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span className="material-icons-outlined" style={{
                            fontSize: '20px',
                            color: transaction.type === 'credit' ? '#fff' : '#999'
                          }}>
                            {transaction.category === 'travel' ? 'flight' :
                              transaction.category === 'subscription' ? 'subscriptions' :
                                transaction.category === 'workspace' ? 'business_center' :
                                  transaction.type === 'credit' ? 'arrow_downward' : 'arrow_upward'}
                          </span>
                        </div>
                        <div>
                          <p style={{
                            margin: 0,
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '2px'
                          }}>
                            {transaction.merchant}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '14px',
                            color: '#999'
                          }}>
                            {transaction.description}
                          </p>
                          <p style={{
                            margin: 0,
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '2px'
                          }}>
                            {new Date(transaction.date).toLocaleDateString('en-ZA')}
                            {transaction.location && ` • ${transaction.location}`}
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{
                          margin: 0,
                          fontSize: '16px',
                          fontWeight: '700',
                          color: transaction.type === 'credit' ? '#4CAF50' : '#fff'
                        }}>
                          {transaction.type === 'credit' ? '+' : ''}R {Math.abs(transaction.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                        </p>
                        <p style={{
                          margin: 0,
                          fontSize: '12px',
                          color: '#999',
                          textTransform: 'capitalize'
                        }}>
                          {transaction.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FX Converter Modal */}
      {showFXConverter && smartMoneyData?.fxRates && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#2a2a2a',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              FX Converter
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <p style={{
                fontSize: '14px',
                marginBottom: '8px',
                color: '#ccc'
              }}>
                Amount (ZAR)
              </p>
              <input
                type="number"
                value={fxAmount}
                onChange={(e) => setFxAmount(e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #444',
                  borderRadius: '8px',
                  background: '#333',
                  color: '#fff',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{
                fontSize: '14px',
                marginBottom: '8px',
                color: '#ccc'
              }}>
                Convert to
              </p>
              <div style={{ display: 'grid', gap: '8px' }}>
                {smartMoneyData.fxRates.map((rate: FXRate) => (
                  <button
                    key={rate.currency}
                    onClick={() => setSelectedFXRate(rate)}
                    style={{
                      padding: '12px',
                      border: `2px solid ${selectedFXRate?.currency === rate.currency ? '#C41E3A' : '#333'}`,
                      background: selectedFXRate?.currency === rate.currency ? 'rgba(196, 30, 58, 0.1)' : 'transparent',
                      borderRadius: '8px',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{rate.symbol} {rate.currency}</span>
                    <span>R {rate.rate.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedFXRate && fxAmount && (
              <div style={{
                background: '#333',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#ccc',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  You will receive
                </p>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: 0,
                  color: '#4CAF50'
                }}>
                  {selectedFXRate.symbol} {(parseFloat(fxAmount) / selectedFXRate.rate).toFixed(2)}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  margin: '8px 0 0 0'
                }}>
                  Fee: R {(parseFloat(fxAmount) * 0.015).toFixed(2)} (1.5%)
                </p>
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px'
            }}>
              <button
                onClick={() => setShowFXConverter(false)}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleFXConversion}
                disabled={!selectedFXRate || !fxAmount}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: (!selectedFXRate || !fxAmount) ? '#666' : '#C41E3A',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: (!selectedFXRate || !fxAmount) ? 'not-allowed' : 'pointer'
                }}
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}