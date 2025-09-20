// src/pages/Discover.tsx - Lifestyle Product Recommendations
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";

// Product and recommendation interfaces
interface Product {
  id: string;
  name: string;
  category: 'banking' | 'insurance' | 'investment' | 'lifestyle' | 'business';
  description: string;
  benefits: string[];
  pricing: {
    type: 'free' | 'monthly' | 'annual' | 'percentage';
    amount?: number;
    currency?: string;
    details: string;
  };
  eligibility: string[];
  personalizedReason: string;
  lifestyleMatch: number; // 0-100 match score
  priority: 'high' | 'medium' | 'low';
  provider: 'absa' | 'partner';
  image: string;
  tags: string[];
  estimatedValue: string;
}

interface LifestyleInsight {
  category: string;
  pattern: string;
  recommendation: string;
  confidence: number;
  icon: string;
}

interface UserProfile {
  age: number;
  income: 'variable' | 'fixed';
  lifestyle: string[];
  goals: string[];
  travelFrequency: 'frequent' | 'occasional' | 'rare';
  businessInterests: boolean;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  currentProducts: string[];
}

// Mock Discovery API
const discoverAPI = {
  getUserProfile: async (): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    return {
      age: 28,
      income: 'variable',
      lifestyle: ['digital_nomad', 'entrepreneur', 'tech_professional'],
      goals: ['travel', 'business_growth', 'financial_independence'],
      travelFrequency: 'frequent',
      businessInterests: true,
      riskTolerance: 'moderate',
      currentProducts: ['current_account', 'savings_account', 'fx_card']
    };
  },

  getPersonalizedRecommendations: async (profile: UserProfile): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    return [
      {
        id: 'global_nomad_account',
        name: 'Global Nomad Account',
        category: 'banking',
        description: 'Multi-currency account designed for digital nomads and frequent travelers',
        benefits: [
          'Zero FX fees on international transactions',
          'Global ATM access with fee rebates',
          'Multi-currency debit card',
          'Real-time currency conversion',
          'Travel insurance included'
        ],
        pricing: {
          type: 'monthly',
          amount: 149,
          currency: 'ZAR',
          details: 'R149/month, waived with R15,000+ monthly inflow'
        },
        eligibility: ['Minimum R10,000 monthly income', 'Valid passport', 'Age 18-65'],
        personalizedReason: 'Perfect for your Kenya Airways bookings and international freelance income',
        lifestyleMatch: 95,
        priority: 'high',
        provider: 'absa',
        image: 'travel_card',
        tags: ['travel', 'fx', 'digital_nomad'],
        estimatedValue: 'Save R2,400/year on FX fees'
      },
      {
        id: 'business_growth_loan',
        name: 'SME Growth Accelerator',
        category: 'business',
        description: 'Flexible business loan for entrepreneurs and small business owners',
        benefits: [
          'R50,000 - R500,000 funding',
          'Variable repayment terms',
          'Business mentorship included',
          'Networking event access',
          'Financial planning support'
        ],
        pricing: {
          type: 'percentage',
          amount: 12.5,
          details: 'From 12.5% p.a., based on business performance'
        },
        eligibility: ['6 months banking history', 'Business registration', 'R25,000+ monthly turnover'],
        personalizedReason: 'Your WeWork expenses and business goal envelope suggest active entrepreneurship',
        lifestyleMatch: 88,
        priority: 'high',
        provider: 'absa',
        image: 'business_growth',
        tags: ['business', 'loan', 'sme', 'mentorship'],
        estimatedValue: 'Access R100,000+ growth capital'
      },
      {
        id: 'tech_professional_insurance',
        name: 'Digital Professional Cover',
        category: 'insurance',
        description: 'Comprehensive insurance for tech professionals and freelancers',
        benefits: [
          'Equipment protection (laptops, phones)',
          'Professional indemnity cover',
          'Cyber liability protection',
          'Income protection for freelancers',
          'Global travel cover'
        ],
        pricing: {
          type: 'monthly',
          amount: 299,
          currency: 'ZAR',
          details: 'R299/month for R500,000 equipment cover'
        },
        eligibility: ['Professional IT work', 'Equipment value R20,000+', 'Age 21-60'],
        personalizedReason: 'Your Adobe subscriptions and tech spending patterns indicate valuable equipment',
        lifestyleMatch: 82,
        priority: 'medium',
        provider: 'partner',
        image: 'device_protection',
        tags: ['insurance', 'tech', 'freelance', 'equipment'],
        estimatedValue: 'Protect R500,000+ assets'
      },
      {
        id: 'investment_robo_advisor',
        name: 'AI Wealth Builder',
        category: 'investment',
        description: 'Automated investment platform with AI-driven portfolio management',
        benefits: [
          'AI-optimized portfolios',
          'Automatic rebalancing',
          'Tax-efficient investing',
          'Low fees (0.5% annually)',
          'Life+ integration for goal tracking'
        ],
        pricing: {
          type: 'percentage',
          amount: 0.5,
          details: '0.5% annual management fee, minimum R1,000 investment'
        },
        eligibility: ['Minimum R1,000 investment', 'Risk assessment completed', 'Age 18+'],
        personalizedReason: 'Your Europe trip savings show disciplined goal-based saving habits',
        lifestyleMatch: 76,
        priority: 'medium',
        provider: 'absa',
        image: 'ai_investing',
        tags: ['investment', 'ai', 'automated', 'goals'],
        estimatedValue: 'Potential 8-12% annual returns'
      },
      {
        id: 'lifestyle_rewards_credit',
        name: 'Life+ Rewards Credit Card',
        category: 'lifestyle',
        description: 'Premium credit card with lifestyle-focused rewards and perks',
        benefits: [
          '3x points on travel and subscriptions',
          'Airport lounge access',
          'Co-working space credits',
          'Event and conference discounts',
          'Concierge service access'
        ],
        pricing: {
          type: 'annual',
          amount: 1200,
          currency: 'ZAR',
          details: 'R1,200 annual fee, waived with R50,000+ annual spend'
        },
        eligibility: ['Minimum R15,000 monthly income', 'Good credit score', 'Existing Absa relationship'],
        personalizedReason: 'Your professional spending on Adobe and WeWork would earn significant rewards',
        lifestyleMatch: 91,
        priority: 'high',
        provider: 'absa',
        image: 'lifestyle_card',
        tags: ['credit', 'rewards', 'lifestyle', 'travel'],
        estimatedValue: 'Earn R3,000+ annual rewards'
      },
      {
        id: 'emergency_fund_builder',
        name: 'Smart Emergency Fund',
        category: 'banking',
        description: 'High-yield savings account with automated emergency fund building',
        benefits: [
          '6.5% annual interest',
          'Automatic weekly transfers',
          'Goal-based savings tracking',
          'Emergency-only access controls',
          'Life+ app integration'
        ],
        pricing: {
          type: 'free',
          details: 'No fees, minimum R1,000 opening balance'
        },
        eligibility: ['Existing Absa account', 'Minimum R1,000 deposit', 'Age 18+'],
        personalizedReason: 'Your variable freelance income would benefit from automated emergency planning',
        lifestyleMatch: 79,
        priority: 'medium',
        provider: 'absa',
        image: 'emergency_fund',
        tags: ['savings', 'emergency', 'automated', 'high_yield'],
        estimatedValue: 'Build 6 months expenses safety net'
      }
    ];
  },

  getLifestyleInsights: async (profile: UserProfile): Promise<LifestyleInsight[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    return [
      {
        category: 'Travel Optimization',
        pattern: 'Frequent international transactions detected',
        recommendation: 'Consider multi-currency solutions to save 2-3% on FX fees',
        confidence: 94,
        icon: 'flight'
      },
      {
        category: 'Professional Growth',
        pattern: 'Consistent spending on business tools and workspace',
        recommendation: 'Business credit card could provide tax benefits and rewards',
        confidence: 88,
        icon: 'trending_up'
      },
      {
        category: 'Risk Management',
        pattern: 'Variable income with high-value equipment purchases',
        recommendation: 'Insurance protection increasingly important as assets grow',
        confidence: 82,
        icon: 'security'
      },
      {
        category: 'Wealth Building',
        pattern: 'Strong savings discipline with specific financial goals',
        recommendation: 'Automated investing could accelerate wealth building',
        confidence: 76,
        icon: 'account_balance'
      }
    ];
  },

  trackProductInteraction: async (productId: string, action: 'view' | 'save' | 'apply') => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, tracked: true };
  }
};

