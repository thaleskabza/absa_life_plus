// src/pages/Rewards.tsx - Curated Lifestyle & Partner Benefits
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";

// Rewards and benefits interfaces
interface Reward {
  id: string;
  title: string;
  description: string;
  category: 'travel' | 'workspace' | 'tech' | 'lifestyle' | 'professional' | 'dining' | 'wellness';
  partner: string;
  partnerLogo?: string;
  type: 'discount' | 'cashback' | 'free_access' | 'upgrade' | 'exclusive';
  value: string;
  cost: number; // Points required
  originalPrice?: string;
  eligibility: string[];
  validUntil: string;
  location?: string;
  termsUrl?: string;
  featured: boolean;
  personalizedReason?: string;
  usageCount: number;
  maxRedemptions?: number;
  tags: string[];
}

interface UserRewardsProfile {
  lifePlusPoints: number;
  tierLevel: 'Explorer' | 'Professional' | 'Executive';
  monthlySpend: number;
  spendingCategories: Record<string, number>;
  rewardsEarned: number;
  rewardsRedeemed: number;
  preferredCategories: string[];
  location: string;
  travelFrequency: 'frequent' | 'occasional' | 'rare';
}

interface RedemptionHistory {
  id: string;
  rewardId: string;
  rewardTitle: string;
  partner: string;
  pointsUsed: number;
  redeemedAt: string;
  status: 'active' | 'used' | 'expired';
  confirmationCode?: string;
}

interface PartnerBusiness {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  totalRewards: number;
  popularReward: string;
  partnerSince: string;
}

