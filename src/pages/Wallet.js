import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Wallet.tsx - Absa Life+ Smart Money Hub
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";
import absaLogo from '../assets/absa-logo-red-bg.svg'; // ABSA logo with red background
// Enhanced API with Life+ features
const lifeAPI = {
    getSmartMoneyData: async () => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
            cards: [
                {
                    id: '1',
                    type: 'debit',
                    last4: '1956',
                    brand: 'visa',
                    balance: 2450.50,
                    actualBalance: 1950.50, // Available after pending transactions
                    isActive: true,
                    expiryDate: '12/26',
                    nickname: 'Current Account',
                    category: 'primary'
                },
                {
                    id: '2',
                    type: 'fx',
                    last4: '8274',
                    brand: 'mastercard',
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
                    category: 'travel',
                    color: '#4CAF50'
                },
                {
                    id: 'env2',
                    name: 'Emergency Fund',
                    balance: 12000.00,
                    target: 20000.00,
                    category: 'emergency',
                    color: '#FF9800'
                },
                {
                    id: 'env3',
                    name: 'Business Capital',
                    balance: 5500.00,
                    target: 10000.00,
                    category: 'business',
                    color: '#2196F3'
                }
            ],
            fxRates: [
                { currency: 'USD', rate: 18.45, trend: 'down', symbol: '$' },
                { currency: 'EUR', rate: 20.15, trend: 'up', symbol: '€' },
                { currency: 'GBP', rate: 23.28, trend: 'stable', symbol: '£' },
                { currency: 'KES', rate: 0.12, trend: 'up', symbol: 'KSh' }
            ]
        };
    },
    getConciergeCards: async () => {
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
    getTransactions: async (cardId) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const transactions = [
            {
                id: '1',
                amount: -89.50,
                description: 'Adobe Creative Suite',
                date: '2025-09-19',
                type: 'debit',
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
                type: 'debit',
                merchant: 'WeWork Sandton',
                cardId: '1',
                category: 'workspace'
            },
            {
                id: '3',
                amount: 2500.00,
                description: 'Freelance Payment',
                date: '2025-09-15',
                type: 'credit',
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
                type: 'debit',
                merchant: 'Kenya Airways',
                cardId: '2',
                category: 'travel'
            }
        ];
        return transactions.filter(t => t.cardId === cardId);
    },
    convertFX: async (fromCurrency, toCurrency, amount) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            convertedAmount: amount * 18.45,
            fee: amount * 0.015,
            reference: `FX${Date.now()}`
        };
    },
    transferToEnvelope: async (envelopeId, amount) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true, newBalance: Math.random() * 1000 + amount };
    }
};
export default function Wallet() {
    const [smartMoneyData, setSmartMoneyData] = useState(null);
    const [conciergeCards, setConciergeCards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [showFXConverter, setShowFXConverter] = useState(false);
    const [fxAmount, setFxAmount] = useState('');
    const [selectedFXRate, setSelectedFXRate] = useState(null);
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
        }
        catch (error) {
            console.error('Failed to load smart money data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const loadConciergeCards = async () => {
        try {
            const cards = await lifeAPI.getConciergeCards();
            setConciergeCards(cards);
        }
        catch (error) {
            console.error('Failed to load concierge cards:', error);
        }
    };
    const loadTransactions = async (cardId) => {
        try {
            const transactionsData = await lifeAPI.getTransactions(cardId);
            setTransactions(transactionsData);
        }
        catch (error) {
            console.error('Failed to load transactions:', error);
        }
    };
    const handleFXConversion = async () => {
        if (!selectedFXRate || !fxAmount)
            return;
        try {
            const result = await lifeAPI.convertFX('ZAR', selectedFXRate.currency, parseFloat(fxAmount));
            if (result.success) {
                setShowFXConverter(false);
                setFxAmount('');
                // Refresh data
                loadSmartMoneyData();
            }
        }
        catch (error) {
            console.error('FX conversion failed:', error);
        }
    };
    const getConciergeCardIcon = (type) => {
        switch (type) {
            case 'fx_alert': return 'trending_down';
            case 'travel_perk': return 'flight';
            case 'business_opportunity': return 'business_center';
            case 'mentor_session': return 'school';
            default: return 'info';
        }
    };
    const getConciergeCardColor = (priority) => {
        switch (priority) {
            case 'high': return '#C41E3A';
            case 'medium': return '#FF9800';
            case 'low': return '#4CAF50';
            default: return '#666';
        }
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
                            } }), _jsx("p", { children: "Loading Smart Money Hub..." })] }), _jsx("style", { children: `
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
                                        }, children: "Smart Money Hub" }), _jsx("p", { style: {
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#999'
                                        }, children: "Your Life+ financial command center" })] }), _jsx("div", { style: {
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }, children: _jsx("img", { src: absaLogo, alt: "ABSA Logo", style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%'
                                    } }) })] }), _jsx("div", { style: {
                            display: 'flex',
                            gap: '8px',
                            overflowX: 'auto'
                        }, children: [
                            { id: 'overview', label: 'Overview' },
                            { id: 'cards', label: 'Cards' },
                            { id: 'envelopes', label: 'Envelopes' },
                            { id: 'fx', label: 'FX Rates' }
                        ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), style: {
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                background: activeTab === tab.id ? '#C41E3A' : '#333',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: '500',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer'
                            }, children: tab.label }, tab.id))) })] }), _jsxs("main", { style: { padding: '20px', paddingBottom: '100px' }, children: [activeTab === 'overview' && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsxs("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '20px' }, children: "assistant" }), "AI Concierge"] }), _jsx("div", { style: { display: 'grid', gap: '12px' }, children: conciergeCards.map((card) => (_jsx("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        borderLeft: `4px solid ${getConciergeCardColor(card.priority)}`
                                    }, children: _jsxs("div", { style: {
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px'
                                        }, children: [_jsx("div", { style: {
                                                    background: getConciergeCardColor(card.priority),
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
                                                    }, children: getConciergeCardIcon(card.type) }) }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("h4", { style: {
                                                            fontSize: '16px',
                                                            fontWeight: '600',
                                                            margin: 0,
                                                            marginBottom: '4px'
                                                        }, children: card.title }), _jsx("p", { style: {
                                                            fontSize: '14px',
                                                            color: '#ccc',
                                                            margin: 0,
                                                            marginBottom: '12px'
                                                        }, children: card.description }), _jsx("button", { style: {
                                                            background: getConciergeCardColor(card.priority),
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            padding: '8px 16px',
                                                            color: '#fff',
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            cursor: 'pointer'
                                                        }, children: card.action })] })] }) }, card.id))) })] })), activeTab === 'overview' && smartMoneyData && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: "Available vs Actual Balance" }), _jsxs("div", { style: {
                                    background: 'linear-gradient(135deg, #C41E3A 0%, #A91B47 100%)',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    marginBottom: '16px'
                                }, children: [_jsxs("div", { style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '16px'
                                        }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                            margin: 0,
                                                            fontSize: '14px',
                                                            opacity: 0.8
                                                        }, children: "Available Balance" }), _jsxs("p", { style: {
                                                            margin: 0,
                                                            fontSize: '28px',
                                                            fontWeight: '700'
                                                        }, children: ["R ", smartMoneyData.cards[0].actualBalance?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })] })] }), _jsxs("div", { style: { textAlign: 'right' }, children: [_jsx("p", { style: {
                                                            margin: 0,
                                                            fontSize: '14px',
                                                            opacity: 0.8
                                                        }, children: "Actual Balance" }), _jsxs("p", { style: {
                                                            margin: 0,
                                                            fontSize: '18px',
                                                            fontWeight: '600'
                                                        }, children: ["R ", smartMoneyData.cards[0].balance?.toLocaleString('en-ZA', { minimumFractionDigits: 2 })] })] })] }), _jsxs("div", { style: {
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            fontSize: '14px'
                                        }, children: ["Pending: R ", (smartMoneyData.cards[0].balance - smartMoneyData.cards[0].actualBalance).toLocaleString('en-ZA', { minimumFractionDigits: 2 })] })] })] })), (activeTab === 'overview' || activeTab === 'envelopes') && smartMoneyData?.envelopes && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: "Money Envelopes" }), _jsx("div", { style: { display: 'grid', gap: '12px' }, children: smartMoneyData.envelopes.map((envelope) => (_jsxs("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '12px',
                                        padding: '16px'
                                    }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '12px'
                                            }, children: [_jsxs("div", { style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px'
                                                    }, children: [_jsx("div", { style: {
                                                                width: '12px',
                                                                height: '12px',
                                                                borderRadius: '50%',
                                                                background: envelope.color
                                                            } }), _jsx("h4", { style: {
                                                                fontSize: '16px',
                                                                fontWeight: '600',
                                                                margin: 0
                                                            }, children: envelope.name })] }), _jsxs("p", { style: {
                                                        fontSize: '16px',
                                                        fontWeight: '700',
                                                        margin: 0
                                                    }, children: ["R ", envelope.balance.toLocaleString('en-ZA')] })] }), _jsx("div", { style: {
                                                background: '#333',
                                                borderRadius: '8px',
                                                height: '8px',
                                                overflow: 'hidden'
                                            }, children: _jsx("div", { style: {
                                                    background: envelope.color,
                                                    height: '100%',
                                                    width: `${(envelope.balance / envelope.target) * 100}%`,
                                                    transition: 'width 0.3s ease'
                                                } }) }), _jsxs("p", { style: {
                                                fontSize: '12px',
                                                color: '#999',
                                                margin: '8px 0 0 0'
                                            }, children: [Math.round((envelope.balance / envelope.target) * 100), "% of R ", envelope.target.toLocaleString('en-ZA'), " goal"] })] }, envelope.id))) })] })), (activeTab === 'overview' || activeTab === 'fx') && smartMoneyData?.fxRates && (_jsxs("div", { style: { marginBottom: '24px' }, children: [_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '16px'
                                }, children: [_jsx("h3", { style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            margin: 0
                                        }, children: "Live FX Rates" }), _jsx("button", { onClick: () => setShowFXConverter(true), style: {
                                            background: '#C41E3A',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '8px 12px',
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }, children: "Convert" })] }), _jsx("div", { style: { display: 'grid', gap: '8px' }, children: smartMoneyData.fxRates.map((rate) => (_jsxs("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("span", { style: { fontSize: '18px' }, children: rate.symbol }), _jsx("span", { style: { fontWeight: '600' }, children: rate.currency })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsxs("span", { children: ["R ", rate.rate.toFixed(2)] }), _jsx("span", { className: "material-icons-outlined", style: {
                                                        fontSize: '16px',
                                                        color: rate.trend === 'up' ? '#4CAF50' : rate.trend === 'down' ? '#f44336' : '#999'
                                                    }, children: rate.trend === 'up' ? 'trending_up' : rate.trend === 'down' ? 'trending_down' : 'trending_flat' })] })] }, rate.currency))) })] })), activeTab === 'cards' && smartMoneyData?.cards && (_jsxs("div", { children: [_jsx("div", { style: {
                                    display: 'flex',
                                    gap: '16px',
                                    overflowX: 'auto',
                                    marginBottom: '24px'
                                }, children: smartMoneyData.cards.map((card) => (_jsxs("div", { onClick: () => setSelectedCard(card), style: {
                                        minWidth: '280px',
                                        height: '180px',
                                        background: card.type === 'fx'
                                            ? 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
                                            : 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        cursor: 'pointer',
                                        border: selectedCard?.id === card.id ? '2px solid #fff' : '2px solid transparent'
                                    }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '20px'
                                            }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                                margin: 0,
                                                                fontSize: '14px',
                                                                opacity: 0.8,
                                                                marginBottom: '4px'
                                                            }, children: card.nickname }), _jsx("p", { style: {
                                                                margin: 0,
                                                                fontSize: '12px',
                                                                opacity: 0.6,
                                                                textTransform: 'uppercase'
                                                            }, children: card.type === 'fx' ? 'Global FX' : card.type })] }), _jsx("span", { className: "material-icons-outlined", style: {
                                                        fontSize: '28px',
                                                        opacity: 0.9
                                                    }, children: card.type === 'fx' ? 'language' : 'credit_card' })] }), _jsx("div", { style: { marginBottom: '16px' }, children: _jsxs("p", { style: {
                                                    margin: 0,
                                                    fontSize: '18px',
                                                    fontWeight: '600',
                                                    letterSpacing: '2px'
                                                }, children: ["\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ", card.last4] }) }), _jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-end'
                                            }, children: [_jsx("div", { children: _jsxs("p", { style: {
                                                            margin: 0,
                                                            fontSize: '24px',
                                                            fontWeight: '700'
                                                        }, children: ["R ", card.balance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })] }) }), _jsx("div", { children: _jsx("p", { style: {
                                                            margin: 0,
                                                            fontSize: '12px',
                                                            opacity: 0.7
                                                        }, children: card.expiryDate }) })] })] }, card.id))) }), selectedCard && (_jsxs("div", { children: [_jsx("h3", { style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: '16px'
                                        }, children: "Recent Transactions" }), _jsx("div", { style: { display: 'grid', gap: '12px' }, children: transactions.map((transaction) => (_jsxs("div", { style: {
                                                background: '#2a2a2a',
                                                borderRadius: '12px',
                                                padding: '16px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("div", { style: {
                                                                width: '40px',
                                                                height: '40px',
                                                                borderRadius: '50%',
                                                                background: transaction.type === 'credit' ? '#4CAF50' : '#333',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                                    fontSize: '20px',
                                                                    color: transaction.type === 'credit' ? '#fff' : '#999'
                                                                }, children: transaction.category === 'travel' ? 'flight' :
                                                                    transaction.category === 'subscription' ? 'subscriptions' :
                                                                        transaction.category === 'workspace' ? 'business_center' :
                                                                            transaction.type === 'credit' ? 'arrow_downward' : 'arrow_upward' }) }), _jsxs("div", { children: [_jsx("p", { style: {
                                                                        margin: 0,
                                                                        fontSize: '16px',
                                                                        fontWeight: '600',
                                                                        marginBottom: '2px'
                                                                    }, children: transaction.merchant }), _jsx("p", { style: {
                                                                        margin: 0,
                                                                        fontSize: '14px',
                                                                        color: '#999'
                                                                    }, children: transaction.description }), _jsxs("p", { style: {
                                                                        margin: 0,
                                                                        fontSize: '12px',
                                                                        color: '#666',
                                                                        marginTop: '2px'
                                                                    }, children: [new Date(transaction.date).toLocaleDateString('en-ZA'), transaction.location && ` • ${transaction.location}`] })] })] }), _jsxs("div", { style: { textAlign: 'right' }, children: [_jsxs("p", { style: {
                                                                margin: 0,
                                                                fontSize: '16px',
                                                                fontWeight: '700',
                                                                color: transaction.type === 'credit' ? '#4CAF50' : '#fff'
                                                            }, children: [transaction.type === 'credit' ? '+' : '', "R ", Math.abs(transaction.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })] }), _jsx("p", { style: {
                                                                margin: 0,
                                                                fontSize: '12px',
                                                                color: '#999',
                                                                textTransform: 'capitalize'
                                                            }, children: transaction.category })] })] }, transaction.id))) })] }))] }))] }), showFXConverter && smartMoneyData?.fxRates && (_jsx("div", { style: {
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
                }, children: _jsxs("div", { style: {
                        background: '#2a2a2a',
                        borderRadius: '16px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%'
                    }, children: [_jsx("h3", { style: {
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '20px',
                                textAlign: 'center'
                            }, children: "FX Converter" }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("p", { style: {
                                        fontSize: '14px',
                                        marginBottom: '8px',
                                        color: '#ccc'
                                    }, children: "Amount (ZAR)" }), _jsx("input", { type: "number", value: fxAmount, onChange: (e) => setFxAmount(e.target.value), placeholder: "Enter amount", style: {
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #444',
                                        borderRadius: '8px',
                                        background: '#333',
                                        color: '#fff',
                                        fontSize: '16px'
                                    } })] }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("p", { style: {
                                        fontSize: '14px',
                                        marginBottom: '8px',
                                        color: '#ccc'
                                    }, children: "Convert to" }), _jsx("div", { style: { display: 'grid', gap: '8px' }, children: smartMoneyData.fxRates.map((rate) => (_jsxs("button", { onClick: () => setSelectedFXRate(rate), style: {
                                            padding: '12px',
                                            border: `2px solid ${selectedFXRate?.currency === rate.currency ? '#C41E3A' : '#333'}`,
                                            background: selectedFXRate?.currency === rate.currency ? 'rgba(196, 30, 58, 0.1)' : 'transparent',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }, children: [_jsxs("span", { children: [rate.symbol, " ", rate.currency] }), _jsxs("span", { children: ["R ", rate.rate.toFixed(2)] })] }, rate.currency))) })] }), selectedFXRate && fxAmount && (_jsxs("div", { style: {
                                background: '#333',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '20px'
                            }, children: [_jsx("p", { style: {
                                        fontSize: '14px',
                                        color: '#ccc',
                                        margin: 0,
                                        marginBottom: '4px'
                                    }, children: "You will receive" }), _jsxs("p", { style: {
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        margin: 0,
                                        color: '#4CAF50'
                                    }, children: [selectedFXRate.symbol, " ", (parseFloat(fxAmount) / selectedFXRate.rate).toFixed(2)] }), _jsxs("p", { style: {
                                        fontSize: '12px',
                                        color: '#999',
                                        margin: '8px 0 0 0'
                                    }, children: ["Fee: R ", (parseFloat(fxAmount) * 0.015).toFixed(2), " (1.5%)"] })] })), _jsxs("div", { style: {
                                display: 'flex',
                                gap: '12px',
                                marginTop: '24px'
                            }, children: [_jsx("button", { onClick: () => setShowFXConverter(false), style: {
                                        flex: 1,
                                        padding: '14px',
                                        background: '#333',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }, children: "Cancel" }), _jsx("button", { onClick: handleFXConversion, disabled: !selectedFXRate || !fxAmount, style: {
                                        flex: 1,
                                        padding: '14px',
                                        background: (!selectedFXRate || !fxAmount) ? '#666' : '#C41E3A',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: (!selectedFXRate || !fxAmount) ? 'not-allowed' : 'pointer'
                                    }, children: "Convert" })] })] }) })), _jsx(BottomNav, {})] }));
}