export default function Discover() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [lifestyleInsights, setLifestyleInsights] = useState<LifestyleInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedProducts, setSavedProducts] = useState<Set<string>>(new Set());
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  useEffect(() => {
    loadDiscoveryData();
  }, []);

  const loadDiscoveryData = async () => {
    try {
      setLoading(true);
      const profile = await discoverAPI.getUserProfile();
      const [products, insights] = await Promise.all([
        discoverAPI.getPersonalizedRecommendations(profile),
        discoverAPI.getLifestyleInsights(profile)
      ]);

      setUserProfile(profile);
      setRecommendations(products);
      setLifestyleInsights(insights);
    } catch (error) {
      console.error('Failed to load discovery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSave = async (productId: string) => {
    try {
      await discoverAPI.trackProductInteraction(productId, 'save');
      setSavedProducts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(productId)) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  const filteredProducts = recommendations.filter(product =>
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const categories = [
    { id: 'all', label: 'All', count: recommendations.length },
    { id: 'banking', label: 'Banking', count: recommendations.filter(p => p.category === 'banking').length },
    { id: 'lifestyle', label: 'Lifestyle', count: recommendations.filter(p => p.category === 'lifestyle').length },
    { id: 'business', label: 'Business', count: recommendations.filter(p => p.category === 'business').length },
    { id: 'investment', label: 'Investing', count: recommendations.filter(p => p.category === 'investment').length },
    { id: 'insurance', label: 'Insurance', count: recommendations.filter(p => p.category === 'insurance').length }
  ];

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'banking': return 'account_balance';
      case 'lifestyle': return 'style';
      case 'business': return 'business_center';
      case 'investment': return 'trending_up';
      case 'insurance': return 'security';
      default: return 'inventory';
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return '#4CAF50';
    if (match >= 80) return '#8BC34A';
    if (match >= 70) return '#FFC107';
    return '#FF9800';
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
          <p>Discovering your perfect products...</p>
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
              Discover
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#999'
            }}>
              Products tailored to your lifestyle
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
              src="/absa-logo-red-bg.svg"
              alt="ABSA Logo"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: selectedCategory === category.id ? '#C41E3A' : '#333',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {category.label}
              {category.count > 0 && (
                <span style={{
                  background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#555',
                  borderRadius: '10px',
                  padding: '2px 6px',
                  fontSize: '12px'
                }}>
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main style={{ padding: '20px', paddingBottom: '100px' }}>
        {/* Lifestyle Insights */}
        {selectedCategory === 'all' && (
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
                insights
              </span>
              Your Lifestyle Insights
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {lifestyleInsights.map((insight, index) => (
                <div
                  key={index}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '16px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    <div style={{
                      background: '#C41E3A',
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
                        {insight.icon}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          {insight.category}
                        </h4>
                        <span style={{
                          fontSize: '12px',
                          color: '#4CAF50',
                          fontWeight: '600'
                        }}>
                          {insight.confidence}% confidence
                        </span>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: '#ccc',
                        margin: '0 0 8px 0'
                      }}>
                        {insight.pattern}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#fff',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Recommendations */}
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '16px'
          }}>
            {selectedCategory === 'all' ? 'Recommended for You' : `${categories.find(c => c.id === selectedCategory)?.label} Products`}
          </h3>

          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#2a2a2a',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: product.priority === 'high' ? '2px solid #C41E3A' : '1px solid #444'
                }}
              >
                {/* Product Header */}
                <div style={{
                  padding: '20px',
                  borderBottom: expandedProduct === product.id ? '1px solid #444' : 'none'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        background: '#C41E3A',
                        borderRadius: '12px',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span className="material-icons-outlined" style={{
                          fontSize: '24px',
                          color: '#fff'
                        }}>
                          {getProductIcon(product.category)}
                        </span>
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          margin: 0,
                          marginBottom: '4px'
                        }}>
                          {product.name}
                        </h4>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontSize: '12px',
                            color: '#999',
                            textTransform: 'capitalize'
                          }}>
                            {product.category}
                          </span>
                          <div style={{
                            background: getMatchColor(product.lifestyleMatch),
                            borderRadius: '12px',
                            padding: '2px 8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#000'
                          }}>
                            {product.lifestyleMatch}% match
                          </div>
                          {product.provider === 'partner' && (
                            <span style={{
                              fontSize: '12px',
                              color: '#FF9800',
                              fontWeight: '500'
                            }}>
                              Partner
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleProductSave(product.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <span className="material-icons-outlined" style={{
                        fontSize: '24px',
                        color: savedProducts.has(product.id) ? '#C41E3A' : '#666'
                      }}>
                        {savedProducts.has(product.id) ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#ccc',
                    margin: '0 0 12px 0',
                    lineHeight: 1.5
                  }}>
                    {product.description}
                  </p>

                  <div style={{
                    background: '#333',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '16px'
                  }}>
                    <p style={{
                      fontSize: '14px',
                      color: '#4CAF50',
                      margin: 0,
                      fontWeight: '600'
                    }}>
                      Why this fits you: {product.personalizedReason}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <p style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        margin: 0,
                        color: '#fff'
                      }}>
                        {product.pricing.type === 'free' ? 'Free' :
                          product.pricing.type === 'percentage' ? `${product.pricing.amount}% p.a.` :
                            `R${product.pricing.amount}/${product.pricing.type}`}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#999',
                        margin: '2px 0 0 0'
                      }}>
                        {product.pricing.details}
                      </p>
                    </div>
                    <div style={{
                      textAlign: 'right'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: 0,
                        color: '#4CAF50'
                      }}>
                        {product.estimatedValue}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#999',
                        margin: '2px 0 0 0'
                      }}>
                        Potential value
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '12px'
                  }}>
                    <button
                      onClick={() => setExpandedProduct(
                        expandedProduct === product.id ? null : product.id
                      )}
                      style={{
                        flex: 1,
                        background: '#333',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#fff',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {expandedProduct === product.id ? 'Hide Details' : 'View Details'}
                    </button>
                    <button
                      style={{
                        flex: 1,
                        background: '#C41E3A',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#fff',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProduct === product.id && (
                  <div style={{
                    padding: '20px',
                    background: '#222'
                  }}>
                    <div style={{
                      display: 'grid',
                      gap: '16px'
                    }}>
                      <div>
                        <h5 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '0 0 8px 0'
                        }}>
                          Benefits
                        </h5>
                        <ul style={{
                          margin: 0,
                          paddingLeft: '20px'
                        }}>
                          {product.benefits.map((benefit, index) => (
                            <li key={index} style={{
                              fontSize: '14px',
                              color: '#ccc',
                              marginBottom: '4px'
                            }}>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '0 0 8px 0'
                        }}>
                          Eligibility Requirements
                        </h5>
                        <ul style={{
                          margin: 0,
                          paddingLeft: '20px'
                        }}>
                          {product.eligibility.map((requirement, index) => (
                            <li key={index} style={{
                              fontSize: '14px',
                              color: '#ccc',
                              marginBottom: '4px'
                            }}>
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          margin: '0 0 8px 0'
                        }}>
                          Tags
                        </h5>
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap'
                        }}>
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              style={{
                                background: '#444',
                                borderRadius: '12px',
                                padding: '4px 12px',
                                fontSize: '12px',
                                color: '#ccc'
                              }}
                            >
                              {tag.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}