// Realistic South African rewards based on actual market
const REWARDS_CATALOG: Reward[] = [
  {
    id: 'r1',
    title: 'OR Tambo Airport Lounge Access',
    description: 'Complimentary access to Bidvest Premier Lounge with refreshments and WiFi',
    category: 'travel',
    partner: 'Bidvest Lounges',
    type: 'free_access',
    value: '2 hours access',
    cost: 1500,
    originalPrice: 'R450',
    eligibility: ['Life+ Professional tier', 'Valid boarding pass required'],
    validUntil: '2025-12-31',
    location: 'OR Tambo International Airport',
    featured: true,
    personalizedReason: 'Based on your Kenya Airways booking pattern',
    usageCount: 234,
    maxRedemptions: 4,
    tags: ['travel', 'airport', 'premium']
  },
  {
    id: 'r2',
    title: 'WeWork Day Pass - Sandton',
    description: 'Full day access to WeWork Sandton with high-speed WiFi, coffee, and networking opportunities',
    category: 'workspace',
    partner: 'WeWork',
    type: 'free_access',
    value: '1 day pass',
    cost: 800,
    originalPrice: 'R350',
    eligibility: ['Active Life+ member', 'Professional verification'],
    validUntil: '2025-11-30',
    location: 'Sandton, Johannesburg',
    featured: true,
    personalizedReason: 'Matches your regular co-working spending',
    usageCount: 156,
    maxRedemptions: 8,
    tags: ['workspace', 'networking', 'productivity']
  },
  {
    id: 'r3',
    title: 'Adobe Creative Cloud - 3 Months',
    description: 'Three months of Adobe Creative Cloud All Apps subscription',
    category: 'tech',
    partner: 'Adobe',
    type: 'free_access',
    value: '3 months subscription',
    cost: 2200,
    originalPrice: 'R2,697',
    eligibility: ['Life+ member', 'Business or creative professional'],
    validUntil: '2025-12-15',
    featured: true,
    personalizedReason: 'You currently subscribe to Adobe services',
    usageCount: 89,
    maxRedemptions: 1,
    tags: ['software', 'creative', 'professional']
  },
  {
    id: 'r4',
    title: 'Uber Eats: 30% Off (Up to R100)',
    description: 'Enjoy 30% discount on your next Uber Eats order, maximum saving of R100',
    category: 'lifestyle',
    partner: 'Uber Eats',
    type: 'discount',
    value: '30% off',
    cost: 400,
    originalPrice: 'R100 value',
    eligibility: ['All Life+ members'],
    validUntil: '2025-10-31',
    location: 'Available in major cities',
    featured: false,
    usageCount: 1247,
    maxRedemptions: 3,
    tags: ['food', 'delivery', 'convenience']
  },
  {
    id: 'r5',
    title: 'Standard Bank Incubator Workshop',
    description: 'Free access to exclusive startup workshop series focusing on fintech and innovation',
    category: 'professional',
    partner: 'Standard Bank Incubator',
    type: 'free_access',
    value: 'Full workshop series',
    cost: 1200,
    originalPrice: 'R2,500',
    eligibility: ['Business account holder', 'Entrepreneur/startup founder'],
    validUntil: '2025-09-30',
    location: 'Rosebank, Johannesburg',
    featured: true,
    personalizedReason: 'Your business spending suggests active entrepreneurship',
    usageCount: 45,
    maxRedemptions: 1,
    tags: ['education', 'business', 'networking', 'fintech']
  },
  {
    id: 'r6',
    title: 'Takealot VIP Shipping - 6 Months',
    description: 'Free VIP shipping on all Takealot orders for 6 months',
    category: 'lifestyle',
    partner: 'Takealot',
    type: 'upgrade',
    value: '6 months VIP',
    cost: 600,
    originalPrice: 'R599',
    eligibility: ['Life+ member'],
    validUntil: '2025-12-31',
    featured: false,
    usageCount: 678,
    maxRedemptions: 1,
    tags: ['shipping', 'ecommerce', 'convenience']
  },
  {
    id: 'r7',
    title: 'Virgin Active Day Pass',
    description: 'Full day access to any Virgin Active gym including group classes and facilities',
    category: 'wellness',
    partner: 'Virgin Active',
    type: 'free_access',
    value: '1 day pass',
    cost: 350,
    originalPrice: 'R150',
    eligibility: ['Life+ member', 'Must be 18+'],
    validUntil: '2025-11-30',
    location: 'Nationwide',
    featured: false,
    usageCount: 423,
    maxRedemptions: 4,
    tags: ['fitness', 'wellness', 'health']
  },
  {
    id: 'r8',
    title: 'Rockets Conference Ticket',
    description: 'Complimentary ticket to South Africa\'s premier startup and tech conference',
    category: 'professional',
    partner: 'Rockets',
    type: 'free_access',
    value: 'Full conference access',
    cost: 2800,
    originalPrice: 'R3,500',
    eligibility: ['Life+ Professional/Executive tier', 'Tech/business professional'],
    validUntil: '2025-10-15',
    location: 'Cape Town International Convention Centre',
    featured: true,
    personalizedReason: 'Perfect for your tech industry networking',
    usageCount: 67,
    maxRedemptions: 1,
    tags: ['conference', 'tech', 'networking', 'startup']
  },
  {
    id: 'r9',
    title: 'Woolworths FreshStop Fuel Points',
    description: 'Earn double points on all fuel purchases at Woolworths FreshStop stations',
    category: 'lifestyle',
    partner: 'Woolworths',
    type: 'cashback',
    value: 'Double points',
    cost: 200,
    eligibility: ['MySchool MyVillage MyPlanet card required'],
    validUntil: '2025-12-31',
    featured: false,
    usageCount: 891,
    tags: ['fuel', 'points', 'everyday']
  },
  {
    id: 'r10',
    title: 'Kauai Loyalty Card Upgrade',
    description: 'Instant Gold status on Kauai loyalty program with 15% discount on all orders',
    category: 'dining',
    partner: 'Kauai',
    type: 'upgrade',
    value: 'Gold status + 15% off',
    cost: 500,
    originalPrice: 'Typically earned after R2,000 spend',
    eligibility: ['Life+ member'],
    validUntil: '2025-12-31',
    featured: false,
    usageCount: 234,
    maxRedemptions: 1,
    tags: ['dining', 'health', 'loyalty']
  }
];

