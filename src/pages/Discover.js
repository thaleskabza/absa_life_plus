import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Discover.tsx - Lifestyle Product Recommendations
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";
// Mock Discovery API
const discoverAPI = {
    getUserProfile: async () => {
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
    getPersonalizedRecommendations: async (profile) => {
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
    getLifestyleInsights: async (profile) => {
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
    trackProductInteraction: async (productId, action) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return { success: true, tracked: true };
    }
};
export default function Discover() {
    const [userProfile, setUserProfile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [lifestyleInsights, setLifestyleInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [savedProducts, setSavedProducts] = useState(new Set());
    const [expandedProduct, setExpandedProduct] = useState(null);
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
        }
        catch (error) {
            console.error('Failed to load discovery data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleProductSave = async (productId) => {
        try {
            await discoverAPI.trackProductInteraction(productId, 'save');
            setSavedProducts(prev => {
                const newSet = new Set(prev);
                if (newSet.has(productId)) {
                    newSet.delete(productId);
                }
                else {
                    newSet.add(productId);
                }
                return newSet;
            });
        }
        catch (error) {
            console.error('Failed to save product:', error);
        }
    };
    const filteredProducts = recommendations.filter(product => selectedCategory === 'all' || product.category === selectedCategory);
    const categories = [
        { id: 'all', label: 'All', count: recommendations.length },
        { id: 'banking', label: 'Banking', count: recommendations.filter(p => p.category === 'banking').length },
        { id: 'lifestyle', label: 'Lifestyle', count: recommendations.filter(p => p.category === 'lifestyle').length },
        { id: 'business', label: 'Business', count: recommendations.filter(p => p.category === 'business').length },
        { id: 'investment', label: 'Investing', count: recommendations.filter(p => p.category === 'investment').length },
        { id: 'insurance', label: 'Insurance', count: recommendations.filter(p => p.category === 'insurance').length }
    ];
    const getProductIcon = (category) => {
        switch (category) {
            case 'banking': return 'account_balance';
            case 'lifestyle': return 'style';
            case 'business': return 'business_center';
            case 'investment': return 'trending_up';
            case 'insurance': return 'security';
            default: return 'inventory';
        }
    };
    const getMatchColor = (match) => {
        if (match >= 90)
            return '#4CAF50';
        if (match >= 80)
            return '#8BC34A';
        if (match >= 70)
            return '#FFC107';
        return '#FF9800';
    };
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
                            } }), _jsx("p", { children: "Discovering your perfect products..." })] }), _jsx("style", { children: `
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
                                        }, children: "Discover" }), _jsx("p", { style: {
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#999'
                                        }, children: "Products tailored to your lifestyle" })] }), _jsx("div", { style: {
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }, children: _jsx("img", { src: "/absa-logo-red-bg.svg", alt: "ABSA Logo", style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%'
                                    } }) })] }), _jsx("div", { style: {
                            display: 'flex',
                            gap: '8px',
                            overflowX: 'auto',
                            paddingBottom: '8px'
                        }, children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), style: {
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
                            }, children: [category.label, category.count > 0 && (_jsx("span", { style: {
                                        background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#555',
                                        borderRadius: '10px',
                                        padding: '2px 6px',
                                        fontSize: '12px'
                                    }, children: category.count }))] }, category.id))) })] }), _jsxs("main", { style: { padding: '20px', paddingBottom: '100px' }, children: [selectedCategory === 'all' && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsxs("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '20px' }, children: "insights" }), "Your Lifestyle Insights"] }), _jsx("div", { style: { display: 'grid', gap: '12px' }, children: lifestyleInsights.map((insight, index) => (_jsx("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '12px',
                                        padding: '16px'
                                    }, children: _jsxs("div", { style: {
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px'
                                        }, children: [_jsx("div", { style: {
                                                    background: '#C41E3A',
                                                    borderRadius: '8px',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                        fontSize: '20px',
                                                        color: '#fff'
                                                    }, children: insight.icon }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs("div", { style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginBottom: '8px'
                                                        }, children: [_jsx("h4", { style: {
                                                                    fontSize: '16px',
                                                                    fontWeight: '600',
                                                                    margin: 0
                                                                }, children: insight.category }), _jsxs("span", { style: {
                                                                    fontSize: '12px',
                                                                    color: '#4CAF50',
                                                                    fontWeight: '600'
                                                                }, children: [insight.confidence, "% confidence"] })] }), _jsx("p", { style: {
                                                            fontSize: '14px',
                                                            color: '#ccc',
                                                            margin: '0 0 8px 0'
                                                        }, children: insight.pattern }), _jsx("p", { style: {
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            margin: 0,
                                                            fontWeight: '500'
                                                        }, children: insight.recommendation })] })] }) }, index))) })] })), _jsxs("div", { children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: selectedCategory === 'all' ? 'Recommended for You' : `${categories.find(c => c.id === selectedCategory)?.label} Products` }), _jsx("div", { style: { display: 'grid', gap: '16px' }, children: filteredProducts.map((product) => (_jsxs("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        border: product.priority === 'high' ? '2px solid #C41E3A' : '1px solid #444'
                                    }, children: [_jsxs("div", { style: {
                                                padding: '20px',
                                                borderBottom: expandedProduct === product.id ? '1px solid #444' : 'none'
                                            }, children: [_jsxs("div", { style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '12px'
                                                    }, children: [_jsxs("div", { style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px'
                                                            }, children: [_jsx("div", { style: {
                                                                        background: '#C41E3A',
                                                                        borderRadius: '12px',
                                                                        width: '48px',
                                                                        height: '48px',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center'
                                                                    }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                                            fontSize: '24px',
                                                                            color: '#fff'
                                                                        }, children: getProductIcon(product.category) }) }), _jsxs("div", { children: [_jsx("h4", { style: {
                                                                                fontSize: '18px',
                                                                                fontWeight: '600',
                                                                                margin: 0,
                                                                                marginBottom: '4px'
                                                                            }, children: product.name }), _jsxs("div", { style: {
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                gap: '8px'
                                                                            }, children: [_jsx("span", { style: {
                                                                                        fontSize: '12px',
                                                                                        color: '#999',
                                                                                        textTransform: 'capitalize'
                                                                                    }, children: product.category }), _jsxs("div", { style: {
                                                                                        background: getMatchColor(product.lifestyleMatch),
                                                                                        borderRadius: '12px',
                                                                                        padding: '2px 8px',
                                                                                        fontSize: '12px',
                                                                                        fontWeight: '600',
                                                                                        color: '#000'
                                                                                    }, children: [product.lifestyleMatch, "% match"] }), product.provider === 'partner' && (_jsx("span", { style: {
                                                                                        fontSize: '12px',
                                                                                        color: '#FF9800',
                                                                                        fontWeight: '500'
                                                                                    }, children: "Partner" }))] })] })] }), _jsx("button", { onClick: () => handleProductSave(product.id), style: {
                                                                background: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer'
                                                            }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                                    fontSize: '24px',
                                                                    color: savedProducts.has(product.id) ? '#C41E3A' : '#666'
                                                                }, children: savedProducts.has(product.id) ? 'bookmark' : 'bookmark_border' }) })] }), _jsx("p", { style: {
                                                        fontSize: '14px',
                                                        color: '#ccc',
                                                        margin: '0 0 12px 0',
                                                        lineHeight: 1.5
                                                    }, children: product.description }), _jsx("div", { style: {
                                                        background: '#333',
                                                        borderRadius: '8px',
                                                        padding: '12px',
                                                        marginBottom: '16px'
                                                    }, children: _jsxs("p", { style: {
                                                            fontSize: '14px',
                                                            color: '#4CAF50',
                                                            margin: 0,
                                                            fontWeight: '600'
                                                        }, children: ["Why this fits you: ", product.personalizedReason] }) }), _jsxs("div", { style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        marginBottom: '16px'
                                                    }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                                        fontSize: '16px',
                                                                        fontWeight: '700',
                                                                        margin: 0,
                                                                        color: '#fff'
                                                                    }, children: product.pricing.type === 'free' ? 'Free' :
                                                                        product.pricing.type === 'percentage' ? `${product.pricing.amount}% p.a.` :
                                                                            `R${product.pricing.amount}/${product.pricing.type}` }), _jsx("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#999',
                                                                        margin: '2px 0 0 0'
                                                                    }, children: product.pricing.details })] }), _jsxs("div", { style: {
                                                                textAlign: 'right'
                                                            }, children: [_jsx("p", { style: {
                                                                        fontSize: '14px',
                                                                        fontWeight: '600',
                                                                        margin: 0,
                                                                        color: '#4CAF50'
                                                                    }, children: product.estimatedValue }), _jsx("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#999',
                                                                        margin: '2px 0 0 0'
                                                                    }, children: "Potential value" })] })] }), _jsxs("div", { style: {
                                                        display: 'flex',
                                                        gap: '12px'
                                                    }, children: [_jsx("button", { onClick: () => setExpandedProduct(expandedProduct === product.id ? null : product.id), style: {
                                                                flex: 1,
                                                                background: '#333',
                                                                border: 'none',
                                                                borderRadius: '8px',
                                                                padding: '12px',
                                                                color: '#fff',
                                                                fontWeight: '600',
                                                                cursor: 'pointer'
                                                            }, children: expandedProduct === product.id ? 'Hide Details' : 'View Details' }), _jsx("button", { style: {
                                                                flex: 1,
                                                                background: '#C41E3A',
                                                                border: 'none',
                                                                borderRadius: '8px',
                                                                padding: '12px',
                                                                color: '#fff',
                                                                fontWeight: '600',
                                                                cursor: 'pointer'
                                                            }, children: "Apply Now" })] })] }), expandedProduct === product.id && (_jsx("div", { style: {
                                                padding: '20px',
                                                background: '#222'
                                            }, children: _jsxs("div", { style: {
                                                    display: 'grid',
                                                    gap: '16px'
                                                }, children: [_jsxs("div", { children: [_jsx("h5", { style: {
                                                                    fontSize: '16px',
                                                                    fontWeight: '600',
                                                                    margin: '0 0 8px 0'
                                                                }, children: "Benefits" }), _jsx("ul", { style: {
                                                                    margin: 0,
                                                                    paddingLeft: '20px'
                                                                }, children: product.benefits.map((benefit, index) => (_jsx("li", { style: {
                                                                        fontSize: '14px',
                                                                        color: '#ccc',
                                                                        marginBottom: '4px'
                                                                    }, children: benefit }, index))) })] }), _jsxs("div", { children: [_jsx("h5", { style: {
                                                                    fontSize: '16px',
                                                                    fontWeight: '600',
                                                                    margin: '0 0 8px 0'
                                                                }, children: "Eligibility Requirements" }), _jsx("ul", { style: {
                                                                    margin: 0,
                                                                    paddingLeft: '20px'
                                                                }, children: product.eligibility.map((requirement, index) => (_jsx("li", { style: {
                                                                        fontSize: '14px',
                                                                        color: '#ccc',
                                                                        marginBottom: '4px'
                                                                    }, children: requirement }, index))) })] }), _jsxs("div", { children: [_jsx("h5", { style: {
                                                                    fontSize: '16px',
                                                                    fontWeight: '600',
                                                                    margin: '0 0 8px 0'
                                                                }, children: "Tags" }), _jsx("div", { style: {
                                                                    display: 'flex',
                                                                    gap: '8px',
                                                                    flexWrap: 'wrap'
                                                                }, children: product.tags.map((tag) => (_jsx("span", { style: {
                                                                        background: '#444',
                                                                        borderRadius: '12px',
                                                                        padding: '4px 12px',
                                                                        fontSize: '12px',
                                                                        color: '#ccc'
                                                                    }, children: tag.replace('_', ' ') }, tag))) })] })] }) }))] }, product.id))) })] })] }), _jsx(BottomNav, {})] }));
}
