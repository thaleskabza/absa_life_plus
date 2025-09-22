import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Rewards.tsx - Curated Lifestyle & Partner Benefits
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";
import absaLogo from '../assets/absa-logo-red-bg.svg'; // ABSA logo with red background
// Realistic South African rewards based on actual market
const REWARDS_CATALOG = [
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
    getUserRewardsProfile: async () => {
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
    getPersonalizedRewards: async (profile) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        // Personalize based on user profile
        const personalizedRewards = REWARDS_CATALOG.map(reward => {
            let personalizedReason = '';
            if (reward.category === 'travel' && profile.travelFrequency === 'frequent') {
                personalizedReason = 'Perfect for your frequent travel pattern';
            }
            else if (reward.category === 'workspace' && profile.spendingCategories.professional_services > 1000) {
                personalizedReason = 'Matches your co-working spending habits';
            }
            else if (reward.category === 'tech' && profile.spendingCategories.technology > 500) {
                personalizedReason = 'Aligns with your tech subscription usage';
            }
            else if (reward.category === 'professional' && profile.tierLevel !== 'Explorer') {
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
            if (aRelevant !== bRelevant)
                return bRelevant - aRelevant;
            if (a.featured !== b.featured)
                return a.featured ? -1 : 1;
            return a.cost - b.cost;
        });
    },
    getRedemptionHistory: async () => {
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
    redeemReward: async (rewardId, pointsCost) => {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return {
            success: true,
            confirmationCode: `ABL${Date.now().toString(36).toUpperCase()}`,
            redemptionId: `rd_${Date.now()}`,
            instructions: 'Check your email for redemption instructions and voucher details.'
        };
    },
    getPartnerBusinesses: async () => {
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
    const [userProfile, setUserProfile] = useState(null);
    const [rewards, setRewards] = useState([]);
    const [redemptionHistory, setRedemptionHistory] = useState([]);
    const [partnerBusinesses, setPartnerBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeTab, setActiveTab] = useState('explore');
    const [selectedReward, setSelectedReward] = useState(null);
    const [redeeming, setRedeeming] = useState(false);
    const [redemptionSuccess, setRedemptionSuccess] = useState(null);
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
        }
        catch (error) {
            console.error('Failed to load rewards data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleRewardRedemption = async () => {
        if (!selectedReward || !userProfile)
            return;
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
        }
        catch (error) {
            console.error('Redemption failed:', error);
        }
        finally {
            setRedeeming(false);
        }
    };
    const filteredRewards = rewards.filter(reward => selectedCategory === 'all' || reward.category === selectedCategory);
    const getTierColor = (tier) => {
        switch (tier) {
            case 'Executive': return '#C41E3A';
            case 'Professional': return '#FF9800';
            case 'Explorer': return '#4CAF50';
            default: return '#666';
        }
    };
    const getCategoryIcon = (category) => {
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
        return (_jsxs("div", { style: {
                minHeight: '100vh',
                background: '#1a1a1a',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                width: '40px',
                                height: '40px',
                                border: '3px solid #333',
                                borderTop: '3px solid #C41E3A',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 16px'
                            } }), _jsx("p", { children: "Loading your rewards..." })] }), _jsx("style", { children: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        ` })] }));
    }
    return (_jsxs("div", { style: { minHeight: '100vh', background: '#1a1a1a', color: '#fff' }, children: [_jsxs("header", { style: {
                    padding: '20px',
                    borderBottom: '1px solid #333'
                }, children: [_jsxs("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }, children: [_jsxs("div", { children: [_jsx("h1", { style: {
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            margin: 0,
                                            marginBottom: '4px'
                                        }, children: "Life+ Rewards" }), _jsx("p", { style: {
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#999'
                                        }, children: "Curated lifestyle perks and exclusive benefits" })] }), _jsx("div", { style: {
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }, children: _jsx("img", { src: absaLogo, alt: "ABSA Logo", style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%'
                                    } }) })] }), userProfile && (_jsxs("div", { style: {
                            background: 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '20px'
                        }, children: [_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '12px'
                                }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                    fontSize: '32px',
                                                    fontWeight: '700',
                                                    margin: 0
                                                }, children: userProfile.lifePlusPoints.toLocaleString() }), _jsx("p", { style: {
                                                    fontSize: '14px',
                                                    margin: 0,
                                                    opacity: 0.9
                                                }, children: "Life+ Points Available" })] }), _jsx("div", { style: {
                                            background: getTierColor(userProfile.tierLevel),
                                            borderRadius: '20px',
                                            padding: '8px 16px'
                                        }, children: _jsxs("span", { style: {
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#fff'
                                            }, children: [userProfile.tierLevel, " Tier"] }) })] }), _jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '12px',
                                    opacity: 0.8
                                }, children: [_jsxs("span", { children: ["Earned: ", userProfile.rewardsEarned.toLocaleString()] }), _jsxs("span", { children: ["Redeemed: ", userProfile.rewardsRedeemed.toLocaleString()] })] })] })), _jsx("div", { style: {
                            display: 'flex',
                            gap: '8px'
                        }, children: [
                            { id: 'explore', label: 'Explore', icon: 'explore' },
                            { id: 'history', label: 'History', icon: 'history' },
                            { id: 'partners', label: 'Partners', icon: 'business' }
                        ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), style: {
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
                            }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: tab.icon }), tab.label] }, tab.id))) })] }), _jsxs("main", { style: { padding: '20px', paddingBottom: '100px' }, children: [activeTab === 'explore' && (_jsxs("div", { children: [_jsx("div", { style: {
                                    display: 'flex',
                                    gap: '8px',
                                    overflowX: 'auto',
                                    paddingBottom: '8px',
                                    marginBottom: '24px'
                                }, children: categories.slice(0, 5).map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), style: {
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
                                    }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: category.icon }), category.label] }, category.id))) }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: '16px'
                                        }, children: "Featured for You" }), _jsx("div", { style: {
                                            display: 'flex',
                                            gap: '16px',
                                            overflowX: 'auto',
                                            paddingBottom: '8px'
                                        }, children: filteredRewards.filter(r => r.featured).map((reward) => (_jsxs("div", { style: {
                                                minWidth: '300px',
                                                background: '#2a2a2a',
                                                borderRadius: '16px',
                                                padding: '20px',
                                                border: '2px solid #C41E3A'
                                            }, children: [_jsxs("div", { style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '12px'
                                                    }, children: [_jsx("div", { style: {
                                                                background: '#C41E3A',
                                                                borderRadius: '8px',
                                                                padding: '8px',
                                                                marginRight: '12px'
                                                            }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                                    fontSize: '20px',
                                                                    color: '#fff'
                                                                }, children: getCategoryIcon(reward.category) }) }), _jsx("div", { style: {
                                                                background: '#4CAF50',
                                                                borderRadius: '12px',
                                                                padding: '4px 8px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                color: '#fff'
                                                            }, children: "FEATURED" })] }), _jsx("h4", { style: {
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        margin: '0 0 8px 0'
                                                    }, children: reward.title }), _jsx("p", { style: {
                                                        fontSize: '14px',
                                                        color: '#ccc',
                                                        margin: '0 0 12px 0',
                                                        lineHeight: 1.4
                                                    }, children: reward.description }), reward.personalizedReason && (_jsx("div", { style: {
                                                        background: '#333',
                                                        borderRadius: '8px',
                                                        padding: '8px',
                                                        marginBottom: '12px'
                                                    }, children: _jsxs("p", { style: {
                                                            fontSize: '12px',
                                                            color: '#4CAF50',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }, children: ["Why this fits: ", reward.personalizedReason] }) })), _jsxs("div", { style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginBottom: '16px'
                                                    }, children: [_jsxs("div", { children: [_jsxs("p", { style: {
                                                                        fontSize: '18px',
                                                                        fontWeight: '700',
                                                                        margin: 0,
                                                                        color: '#fff'
                                                                    }, children: [reward.cost.toLocaleString(), " points"] }), reward.originalPrice && (_jsxs("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#666',
                                                                        margin: 0
                                                                    }, children: ["Value: ", reward.originalPrice] }))] }), _jsxs("div", { style: {
                                                                textAlign: 'right'
                                                            }, children: [_jsx("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#999',
                                                                        margin: 0
                                                                    }, children: reward.partner }), _jsxs("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#666',
                                                                        margin: 0
                                                                    }, children: ["Used ", reward.usageCount, " times"] })] })] }), _jsx("button", { onClick: () => setSelectedReward(reward), disabled: userProfile ? userProfile.lifePlusPoints < reward.cost : true, style: {
                                                        width: '100%',
                                                        background: userProfile && userProfile.lifePlusPoints >= reward.cost ? '#C41E3A' : '#666',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        padding: '12px',
                                                        color: '#fff',
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        cursor: userProfile && userProfile.lifePlusPoints >= reward.cost ? 'pointer' : 'not-allowed'
                                                    }, children: userProfile && userProfile.lifePlusPoints >= reward.cost ? 'Redeem Now' : 'Insufficient Points' })] }, reward.id))) })] }), _jsxs("div", { children: [_jsx("h3", { style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: '16px'
                                        }, children: "All Rewards" }), _jsx("div", { style: { display: 'grid', gap: '16px' }, children: filteredRewards.filter(r => !r.featured).map((reward) => (_jsx("div", { style: {
                                                background: '#2a2a2a',
                                                borderRadius: '16px',
                                                padding: '20px',
                                                border: '1px solid #444'
                                            }, children: _jsxs("div", { style: {
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '16px'
                                                }, children: [_jsx("div", { style: {
                                                            background: '#333',
                                                            borderRadius: '8px',
                                                            padding: '12px',
                                                            flexShrink: 0
                                                        }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                                fontSize: '24px',
                                                                color: '#ccc'
                                                            }, children: getCategoryIcon(reward.category) }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs("div", { style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'flex-start',
                                                                    marginBottom: '8px'
                                                                }, children: [_jsx("h4", { style: {
                                                                            fontSize: '16px',
                                                                            fontWeight: '600',
                                                                            margin: 0
                                                                        }, children: reward.title }), _jsxs("div", { style: {
                                                                            textAlign: 'right'
                                                                        }, children: [_jsx("p", { style: {
                                                                                    fontSize: '16px',
                                                                                    fontWeight: '700',
                                                                                    margin: 0,
                                                                                    color: '#fff'
                                                                                }, children: reward.cost.toLocaleString() }), _jsx("p", { style: {
                                                                                    fontSize: '12px',
                                                                                    color: '#666',
                                                                                    margin: 0
                                                                                }, children: "points" })] })] }), _jsx("p", { style: {
                                                                    fontSize: '14px',
                                                                    color: '#ccc',
                                                                    margin: '0 0 8px 0',
                                                                    lineHeight: 1.4
                                                                }, children: reward.description }), _jsxs("div", { style: {
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    alignItems: 'center',
                                                                    marginBottom: '12px'
                                                                }, children: [_jsx("span", { style: {
                                                                            background: '#444',
                                                                            borderRadius: '12px',
                                                                            padding: '4px 8px',
                                                                            fontSize: '12px',
                                                                            color: '#ccc'
                                                                        }, children: reward.partner }), reward.location && (_jsx("span", { style: {
                                                                            fontSize: '12px',
                                                                            color: '#666'
                                                                        }, children: reward.location }))] }), _jsx("button", { onClick: () => setSelectedReward(reward), disabled: userProfile ? userProfile.lifePlusPoints < reward.cost : true, style: {
                                                                    background: userProfile && userProfile.lifePlusPoints >= reward.cost ? '#C41E3A' : '#666',
                                                                    border: 'none',
                                                                    borderRadius: '8px',
                                                                    padding: '8px 16px',
                                                                    color: '#fff',
                                                                    fontSize: '12px',
                                                                    fontWeight: '600',
                                                                    cursor: userProfile && userProfile.lifePlusPoints >= reward.cost ? 'pointer' : 'not-allowed'
                                                                }, children: "Redeem" })] })] }) }, reward.id))) })] })] })), activeTab === 'history' && (_jsxs("div", { children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: "Redemption History" }), _jsx("div", { style: { display: 'grid', gap: '12px' }, children: redemptionHistory.map((redemption) => (_jsxs("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '12px',
                                        padding: '16px'
                                    }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '8px'
                                            }, children: [_jsxs("div", { children: [_jsx("h4", { style: {
                                                                fontSize: '16px',
                                                                fontWeight: '600',
                                                                margin: 0,
                                                                marginBottom: '4px'
                                                            }, children: redemption.rewardTitle }), _jsx("p", { style: {
                                                                fontSize: '14px',
                                                                color: '#ccc',
                                                                margin: 0
                                                            }, children: redemption.partner })] }), _jsx("div", { style: {
                                                        background: redemption.status === 'active' ? '#4CAF50' :
                                                            redemption.status === 'used' ? '#666' : '#f44336',
                                                        borderRadius: '12px',
                                                        padding: '4px 8px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        color: '#fff',
                                                        textTransform: 'uppercase'
                                                    }, children: redemption.status })] }), _jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '12px',
                                                color: '#666'
                                            }, children: [_jsxs("span", { children: [redemption.pointsUsed.toLocaleString(), " points used"] }), _jsx("span", { children: new Date(redemption.redeemedAt).toLocaleDateString('en-ZA') })] }), redemption.confirmationCode && (_jsxs("div", { style: {
                                                marginTop: '8px',
                                                padding: '8px',
                                                background: '#333',
                                                borderRadius: '6px',
                                                fontSize: '12px'
                                            }, children: ["Confirmation: ", redemption.confirmationCode] }))] }, redemption.id))) })] })), activeTab === 'partners' && (_jsxs("div", { children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: "Our Partners" }), _jsx("div", { style: { display: 'grid', gap: '16px' }, children: partnerBusinesses.map((partner) => (_jsxs("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '16px',
                                        padding: '20px'
                                    }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '16px',
                                                marginBottom: '12px'
                                            }, children: [_jsx("div", { style: {
                                                        width: '56px',
                                                        height: '56px',
                                                        borderRadius: '8px',
                                                        background: '#C41E3A',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0
                                                    }, children: _jsx("span", { style: {
                                                            fontSize: '18px',
                                                            fontWeight: '700',
                                                            color: '#fff'
                                                        }, children: partner.name.charAt(0) }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("h4", { style: {
                                                                fontSize: '18px',
                                                                fontWeight: '600',
                                                                margin: 0,
                                                                marginBottom: '4px'
                                                            }, children: partner.name }), _jsxs("p", { style: {
                                                                fontSize: '14px',
                                                                color: '#999',
                                                                margin: 0
                                                            }, children: [partner.category, " \u2022 Partner since ", partner.partnerSince] })] })] }), _jsx("p", { style: {
                                                fontSize: '14px',
                                                color: '#ccc',
                                                margin: '0 0 12px 0',
                                                lineHeight: 1.4
                                            }, children: partner.description }), _jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: '12px',
                                                color: '#666'
                                            }, children: [_jsxs("span", { children: [partner.totalRewards, " rewards available"] }), _jsxs("span", { children: ["Popular: ", partner.popularReward] })] })] }, partner.id))) })] }))] }), selectedReward && (_jsx("div", { style: {
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
                }, children: _jsxs("div", { style: {
                        background: '#2a2a2a',
                        borderRadius: '16px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '20px'
                            }, children: [_jsx("h3", { style: {
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        margin: 0
                                    }, children: "Redeem Reward" }), _jsx("button", { onClick: () => setSelectedReward(null), style: {
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#999',
                                        cursor: 'pointer'
                                    }, children: _jsx("span", { className: "material-icons-outlined", style: { fontSize: '24px' }, children: "close" }) })] }), _jsxs("div", { style: {
                                background: '#333',
                                borderRadius: '12px',
                                padding: '16px',
                                marginBottom: '20px'
                            }, children: [_jsx("h4", { style: {
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        margin: '0 0 8px 0'
                                    }, children: selectedReward.title }), _jsx("p", { style: {
                                        fontSize: '14px',
                                        color: '#ccc',
                                        margin: '0 0 12px 0'
                                    }, children: selectedReward.description }), _jsxs("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }, children: [_jsxs("span", { style: {
                                                fontSize: '18px',
                                                fontWeight: '700'
                                            }, children: [selectedReward.cost.toLocaleString(), " points"] }), _jsxs("span", { style: {
                                                fontSize: '14px',
                                                color: '#999'
                                            }, children: ["by ", selectedReward.partner] })] })] }), selectedReward.eligibility.length > 0 && (_jsxs("div", { style: {
                                marginBottom: '20px'
                            }, children: [_jsx("h5", { style: {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        margin: '0 0 8px 0'
                                    }, children: "Eligibility Requirements:" }), _jsx("ul", { style: {
                                        margin: 0,
                                        paddingLeft: '20px',
                                        fontSize: '12px',
                                        color: '#ccc'
                                    }, children: selectedReward.eligibility.map((req, index) => (_jsx("li", { style: { marginBottom: '4px' }, children: req }, index))) })] })), _jsxs("div", { style: {
                                display: 'flex',
                                gap: '12px'
                            }, children: [_jsx("button", { onClick: () => setSelectedReward(null), style: {
                                        flex: 1,
                                        background: '#333',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }, children: "Cancel" }), _jsx("button", { onClick: handleRewardRedemption, disabled: redeeming || !userProfile || userProfile.lifePlusPoints < selectedReward.cost, style: {
                                        flex: 1,
                                        background: redeeming || !userProfile || userProfile.lifePlusPoints < selectedReward.cost ? '#666' : '#C41E3A',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: redeeming || !userProfile || userProfile.lifePlusPoints < selectedReward.cost ? 'not-allowed' : 'pointer'
                                    }, children: redeeming ? 'Redeeming...' : 'Confirm Redemption' })] })] }) })), redemptionSuccess && (_jsx("div", { style: {
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
                }, children: _jsxs("div", { style: {
                        background: '#2a2a2a',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '400px',
                        width: '100%',
                        textAlign: 'center'
                    }, children: [_jsx("div", { style: {
                                background: '#4CAF50',
                                borderRadius: '50%',
                                width: '64px',
                                height: '64px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 20px'
                            }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                    fontSize: '32px',
                                    color: '#fff'
                                }, children: "check_circle" }) }), _jsx("h3", { style: {
                                fontSize: '20px',
                                fontWeight: '700',
                                marginBottom: '12px'
                            }, children: "Reward Redeemed!" }), _jsx("p", { style: {
                                fontSize: '14px',
                                color: '#ccc',
                                marginBottom: '20px'
                            }, children: redemptionSuccess.instructions }), _jsx("div", { style: {
                                background: '#333',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '24px',
                                textAlign: 'left'
                            }, children: _jsxs("p", { style: {
                                    fontSize: '14px',
                                    margin: '0 0 8px 0'
                                }, children: [_jsx("strong", { children: "Confirmation Code:" }), " ", redemptionSuccess.confirmationCode] }) }), _jsx("button", { onClick: () => setRedemptionSuccess(null), style: {
                                width: '100%',
                                background: '#C41E3A',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '12px',
                                color: '#fff',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }, children: "Done" })] }) })), _jsx(BottomNav, {})] }));
}