// Mock Rewards API
const rewardsAPI = {
  getUserRewardsProfile: async (): Promise<UserRewardsProfile> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      lifePlusPoints: 3240,
      tierLevel: 'Professional',
      monthlySpend: 15420,
      spendingCategories: {
        professional_services: 1200,
        travel: 2300,
        technology: 890,
        dining: 650,
        fuel: 1100
      },
      rewardsEarned: 8560,
      rewardsRedeemed: 5320,
      preferredCategories: ['travel', 'workspace', 'tech', 'professional'],
      location: 'Johannesburg',
      travelFrequency: 'frequent'
    };
  },

  getPersonalizedRewards: async (profile: UserRewardsProfile): Promise<Reward[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Personalize based on user profile
    const personalizedRewards = REWARDS_CATALOG.map(reward => {
      let personalizedReason = '';
      
      if (reward.category === 'travel' && profile.travelFrequency === 'frequent') {
        personalizedReason = 'Perfect for your frequent travel pattern';
      } else if (reward.category === 'workspace' && profile.spendingCategories.professional_services > 1000) {
        personalizedReason = 'Matches your co-working spending habits';
      } else if (reward.category === 'tech' && profile.spendingCategories.technology > 500) {
        personalizedReason = 'Aligns with your tech subscription usage';
      } else if (reward.category === 'professional' && profile.tierLevel !== 'Explorer') {
        personalizedReason = 'Recommended for your professional tier';
      }
      
      return {
        ...reward,
        personalizedReason: personalizedReason || reward.personalizedReason
      };
    });
    
    // Sort by relevance and user preferences
    return personalizedRewards.sort((a, b) => {
      const aRelevant = profile.preferredCategories.includes(a.category) ? 1 : 0;
      const bRelevant = profile.preferredCategories.includes(b.category) ? 1 : 0;
      
      if (aRelevant !== bRelevant) return bRelevant - aRelevant;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.cost - b.cost;
    });
  },

  getRedemptionHistory: async (): Promise<RedemptionHistory[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: 'rd1',
        rewardId: 'r2',
        rewardTitle: 'WeWork Day Pass - Sandton',
        partner: 'WeWork',
        pointsUsed: 800,
        redeemedAt: '2025-09-15T10:30:00Z',
        status: 'used',
        confirmationCode: 'WW2509ABC123'
      },
      {
        id: 'rd2',
        rewardId: 'r4',
        rewardTitle: 'Uber Eats: 30% Off',
        partner: 'Uber Eats',
        pointsUsed: 400,
        redeemedAt: '2025-09-18T19:45:00Z',
        status: 'active',
        confirmationCode: 'UE250918XYZ'
      }
    ];
  },

  redeemReward: async (rewardId: string, pointsCost: number) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      confirmationCode: `ABL${Date.now().toString(36).toUpperCase()}`,
      redemptionId: `rd_${Date.now()}`,
      instructions: 'Check your email for redemption instructions and voucher details.'
    };
  },

  getPartnerBusinesses: async (): Promise<PartnerBusiness[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'p1',
        name: 'WeWork',
        category: 'Co-working',
        description: 'Flexible workspace solutions for professionals and teams',
        totalRewards: 4,
        popularReward: 'Day Pass Access',
        partnerSince: '2024'
      },
      {
        id: 'p2',
        name: 'Adobe',
        category: 'Software',
        description: 'Creative and productivity software for professionals',
        totalRewards: 2,
        popularReward: 'Creative Cloud Subscription',
        partnerSince: '2024'
      },
      {
        id: 'p3',
        name: 'Bidvest Lounges',
        category: 'Travel',
        description: 'Premium airport lounge experiences',
        totalRewards: 3,
        popularReward: 'Airport Lounge Access',
        partnerSince: '2023'
      },
      {
        id: 'p4',
        name: 'Standard Bank Incubator',
        category: 'Education',
        description: 'Startup incubation and business development programs',
        totalRewards: 2,
        popularReward: 'Workshop Series',
        partnerSince: '2024'
      }
    ];
  }
};

