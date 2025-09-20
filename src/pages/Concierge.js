import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Concierge.tsx - AI Banking & Life Assistant
import { useState, useEffect, useRef } from 'react';
import BottomNav from "../ui/BottomNav";
// Mock AI Concierge API
const conciergeAPI = {
    getUserContext: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            name: "Kabelo",
            recentTransactions: [
                { merchant: "Kenya Airways", amount: 1200, currency: "USD", category: "travel" },
                { merchant: "Adobe", amount: 89.50, category: "subscription" },
                { merchant: "WeWork Sandton", amount: 450, category: "workspace" }
            ],
            upcomingTrips: [
                { destination: "Nairobi", date: "2025-10-15", purpose: "business" }
            ],
            savingsGoals: [
                { name: "Europe Trip", current: 8500, target: 15000, progress: 57 },
                { name: "Business Capital", current: 5500, target: 10000, progress: 55 }
            ],
            businessInterests: ["fintech", "AI", "entrepreneurship"],
            currentFXRates: [
                { currency: "USD", rate: 18.45, trend: "down" },
                { currency: "KES", rate: 0.12, trend: "up" }
            ],
            spendingPatterns: [
                { category: "professional_services", amount: 1200, growth: 15 },
                { category: "travel", amount: 800, growth: 25 }
            ]
        };
    },
    sendMessage: async (message, context) => {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        const messageId = `msg_${Date.now()}`;
        // Simple intent detection for realistic responses
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('fx') || lowerMessage.includes('exchange') || lowerMessage.includes('convert')) {
            return {
                id: messageId,
                type: 'assistant',
                content: `I see you're interested in foreign exchange. Based on your upcoming Nairobi trip, USD has dropped 2.3% today to R18.45 - this could save you R23 on your planned $500 conversion. 

The Kenyan Shilling is also strengthening, so converting closer to your travel date might be beneficial.`,
                timestamp: new Date(),
                insights: [
                    {
                        type: 'fx_opportunity',
                        title: 'USD Rate Drop',
                        description: 'Save R23 on $500 conversion',
                        impact: 'positive',
                        value: 'R23 savings'
                    }
                ],
                actions: [
                    { id: 'convert_usd', label: 'Convert $500', icon: 'currency_exchange', action: 'fx_convert' },
                    { id: 'set_fx_alert', label: 'Set Rate Alert', icon: 'notifications', action: 'fx_alert' }
                ],
                attachments: [
                    {
                        type: 'fx_rate',
                        title: 'USD/ZAR',
                        subtitle: 'Best rate today',
                        value: 'R18.45',
                        action: 'Convert Now'
                    }
                ]
            };
        }
        if (lowerMessage.includes('save') || lowerMessage.includes('goal') || lowerMessage.includes('budget')) {
            return {
                id: messageId,
                type: 'assistant',
                content: `Your savings momentum is impressive! You're 57% toward your Europe trip goal and building business capital simultaneously.

Based on your recent freelance income of R2,500, I'd suggest allocating R1,000 to your Europe fund and R800 to business capital. This maintains your timeline while diversifying your growth.`,
                timestamp: new Date(),
                insights: [
                    {
                        type: 'saving_goal',
                        title: 'On Track for Europe',
                        description: '57% complete, ahead of schedule',
                        impact: 'positive',
                        value: 'R8,500 saved'
                    }
                ],
                actions: [
                    { id: 'auto_save', label: 'Set Auto-Transfer', icon: 'savings', action: 'setup_auto_save' },
                    { id: 'adjust_goal', label: 'Adjust Goals', icon: 'tune', action: 'goal_settings' }
                ]
            };
        }
        if (lowerMessage.includes('spend') || lowerMessage.includes('expense') || lowerMessage.includes('analysis')) {
            return {
                id: messageId,
                type: 'assistant',
                content: `Your spending patterns show strong professional investment. Professional services increased 15% this quarter, mainly from your Adobe subscription and WeWork membership.

This aligns with your business development goals. However, I notice travel expenses up 25% - great for networking, but let's ensure it fits your Europe trip budget.`,
                timestamp: new Date(),
                insights: [
                    {
                        type: 'spending_pattern',
                        title: 'Professional Investment Rising',
                        description: 'Tools and workspace spending up 15%',
                        impact: 'neutral',
                        value: 'R1,200/month'
                    }
                ],
                actions: [
                    { id: 'spending_breakdown', label: 'Detailed Breakdown', icon: 'analytics', action: 'spending_analysis' },
                    { id: 'budget_alerts', label: 'Set Budget Alerts', icon: 'notification_important', action: 'budget_setup' }
                ]
            };
        }
        if (lowerMessage.includes('business') || lowerMessage.includes('entrepreneur') || lowerMessage.includes('startup')) {
            return {
                id: messageId,
                type: 'assistant',
                content: `Your business capital goal shows great planning! I found upcoming events that align with your fintech interests:

• "AI in Finance" workshop this Thursday at Sandton
• SME Growth Summit next week (R350, but I can check if your Life+ membership covers it)

Your recent WeWork expenses suggest you're actively networking - these events could accelerate your connections.`,
                timestamp: new Date(),
                insights: [
                    {
                        type: 'business_opportunity',
                        title: 'Networking ROI',
                        description: 'WeWork + events = 3x connection growth',
                        impact: 'positive',
                        value: '15 new contacts'
                    }
                ],
                actions: [
                    { id: 'register_event', label: 'Register for AI Event', icon: 'event', action: 'event_register' },
                    { id: 'sme_workshop', label: 'Join SME Summit', icon: 'business_center', action: 'sme_register' }
                ],
                attachments: [
                    {
                        type: 'event_invite',
                        title: 'AI in Finance Workshop',
                        subtitle: 'Thursday, Sandton • Free with Life+',
                        action: 'Register'
                    }
                ]
            };
        }
        // Default contextual response
        return {
            id: messageId,
            type: 'assistant',
            content: `Hi ${context.name}! I'm analyzing your recent activity and I see some interesting patterns.

Your Kenya Airways booking suggests exciting plans ahead. With USD rates favorable today, this might be perfect timing for travel preparation.

I'm also noticing consistent professional tool investments - Adobe, WeWork - which shows great business development focus. How can I help optimize your financial strategy today?`,
            timestamp: new Date(),
            actions: [
                { id: 'travel_prep', label: 'Travel Money Setup', icon: 'flight', action: 'travel_prepare' },
                { id: 'business_review', label: 'Business Finance Review', icon: 'business_center', action: 'business_analysis' },
                { id: 'savings_optimize', label: 'Optimize Savings', icon: 'trending_up', action: 'savings_review' }
            ]
        };
    },
    getConversationHistory: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return [
            {
                id: 'welcome',
                type: 'assistant',
                content: `Welcome back, Kabelo! I've been monitoring your financial activity and have some insights to share.

Your recent Kenya Airways booking caught my attention - shall we prepare your travel finances? Also, I noticed some great FX opportunities today.`,
                timestamp: new Date(Date.now() - 3600000), // 1 hour ago
                actions: [
                    { id: 'travel_money', label: 'Travel Money', icon: 'flight', action: 'travel_setup' },
                    { id: 'fx_opportunities', label: 'FX Opportunities', icon: 'trending_down', action: 'fx_review' }
                ]
            }
        ];
    }
};
export default function Concierge() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [userContext, setUserContext] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        loadInitialData();
    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [context, history] = await Promise.all([
                conciergeAPI.getUserContext(),
                conciergeAPI.getConversationHistory()
            ]);
            setUserContext(context);
            setMessages(history);
        }
        catch (error) {
            console.error('Failed to load concierge data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const sendMessage = async () => {
        if (!inputValue.trim() || !userContext || isTyping)
            return;
        const userMessage = {
            id: `user_${Date.now()}`,
            type: 'user',
            content: inputValue.trim(),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        try {
            const response = await conciergeAPI.sendMessage(inputValue.trim(), userContext);
            setMessages(prev => [...prev, response]);
        }
        catch (error) {
            console.error('Failed to send message:', error);
            // Add error message
            const errorMessage = {
                id: `error_${Date.now()}`,
                type: 'assistant',
                content: 'I apologize, but I encountered an issue. Please try again in a moment.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsTyping(false);
        }
    };
    const handleQuickAction = (action) => {
        // Simulate action responses
        const actionMessage = {
            id: `action_${Date.now()}`,
            type: 'assistant',
            content: `I've initiated "${action.label}" for you. This action would normally integrate with your banking services. You should see the changes reflected in your Smart Money Hub shortly.`,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, actionMessage]);
    };
    const quickSuggestions = [
        { text: "What's my spending pattern this month?", icon: "analytics" },
        { text: "Should I convert dollars now?", icon: "currency_exchange" },
        { text: "How are my savings goals?", icon: "savings" },
        { text: "Any business networking events?", icon: "business_center" }
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
                            } }), _jsx("p", { children: "Initializing your AI Concierge..." })] }), _jsx("style", { children: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        ` })] }));
    }
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            background: '#1a1a1a',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column'
        }, children: [_jsx("header", { style: {
                    padding: '20px',
                    borderBottom: '1px solid #333',
                    background: '#2a2a2a'
                }, children: _jsxs("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }, children: [_jsx("div", { style: {
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }, children: _jsx("img", { src: "/absa-logo-red-bg.svg", alt: "ABSA Logo", style: {
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%'
                                } }) }), _jsxs("div", { children: [_jsx("h1", { style: {
                                        fontSize: '20px',
                                        fontWeight: '700',
                                        margin: 0,
                                        marginBottom: '2px'
                                    }, children: "Your AI Concierge" }), _jsx("p", { style: {
                                        margin: 0,
                                        fontSize: '14px',
                                        color: '#999'
                                    }, children: "Banking & Life Assistant \u2022 Online" })] }), _jsx("div", { style: {
                                marginLeft: 'auto',
                                display: 'flex',
                                gap: '8px'
                            }, children: _jsx("div", { style: {
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: '#4CAF50'
                                } }) })] }) }), _jsxs("div", { style: {
                    flex: 1,
                    padding: '20px',
                    overflowY: 'auto',
                    paddingBottom: '120px'
                }, children: [messages.map((message) => (_jsx("div", { style: {
                            marginBottom: '24px',
                            display: 'flex',
                            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                        }, children: _jsxs("div", { style: {
                                maxWidth: '85%',
                                display: 'flex',
                                gap: '12px',
                                flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                            }, children: [_jsx("div", { style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: message.type === 'user'
                                            ? 'linear-gradient(135deg, #333 0%, #666 100%)'
                                            : 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                            fontSize: '20px',
                                            color: '#fff'
                                        }, children: message.type === 'user' ? 'person' : 'assistant' }) }), _jsxs("div", { style: {
                                        background: message.type === 'user' ? '#333' : '#2a2a2a',
                                        borderRadius: '16px',
                                        padding: '16px',
                                        border: message.type === 'assistant' ? '1px solid #444' : 'none'
                                    }, children: [_jsx("p", { style: {
                                                margin: 0,
                                                lineHeight: 1.5,
                                                whiteSpace: 'pre-line'
                                            }, children: message.content }), _jsx("p", { style: {
                                                margin: '12px 0 0 0',
                                                fontSize: '12px',
                                                color: '#666'
                                            }, children: message.timestamp.toLocaleTimeString('en-ZA', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) }), message.insights && message.insights.length > 0 && (_jsx("div", { style: {
                                                marginTop: '16px',
                                                display: 'grid',
                                                gap: '8px'
                                            }, children: message.insights.map((insight, index) => (_jsxs("div", { style: {
                                                    background: '#333',
                                                    borderRadius: '8px',
                                                    padding: '12px',
                                                    borderLeft: `3px solid ${insight.impact === 'positive' ? '#4CAF50' :
                                                        insight.impact === 'attention' ? '#FF9800' : '#666'}`
                                                }, children: [_jsxs("div", { style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginBottom: '4px'
                                                        }, children: [_jsx("span", { style: {
                                                                    fontSize: '14px',
                                                                    fontWeight: '600'
                                                                }, children: insight.title }), insight.value && (_jsx("span", { style: {
                                                                    fontSize: '12px',
                                                                    color: insight.impact === 'positive' ? '#4CAF50' : '#ccc'
                                                                }, children: insight.value }))] }), _jsx("p", { style: {
                                                            margin: 0,
                                                            fontSize: '13px',
                                                            color: '#ccc'
                                                        }, children: insight.description })] }, index))) })), message.attachments && message.attachments.length > 0 && (_jsx("div", { style: {
                                                marginTop: '16px',
                                                display: 'grid',
                                                gap: '8px'
                                            }, children: message.attachments.map((attachment, index) => (_jsxs("div", { style: {
                                                    background: '#444',
                                                    borderRadius: '8px',
                                                    padding: '12px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center'
                                                }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                                    margin: 0,
                                                                    fontSize: '14px',
                                                                    fontWeight: '600',
                                                                    marginBottom: '2px'
                                                                }, children: attachment.title }), attachment.subtitle && (_jsx("p", { style: {
                                                                    margin: 0,
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                }, children: attachment.subtitle }))] }), _jsxs("div", { style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px'
                                                        }, children: [attachment.value && (_jsx("span", { style: {
                                                                    fontSize: '16px',
                                                                    fontWeight: '700',
                                                                    color: '#4CAF50'
                                                                }, children: attachment.value })), attachment.action && (_jsx("button", { style: {
                                                                    background: '#C41E3A',
                                                                    border: 'none',
                                                                    borderRadius: '4px',
                                                                    padding: '6px 12px',
                                                                    color: '#fff',
                                                                    fontSize: '12px',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer'
                                                                }, children: attachment.action }))] })] }, index))) })), message.actions && message.actions.length > 0 && (_jsx("div", { style: {
                                                marginTop: '16px',
                                                display: 'flex',
                                                gap: '8px',
                                                flexWrap: 'wrap'
                                            }, children: message.actions.map((action) => (_jsxs("button", { onClick: () => handleQuickAction(action), style: {
                                                    background: '#C41E3A',
                                                    border: 'none',
                                                    borderRadius: '20px',
                                                    padding: '8px 16px',
                                                    color: '#fff',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'background 0.2s ease'
                                                }, onMouseEnter: (e) => e.currentTarget.style.background = '#A91E34', onMouseLeave: (e) => e.currentTarget.style.background = '#C41E3A', children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: action.icon }), action.label] }, action.id))) }))] })] }) }, message.id))), isTyping && (_jsx("div", { style: {
                            marginBottom: '24px',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }, children: _jsxs("div", { style: {
                                display: 'flex',
                                gap: '12px'
                            }, children: [_jsx("div", { style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #C41E3A 0%, #E91E63 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                            fontSize: '20px',
                                            color: '#fff'
                                        }, children: "assistant" }) }), _jsx("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '16px',
                                        padding: '16px',
                                        border: '1px solid #444'
                                    }, children: _jsxs("div", { style: {
                                            display: 'flex',
                                            gap: '4px',
                                            alignItems: 'center'
                                        }, children: [_jsx("div", { style: {
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: '#666',
                                                    animation: 'typing 1.4s infinite ease-in-out'
                                                } }), _jsx("div", { style: {
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: '#666',
                                                    animation: 'typing 1.4s infinite ease-in-out 0.2s'
                                                } }), _jsx("div", { style: {
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: '#666',
                                                    animation: 'typing 1.4s infinite ease-in-out 0.4s'
                                                } })] }) })] }) })), _jsx("div", { ref: messagesEndRef })] }), messages.length <= 1 && (_jsx("div", { style: {
                    position: 'fixed',
                    bottom: '140px',
                    left: '20px',
                    right: '20px',
                    zIndex: 10
                }, children: _jsx("div", { style: {
                        display: 'flex',
                        gap: '8px',
                        overflowX: 'auto',
                        paddingBottom: '8px'
                    }, children: quickSuggestions.map((suggestion, index) => (_jsxs("button", { onClick: () => setInputValue(suggestion.text), style: {
                            background: '#333',
                            border: '1px solid #555',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            color: '#fff',
                            fontSize: '14px',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: suggestion.icon }), suggestion.text] }, index))) }) })), _jsxs("div", { style: {
                    position: 'fixed',
                    bottom: '80px',
                    left: '20px',
                    right: '20px',
                    background: '#2a2a2a',
                    borderRadius: '24px',
                    border: '1px solid #444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 20px',
                    zIndex: 100
                }, children: [_jsx("input", { type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: (e) => e.key === 'Enter' && sendMessage(), placeholder: "Ask your AI Concierge anything...", style: {
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#fff',
                            fontSize: '16px'
                        }, disabled: isTyping }), _jsx("button", { onClick: sendMessage, disabled: !inputValue.trim() || isTyping, style: {
                            background: !inputValue.trim() || isTyping ? '#666' : '#C41E3A',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: !inputValue.trim() || isTyping ? 'not-allowed' : 'pointer'
                        }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                fontSize: '20px',
                                color: '#fff'
                            }, children: "send" }) })] }), _jsx("style", { children: `
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      ` }), _jsx(BottomNav, {})] }));
}