export default function Rewards() {
  const [userProfile, setUserProfile] = useState<UserRewardsProfile | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redemptionHistory, setRedemptionHistory] = useState<RedemptionHistory[]>([]);
  const [partnerBusinesses, setPartnerBusinesses] = useState<PartnerBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'explore' | 'history' | 'partners'>('explore');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redemptionSuccess, setRedemptionSuccess] = useState<any>(null);

  useEffect(() => {
    loadRewardsData();
  }, []);

  const loadRewardsData = async () => {
    try {
      setLoading(true);
      const profile = await rewardsAPI.getUserRewardsProfile();
      const [rewardsList, history, partners] = await Promise.all([
        rewardsAPI.getPersonalizedRewards(profile),
        rewardsAPI.getRedemptionHistory(),
        rewardsAPI.getPartnerBusinesses()
      ]);
      
      setUserProfile(profile);
      setRewards(rewardsList);
      setRedemptionHistory(history);
      setPartnerBusinesses(partners);
    } catch (error) {
      console.error('Failed to load rewards data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRewardRedemption = async () => {
    if (!selectedReward || !userProfile) return;
    
    if (userProfile.lifePlusPoints < selectedReward.cost) {
      alert('Insufficient Life+ points for this reward.');
      return;
    }
    
    try {
      setRedeeming(true);
      const result = await rewardsAPI.redeemReward(selectedReward.id, selectedReward.cost);
      
      if (result.success) {
        setRedemptionSuccess(result);
        setUserProfile(prev => prev ? {
          ...prev,
          lifePlusPoints: prev.lifePlusPoints - selectedReward.cost,
          rewardsRedeemed: prev.rewardsRedeemed + selectedReward.cost
        } : null);
        setSelectedReward(null);
      }
    } catch (error) {
      console.error('Redemption failed:', error);
    } finally {
      setRedeeming(false);
    }
  };

  const filteredRewards = rewards.filter(reward => 
    selectedCategory === 'all' || reward.category === selectedCategory
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Executive': return '#C41E3A';
      case 'Professional': return '#FF9800';
      case 'Explorer': return '#4CAF50';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'travel': return 'flight';
      case 'workspace': return 'business_center';
      case 'tech': return 'computer';
      case 'lifestyle': return 'style';
      case 'professional': return 'school';
      case 'dining': return 'restaurant';
      case 'wellness': return 'fitness_center';
      default: return 'card_giftcard';
    }
  };

  const categories = [
    { id: 'all', label: 'All Rewards', icon: 'card_giftcard' },
    { id: 'travel', label: 'Travel', icon: 'flight' },
    { id: 'workspace', label: 'Workspace', icon: 'business_center' },
    { id: 'tech', label: 'Technology', icon: 'computer' },
    { id: 'professional', label: 'Professional', icon: 'school' },
    { id: 'lifestyle', label: 'Lifestyle', icon: 'style' },
    { id: 'dining', label: 'Dining', icon: 'restaurant' },
    { id: 'wellness', label: 'Wellness', icon: 'fitness_center' }
  ];

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
          <p>Loading your rewards...</p>
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
              Life+ Rewards
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#999'
            }}>
              Curated lifestyle perks and exclusive benefits
            </p>
          </div>
          <div style={{
            background: '#C41E3A',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span className="material-icons-outlined" style={{ color: '#fff', fontSize: '20px' }}>
              star
            </span>
          </div>
        </div>

        {/* Points Balance */}
        {userProfile && (
          <div style={{
            background: 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  {userProfile.lifePlusPoints.toLocaleString()}
                </p>
                <p style={{
                  fontSize: '14px',
                  margin: 0,
                  opacity: 0.9
                }}>
                  Life+ Points Available
                </p>
              </div>
              <div style={{
                background: getTierColor(userProfile.tierLevel),
                borderRadius: '20px',
                padding: '8px 16px'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#fff'
                }}>
                  {userProfile.tierLevel} Tier
                </span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              opacity: 0.8
            }}>
              <span>Earned: {userProfile.rewardsEarned.toLocaleString()}</span>
              <span>Redeemed: {userProfile.rewardsRedeemed.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {[
            { id: 'explore', label: 'Explore', icon: 'explore' },
            { id: 'history', label: 'History', icon: 'history' },
            { id: 'partners', label: 'Partners', icon: 'business' }
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span className="material-icons-outlined" style={{ fontSize: '16px' }}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main style={{ padding: '20px', paddingBottom: '100px' }}>
        {/* Explore Tab */}
        {activeTab === 'explore' && (
          <div>
            {/* Category Filters */}
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              marginBottom: '24px'
            }}>
              {categories.slice(0, 5).map((category) => (
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
                  <span className="material-icons-outlined" style={{ fontSize: '16px' }}>
                    {category.icon}
                  </span>
                  {category.label}
                </button>
              ))}
            </div>

            {/* Featured Rewards */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Featured for You
              </h3>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                overflowX: 'auto',
                paddingBottom: '8px'
              }}>
                {filteredRewards.filter(r => r.featured).map((reward) => (
                  <div
                    key={reward.id}
                    style={{
                      minWidth: '300px',
                      background: '#2a2a2a',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '2px solid #C41E3A'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        background: '#C41E3A',
                        borderRadius: '8px',
                        padding: '8px',
                        marginRight: '12px'
                      }}>
                        <span className="material-icons-outlined" style={{
                          fontSize: '20px',
                          color: '#fff'
                        }}>
                          {getCategoryIcon(reward.category)}
                        </span>
                      </div>
                      <div style={{
                        background: '#4CAF50',
                        borderRadius: '12px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#fff'
                      }}>
                        FEATURED
                      </div>
                    </div>

                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      margin: '0 0 8px 0'
                    }}>
                      {reward.title}
                    </h4>
                    
                    <p style={{
                      fontSize: '14px',
                      color: '#ccc',
                      margin: '0 0 12px 0',
                      lineHeight: 1.4
                    }}>
                      {reward.description}
                    </p>

                    {reward.personalizedReason && (
                      <div style={{
                        background: '#333',
                        borderRadius: '8px',
                        padding: '8px',
                        marginBottom: '12px'
                      }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#4CAF50',
                          margin: 0,
                          fontWeight: '500'
                        }}>
                          Why this fits: {reward.personalizedReason}
                        </p>
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <p style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          margin: 0,
                          color: '#fff'
                        }}>
                          {reward.cost.toLocaleString()} points
                        </p>
                        {reward.originalPrice && (
                          <p style={{
                            fontSize: '12px',
                            color: '#666',
                            margin: 0
                          }}>
                            Value: {reward.originalPrice}
                          </p>
                        )}
                      </div>
                      <div style={{
                        textAlign: 'right'
                      }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#999',
                          margin: 0
                        }}>
                          {reward.partner}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: '#666',
                          margin: 0
                        }}>
                          Used {reward.usageCount} times
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedReward(reward)}
                      disabled={userProfile ? userProfile.lifePlusPoints < reward.cost : true}
                      style={{
                        width: '100%',
                        background: userProfile && userProfile.lifePlusPoints >= reward.cost ? '#C41E3A' : '#666',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: userProfile && userProfile.lifePlusPoints >= reward.cost ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {userProfile && userProfile.lifePlusPoints >= reward.cost ? 'Redeem Now' : 'Insufficient Points'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* All Rewards */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                All Rewards
              </h3>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {filteredRewards.filter(r => !r.featured).map((reward) => (
                  <div
                    key={reward.id}
                    style={{
                      background: '#2a2a2a',
                      borderRadius: '16px',
                      padding: '20px',
                      border: '1px solid #444'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px'
                    }}>
                      <div style={{
                        background: '#333',
                        borderRadius: '8px',
                        padding: '12px',
                        flexShrink: 0
                      }}>
                        <span className="material-icons-outlined" style={{
                          fontSize: '24px',
                          color: '#ccc'
                        }}>
                          {getCategoryIcon(reward.category)}
                        </span>
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '8px'
                        }}>
                          <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            margin: 0
                          }}>
                            {reward.title}
                          </h4>
                          <div style={{
                            textAlign: 'right'
                          }}>
                            <p style={{
                              fontSize: '16px',
                              fontWeight: '700',
                              margin: 0,
                              color: '#fff'
                            }}>
                              {reward.cost.toLocaleString()}
                            </p>
                            <p style={{
                              fontSize: '12px',
                              color: '#666',
                              margin: 0
                            }}>
                              points
                            </p>
                          </div>
                        </div>

                        <p style={{
                          fontSize: '14px',
                          color: '#ccc',
                          margin: '0 0 8px 0',
                          lineHeight: 1.4
                        }}>
                          {reward.description}
                        </p>

                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px'
                        }}>
                          <span style={{
                            background: '#444',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            color: '#ccc'
                          }}>
                            {reward.partner}
                          </span>
                          {reward.location && (
                            <span style={{
                              fontSize: '12px',
                              color: '#666'
                            }}>
                              {reward.location}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedReward(reward)}
                          disabled={userProfile ? userProfile.lifePlusPoints < reward.cost : true}
                          style={{
                            background: userProfile && userProfile.lifePlusPoints >= reward.cost ? '#C41E3A' : '#666',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: userProfile && userProfile.lifePlusPoints >= reward.cost ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Redemption History
            </h3>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {redemptionHistory.map((redemption) => (
                <div
                  key={redemption.id}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '12px',
                    padding: '16px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <div>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '4px'
                      }}>
                        {redemption.rewardTitle}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#ccc',
                        margin: 0
                      }}>
                        {redemption.partner}
                      </p>
                    </div>
                    <div style={{
                      background: redemption.status === 'active' ? '#4CAF50' : 
                                redemption.status === 'used' ? '#666' : '#f44336',
                      borderRadius: '12px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#fff',
                      textTransform: 'uppercase'
                    }}>
                      {redemption.status}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    <span>{redemption.pointsUsed.toLocaleString()} points used</span>
                    <span>{new Date(redemption.redeemedAt).toLocaleDateString('en-ZA')}</span>
                  </div>
                  
                  {redemption.confirmationCode && (
                    <div style={{
                      marginTop: '8px',
                      padding: '8px',
                      background: '#333',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      Confirmation: {redemption.confirmationCode}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Our Partners
            </h3>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              {partnerBusinesses.map((partner) => (
                <div
                  key={partner.id}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '16px',
                    padding: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '8px',
                      background: '#C41E3A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#fff'
                      }}>
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '4px'
                      }}>
                        {partner.name}
                      </h4>
                      <p style={{
                        fontSize: '14px',
                        color: '#999',
                        margin: 0
                      }}>
                        {partner.category} • Partner since {partner.partnerSince}
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#ccc',
                    margin: '0 0 12px 0',
                    lineHeight: 1.4
                  }}>
                    {partner.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    <span>{partner.totalRewards} rewards available</span>
                    <span>Popular: {partner.popularReward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Redemption Modal */}
      {selectedReward && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
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
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: 0
              }}>
                Redeem Reward
              </h3>
              <button
                onClick={() => setSelectedReward(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer'
                }}
              >
                <span className="material-icons-outlined" style={{ fontSize: '24px' }}>
                  close
                </span>
              </button>
            </div>

            <div style={{
              background: '#333',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                margin: '0 0 8px 0'
              }}>
                {selectedReward.title}
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#ccc',
                margin: '0 0 12px 0'
              }}>
                {selectedReward.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700'
                }}>
                  {selectedReward.cost.toLocaleString()} points
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#999'
                }}>
                  by {selectedReward.partner}
                </span>
              </div>
            </div>

            {selectedReward.eligibility.length > 0 && (
              <div style={{
                marginBottom: '20px'
              }}>
                <h5 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '0 0 8px 0'
                }}>
                  Eligibility Requirements:
                </h5>
                <ul style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '12px',
                  color: '#ccc'
                }}>
                  {selectedReward.eligibility.map((req, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => setSelectedReward(null)}
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
                Cancel
              </button>
              <button
                onClick={handleRewardRedemption}
                disabled={redeeming || !userProfile || userProfile.lifePlusPoints < selectedReward.cost}
                style={{
                  flex: 1,
                  background: redeeming || !userProfile || userProfile.lifePlusPoints < selectedReward.cost ? '#666' : '#C41E3A',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: redeeming || !userProfile || userProfile.lifePlusPoints < selectedReward.cost ? 'not-allowed' : 'pointer'
                }}
              >
                {redeeming ? 'Redeeming...' : 'Confirm Redemption'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {redemptionSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          padding: '20px'
        }}>
          <div style={{
            background: '#2a2a2a',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              background: '#4CAF50',
              borderRadius: '50%',
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <span className="material-icons-outlined" style={{
                fontSize: '32px',
                color: '#fff'
              }}>
                check_circle
              </span>
            </div>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              Reward Redeemed!
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '20px'
            }}>
              {redemptionSuccess.instructions}
            </p>

            <div style={{
              background: '#333',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <p style={{
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                <strong>Confirmation Code:</strong> {redemptionSuccess.confirmationCode}
              </p>
            </div>

            <button
              onClick={() => setRedemptionSuccess(null)}
              style={{
                width: '100%',
                background: '#C41E3A',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}