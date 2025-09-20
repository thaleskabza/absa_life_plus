import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/Quiz.tsx - Financial Literacy & Learning Paths
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";
// Financial Literacy Question Bank (sourced from public financial education resources)
const QUESTION_BANK = [
    {
        id: 'q1',
        category: 'budgeting',
        difficulty: 'beginner',
        question: 'What is the recommended percentage of your income to save each month?',
        options: ['5%', '10%', '20%', '30%'],
        correctAnswer: 2,
        explanation: 'Financial experts recommend saving at least 20% of your income - 10% for retirement and 10% for emergency fund and other goals.',
        source: 'Financial Planning Association of South Africa',
        tags: ['saving', 'budgeting', 'emergency_fund']
    },
    {
        id: 'q2',
        category: 'budgeting',
        difficulty: 'intermediate',
        question: 'For someone with variable income (like freelancers), what budgeting approach works best?',
        options: ['Fixed monthly budget', 'Percentage-based budget', 'Zero-based budget', 'Pay-yourself-first budget'],
        correctAnswer: 1,
        explanation: 'Percentage-based budgeting works best for variable income. Allocate percentages (e.g., 50% needs, 30% wants, 20% savings) rather than fixed amounts.',
        source: 'National Endowment for Financial Education',
        tags: ['variable_income', 'freelancer', 'budgeting_methods']
    },
    {
        id: 'q3',
        category: 'investing',
        difficulty: 'beginner',
        question: 'What is compound interest?',
        options: ['Interest paid only on the principal', 'Interest paid on both principal and accumulated interest', 'A type of loan', 'A government bond'],
        correctAnswer: 1,
        explanation: 'Compound interest means earning interest on both your initial investment and previously earned interest. It\'s often called "interest on interest" and is key to long-term wealth building.',
        source: 'South African Reserve Bank Financial Education',
        tags: ['compound_interest', 'investing_basics', 'wealth_building']
    },
    {
        id: 'q4',
        category: 'investing',
        difficulty: 'intermediate',
        question: 'Which investment principle helps reduce risk through spreading investments?',
        options: ['Dollar-cost averaging', 'Diversification', 'Value investing', 'Day trading'],
        correctAnswer: 1,
        explanation: 'Diversification means spreading investments across different asset classes, industries, and geographic regions to reduce overall portfolio risk.',
        source: 'JSE Investor Education',
        tags: ['diversification', 'risk_management', 'portfolio']
    },
    {
        id: 'q5',
        category: 'credit',
        difficulty: 'beginner',
        question: 'What is a good credit utilization ratio to maintain?',
        options: ['90%', '50%', '30%', '10%'],
        correctAnswer: 2,
        explanation: 'Keep credit utilization below 30% of your available credit limit. Lower utilization (under 10%) is even better for your credit score.',
        source: 'National Credit Regulator South Africa',
        tags: ['credit_score', 'credit_utilization', 'debt_management']
    },
    {
        id: 'q6',
        category: 'business',
        difficulty: 'intermediate',
        question: 'What is the main advantage of separating personal and business finances?',
        options: ['Better tax deductions', 'Clearer financial tracking', 'Legal protection', 'All of the above'],
        correctAnswer: 3,
        explanation: 'Separating finances provides better tax deductions, clearer tracking of business performance, and legal protection by maintaining the corporate veil.',
        source: 'Small Enterprise Development Agency (SEDA)',
        tags: ['business_finance', 'tax_planning', 'legal_structure']
    },
    {
        id: 'q7',
        category: 'insurance',
        difficulty: 'beginner',
        question: 'What type of insurance should young professionals prioritize first?',
        options: ['Life insurance', 'Disability insurance', 'Health insurance', 'Car insurance'],
        correctAnswer: 2,
        explanation: 'Health insurance should be the first priority as medical costs can be devastating. Disability insurance is also crucial as you\'re more likely to become disabled than die young.',
        source: 'Financial Services Board South Africa',
        tags: ['insurance_priorities', 'health_insurance', 'risk_management']
    },
    {
        id: 'q8',
        category: 'tax',
        difficulty: 'intermediate',
        question: 'What is the annual tax-free savings account limit in South Africa (2025)?',
        options: ['R30,000', 'R36,000', 'R40,000', 'R50,000'],
        correctAnswer: 1,
        explanation: 'The annual TFSA contribution limit is R36,000 per tax year. This allows tax-free growth and withdrawals, making it excellent for long-term savings.',
        source: 'South African Revenue Service (SARS)',
        tags: ['tfsa', 'tax_planning', 'savings_accounts']
    },
    {
        id: 'q9',
        category: 'business',
        difficulty: 'advanced',
        question: 'What is working capital and why is it important for businesses?',
        options: ['Money for equipment', 'Current assets minus current liabilities', 'Annual profit', 'Investment capital'],
        correctAnswer: 1,
        explanation: 'Working capital (current assets - current liabilities) measures a company\'s short-term financial health and ability to pay immediate obligations.',
        source: 'University of Cape Town Business School',
        tags: ['working_capital', 'cash_flow', 'business_finance']
    },
    {
        id: 'q10',
        category: 'retirement',
        difficulty: 'beginner',
        question: 'At what age can you access your retirement annuity in South Africa?',
        options: ['55', '60', '65', '70'],
        correctAnswer: 0,
        explanation: 'You can access retirement annuity funds from age 55, but only up to one-third as a lump sum. The rest must purchase an annuity for regular income.',
        source: 'Association for Savings and Investment South Africa',
        tags: ['retirement_planning', 'retirement_annuity', 'pension_funds']
    }
];
// Mock Quiz API
const quizAPI = {
    getUserProgress: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Load from localStorage or return default
        const stored = localStorage.getItem('quiz_progress');
        if (stored) {
            return JSON.parse(stored);
        }
        return {
            totalQuestions: 0,
            correctAnswers: 0,
            categoryScores: {},
            completedAssessments: [],
            currentLevel: 'beginner',
            strengths: [],
            weakAreas: [],
            lastActivity: new Date().toISOString()
        };
    },
    saveUserProgress: async (progress) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        localStorage.setItem('quiz_progress', JSON.stringify(progress));
    },
    getQuestionsByLevel: async (level, category) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        let filtered = QUESTION_BANK.filter(q => q.difficulty === level);
        if (category && category !== 'all') {
            filtered = filtered.filter(q => q.category === category);
        }
        // Randomize order
        return filtered.sort(() => Math.random() - 0.5).slice(0, 5);
    },
    getPersonalizedLearningPaths: async (progress) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return [
            {
                id: 'path1',
                title: 'Variable Income Mastery',
                description: 'Master budgeting and financial planning for freelancers and entrepreneurs',
                difficulty: 'intermediate',
                estimatedTime: '2 weeks',
                modules: [
                    {
                        id: 'm1',
                        title: 'Understanding Variable Income',
                        type: 'reading',
                        duration: '15 min',
                        content: 'Learn the fundamentals of managing irregular income streams',
                        completed: false
                    },
                    {
                        id: 'm2',
                        title: 'Percentage-Based Budgeting',
                        type: 'interactive',
                        duration: '20 min',
                        completed: false
                    },
                    {
                        id: 'm3',
                        title: 'Emergency Fund Strategy',
                        type: 'quiz',
                        duration: '10 min',
                        completed: false
                    },
                    {
                        id: 'm4',
                        title: 'Tax Planning for Freelancers',
                        type: 'mentor_session',
                        duration: '45 min',
                        completed: false
                    }
                ],
                prerequisites: ['Basic budgeting knowledge'],
                outcomes: ['Create a variable income budget', 'Build appropriate emergency fund', 'Optimize tax strategy'],
                relevanceScore: 95
            },
            {
                id: 'path2',
                title: 'Investment Fundamentals',
                description: 'Build wealth through smart investing strategies',
                difficulty: 'beginner',
                estimatedTime: '3 weeks',
                modules: [
                    {
                        id: 'm5',
                        title: 'Investment Basics',
                        type: 'video',
                        duration: '25 min',
                        completed: false
                    },
                    {
                        id: 'm6',
                        title: 'Risk and Diversification',
                        type: 'interactive',
                        duration: '30 min',
                        completed: false
                    },
                    {
                        id: 'm7',
                        title: 'JSE and ETF Basics',
                        type: 'reading',
                        duration: '20 min',
                        completed: false
                    }
                ],
                prerequisites: [],
                outcomes: ['Understand investment types', 'Create diversified portfolio', 'Start investing journey'],
                relevanceScore: 88
            },
            {
                id: 'path3',
                title: 'Business Finance Essentials',
                description: 'Financial management for entrepreneurs and business owners',
                difficulty: 'advanced',
                estimatedTime: '4 weeks',
                modules: [
                    {
                        id: 'm8',
                        title: 'Business Financial Statements',
                        type: 'reading',
                        duration: '35 min',
                        completed: false
                    },
                    {
                        id: 'm9',
                        title: 'Cash Flow Management',
                        type: 'interactive',
                        duration: '40 min',
                        completed: false
                    },
                    {
                        id: 'm10',
                        title: 'Fundraising Strategies',
                        type: 'mentor_session',
                        duration: '60 min',
                        completed: false
                    }
                ],
                prerequisites: ['Basic business knowledge'],
                outcomes: ['Read financial statements', 'Manage business cash flow', 'Understand funding options'],
                relevanceScore: 92
            }
        ];
    },
    getAchievements: async (progress) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [
            {
                id: 'ach1',
                title: 'First Steps',
                description: 'Complete your first financial literacy quiz',
                icon: 'emoji_events',
                category: 'milestone',
                unlockedAt: progress.totalQuestions > 0 ? new Date().toISOString() : undefined,
                progress: Math.min(progress.totalQuestions, 1),
                target: 1
            },
            {
                id: 'ach2',
                title: 'Knowledge Seeker',
                description: 'Answer 50 questions correctly',
                icon: 'school',
                category: 'progress',
                progress: progress.correctAnswers,
                target: 50
            },
            {
                id: 'ach3',
                title: 'Budget Master',
                description: 'Perfect score on budgeting category',
                icon: 'account_balance',
                category: 'expertise',
                progress: progress.categoryScores.budgeting?.correct || 0,
                target: 5
            },
            {
                id: 'ach4',
                title: 'Investment Savvy',
                description: 'Complete investment learning path',
                icon: 'trending_up',
                category: 'learning',
                progress: 0,
                target: 1
            }
        ];
    }
};
export default function Quiz() {
    const [userProgress, setUserProgress] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [learningPaths, setLearningPaths] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('quiz');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
    const [quizInProgress, setQuizInProgress] = useState(false);
    useEffect(() => {
        loadInitialData();
    }, []);
    const loadInitialData = async () => {
        try {
            setLoading(true);
            const progress = await quizAPI.getUserProgress();
            const [paths, achs] = await Promise.all([
                quizAPI.getPersonalizedLearningPaths(progress),
                quizAPI.getAchievements(progress)
            ]);
            setUserProgress(progress);
            setLearningPaths(paths);
            setAchievements(achs);
        }
        catch (error) {
            console.error('Failed to load quiz data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const startQuiz = async () => {
        if (!userProgress)
            return;
        try {
            const questions = await quizAPI.getQuestionsByLevel(selectedDifficulty, selectedCategory);
            setCurrentQuiz(questions);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setQuizComplete(false);
            setQuizInProgress(true);
        }
        catch (error) {
            console.error('Failed to start quiz:', error);
        }
    };
    const handleAnswerSelect = (answerIndex) => {
        if (showExplanation)
            return;
        setSelectedAnswer(answerIndex);
    };
    const submitAnswer = async () => {
        if (selectedAnswer === null || !userProgress)
            return;
        const currentQuestion = currentQuiz[currentQuestionIndex];
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        // Update progress
        const newProgress = {
            ...userProgress,
            totalQuestions: userProgress.totalQuestions + 1,
            correctAnswers: userProgress.correctAnswers + (isCorrect ? 1 : 0),
            categoryScores: {
                ...userProgress.categoryScores,
                [currentQuestion.category]: {
                    correct: (userProgress.categoryScores[currentQuestion.category]?.correct || 0) + (isCorrect ? 1 : 0),
                    total: (userProgress.categoryScores[currentQuestion.category]?.total || 0) + 1
                }
            },
            lastActivity: new Date().toISOString()
        };
        setUserProgress(newProgress);
        await quizAPI.saveUserProgress(newProgress);
        setShowExplanation(true);
    };
    const nextQuestion = () => {
        if (currentQuestionIndex < currentQuiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
        else {
            setQuizComplete(true);
            setQuizInProgress(false);
        }
    };
    const getScoreColor = (score) => {
        if (score >= 80)
            return '#4CAF50';
        if (score >= 60)
            return '#FF9800';
        return '#f44336';
    };
    const categories = [
        { id: 'all', label: 'All Topics', icon: 'quiz' },
        { id: 'budgeting', label: 'Budgeting', icon: 'account_balance' },
        { id: 'investing', label: 'Investing', icon: 'trending_up' },
        { id: 'credit', label: 'Credit', icon: 'credit_card' },
        { id: 'business', label: 'Business', icon: 'business_center' },
        { id: 'insurance', label: 'Insurance', icon: 'security' },
        { id: 'tax', label: 'Tax', icon: 'receipt' },
        { id: 'retirement', label: 'Retirement', icon: 'savings' }
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
                            } }), _jsx("p", { children: "Loading your learning dashboard..." })] }), _jsx("style", { children: `
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
                                        }, children: "Financial Literacy" }), _jsx("p", { style: {
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#999'
                                        }, children: "Build your financial knowledge step by step" })] }), _jsx("div", { style: {
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
                            gap: '8px'
                        }, children: [
                            { id: 'quiz', label: 'Take Quiz', icon: 'quiz' },
                            { id: 'learn', label: 'Learning Paths', icon: 'school' },
                            { id: 'progress', label: 'Progress', icon: 'analytics' }
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
                            }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: tab.icon }), tab.label] }, tab.id))) })] }), _jsxs("main", { style: { padding: '20px', paddingBottom: '100px' }, children: [activeTab === 'quiz' && !quizInProgress && (_jsxs("div", { children: [_jsxs("div", { style: {
                                    background: '#2a2a2a',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    marginBottom: '24px'
                                }, children: [_jsx("h3", { style: {
                                            fontSize: '18px',
                                            fontWeight: '600',
                                            marginBottom: '12px'
                                        }, children: "Quick Assessment" }), _jsx("p", { style: {
                                            fontSize: '14px',
                                            color: '#ccc',
                                            marginBottom: '20px'
                                        }, children: "Test your financial knowledge and get personalized learning recommendations" }), _jsxs("div", { style: {
                                            display: 'grid',
                                            gap: '16px',
                                            marginBottom: '20px'
                                        }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                            fontSize: '14px',
                                                            marginBottom: '8px',
                                                            color: '#ccc'
                                                        }, children: "Choose Topic" }), _jsx("div", { style: {
                                                            display: 'flex',
                                                            gap: '8px',
                                                            overflowX: 'auto',
                                                            paddingBottom: '4px'
                                                        }, children: categories.slice(0, 4).map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), style: {
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
                                                            }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: category.icon }), category.label] }, category.id))) })] }), _jsxs("div", { children: [_jsx("p", { style: {
                                                            fontSize: '14px',
                                                            marginBottom: '8px',
                                                            color: '#ccc'
                                                        }, children: "Difficulty Level" }), _jsx("div", { style: {
                                                            display: 'flex',
                                                            gap: '8px'
                                                        }, children: ['beginner', 'intermediate', 'advanced'].map((level) => (_jsx("button", { onClick: () => setSelectedDifficulty(level), style: {
                                                                padding: '8px 16px',
                                                                borderRadius: '20px',
                                                                border: 'none',
                                                                background: selectedDifficulty === level ? '#C41E3A' : '#333',
                                                                color: '#fff',
                                                                fontSize: '14px',
                                                                fontWeight: '500',
                                                                cursor: 'pointer',
                                                                textTransform: 'capitalize'
                                                            }, children: level }, level))) })] })] }), _jsxs("button", { onClick: startQuiz, style: {
                                            width: '100%',
                                            background: '#4CAF50',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '16px',
                                            color: '#fff',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '20px' }, children: "play_arrow" }), "Start Quiz (5 Questions)"] })] }), userProgress && userProgress.totalQuestions > 0 && (_jsxs("div", { style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: '12px',
                                    marginBottom: '24px'
                                }, children: [_jsxs("div", { style: {
                                            background: '#2a2a2a',
                                            borderRadius: '12px',
                                            padding: '16px',
                                            textAlign: 'center'
                                        }, children: [_jsxs("p", { style: {
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    margin: 0,
                                                    color: '#4CAF50'
                                                }, children: [Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100), "%"] }), _jsx("p", { style: {
                                                    fontSize: '12px',
                                                    color: '#999',
                                                    margin: 0
                                                }, children: "Overall Score" })] }), _jsxs("div", { style: {
                                            background: '#2a2a2a',
                                            borderRadius: '12px',
                                            padding: '16px',
                                            textAlign: 'center'
                                        }, children: [_jsx("p", { style: {
                                                    fontSize: '24px',
                                                    fontWeight: '700',
                                                    margin: 0,
                                                    color: '#2196F3'
                                                }, children: userProgress.totalQuestions }), _jsx("p", { style: {
                                                    fontSize: '12px',
                                                    color: '#999',
                                                    margin: 0
                                                }, children: "Questions Answered" })] })] }))] })), quizInProgress && !quizComplete && (_jsxs("div", { style: {
                            background: '#2a2a2a',
                            borderRadius: '16px',
                            padding: '24px'
                        }, children: [_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }, children: [_jsxs("span", { style: {
                                            fontSize: '14px',
                                            color: '#999'
                                        }, children: ["Question ", currentQuestionIndex + 1, " of ", currentQuiz.length] }), _jsx("div", { style: {
                                            background: '#333',
                                            borderRadius: '8px',
                                            padding: '4px 12px',
                                            fontSize: '12px',
                                            color: '#ccc',
                                            textTransform: 'capitalize'
                                        }, children: currentQuiz[currentQuestionIndex]?.difficulty })] }), _jsx("div", { style: {
                                    background: '#444',
                                    borderRadius: '8px',
                                    height: '4px',
                                    marginBottom: '24px'
                                }, children: _jsx("div", { style: {
                                        background: '#C41E3A',
                                        borderRadius: '8px',
                                        height: '100%',
                                        width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%`,
                                        transition: 'width 0.3s ease'
                                    } }) }), currentQuiz[currentQuestionIndex] && (_jsxs(_Fragment, { children: [_jsx("h3", { style: {
                                            fontSize: '20px',
                                            fontWeight: '600',
                                            marginBottom: '24px',
                                            lineHeight: 1.4
                                        }, children: currentQuiz[currentQuestionIndex].question }), _jsx("div", { style: {
                                            display: 'grid',
                                            gap: '12px',
                                            marginBottom: '24px'
                                        }, children: currentQuiz[currentQuestionIndex].options.map((option, index) => (_jsx("button", { onClick: () => handleAnswerSelect(index), disabled: showExplanation, style: {
                                                padding: '16px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: showExplanation
                                                    ? index === currentQuiz[currentQuestionIndex].correctAnswer
                                                        ? '#4CAF50'
                                                        : selectedAnswer === index
                                                            ? '#f44336'
                                                            : '#333'
                                                    : selectedAnswer === index
                                                        ? '#C41E3A'
                                                        : '#333',
                                                color: '#fff',
                                                fontSize: '16px',
                                                textAlign: 'left',
                                                cursor: showExplanation ? 'default' : 'pointer',
                                                transition: 'all 0.2s ease'
                                            }, children: _jsxs("div", { style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px'
                                                }, children: [_jsxs("div", { style: {
                                                            width: '24px',
                                                            height: '24px',
                                                            borderRadius: '50%',
                                                            background: showExplanation
                                                                ? index === currentQuiz[currentQuestionIndex].correctAnswer
                                                                    ? '#fff'
                                                                    : selectedAnswer === index
                                                                        ? '#fff'
                                                                        : 'transparent'
                                                                : selectedAnswer === index
                                                                    ? '#fff'
                                                                    : 'transparent',
                                                            border: '2px solid #666',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            flexShrink: 0
                                                        }, children: [showExplanation && index === currentQuiz[currentQuestionIndex].correctAnswer && (_jsx("span", { className: "material-icons-outlined", style: {
                                                                    fontSize: '16px',
                                                                    color: '#4CAF50'
                                                                }, children: "check" })), showExplanation && selectedAnswer === index && index !== currentQuiz[currentQuestionIndex].correctAnswer && (_jsx("span", { className: "material-icons-outlined", style: {
                                                                    fontSize: '16px',
                                                                    color: '#f44336'
                                                                }, children: "close" }))] }), option] }) }, index))) }), showExplanation && (_jsxs("div", { style: {
                                            background: '#333',
                                            borderRadius: '12px',
                                            padding: '16px',
                                            marginBottom: '24px'
                                        }, children: [_jsx("h4", { style: {
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    marginBottom: '8px',
                                                    color: selectedAnswer === currentQuiz[currentQuestionIndex].correctAnswer ? '#4CAF50' : '#FF9800'
                                                }, children: selectedAnswer === currentQuiz[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not quite right' }), _jsx("p", { style: {
                                                    fontSize: '14px',
                                                    color: '#ccc',
                                                    marginBottom: '12px',
                                                    lineHeight: 1.5
                                                }, children: currentQuiz[currentQuestionIndex].explanation }), _jsxs("p", { style: {
                                                    fontSize: '12px',
                                                    color: '#666',
                                                    margin: 0
                                                }, children: ["Source: ", currentQuiz[currentQuestionIndex].source] })] })), _jsx("div", { style: {
                                            display: 'flex',
                                            gap: '12px'
                                        }, children: !showExplanation ? (_jsx("button", { onClick: submitAnswer, disabled: selectedAnswer === null, style: {
                                                flex: 1,
                                                background: selectedAnswer !== null ? '#4CAF50' : '#666',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '14px',
                                                color: '#fff',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed'
                                            }, children: "Submit Answer" })) : (_jsx("button", { onClick: nextQuestion, style: {
                                                flex: 1,
                                                background: '#C41E3A',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '14px',
                                                color: '#fff',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }, children: currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz' })) })] }))] })), quizComplete && (_jsxs("div", { style: {
                            background: '#2a2a2a',
                            borderRadius: '16px',
                            padding: '24px',
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
                                    }, children: "emoji_events" }) }), _jsx("h3", { style: {
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    marginBottom: '12px'
                                }, children: "Quiz Complete!" }), _jsxs("p", { style: {
                                    fontSize: '16px',
                                    color: '#ccc',
                                    marginBottom: '24px'
                                }, children: ["You scored ", userProgress ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100) : 0, "% on this ", selectedDifficulty, " level quiz"] }), _jsxs("div", { style: {
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center'
                                }, children: [_jsx("button", { onClick: () => {
                                            setQuizComplete(false);
                                            setQuizInProgress(false);
                                        }, style: {
                                            background: '#333',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '12px 24px',
                                            color: '#fff',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }, children: "Take Another Quiz" }), _jsx("button", { onClick: () => setActiveTab('learn'), style: {
                                            background: '#C41E3A',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '12px 24px',
                                            color: '#fff',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }, children: "Explore Learning Paths" })] })] })), activeTab === 'learn' && (_jsxs("div", { children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: "Personalized Learning Paths" }), _jsx("div", { style: { display: 'grid', gap: '16px' }, children: learningPaths.map((path) => (_jsxs("div", { style: {
                                        background: '#2a2a2a',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        border: path.relevanceScore >= 90 ? '2px solid #C41E3A' : '1px solid #444'
                                    }, children: [_jsx("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: '12px'
                                            }, children: _jsxs("div", { children: [_jsx("h4", { style: {
                                                            fontSize: '18px',
                                                            fontWeight: '600',
                                                            margin: 0,
                                                            marginBottom: '4px'
                                                        }, children: path.title }), _jsxs("div", { style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            marginBottom: '8px'
                                                        }, children: [_jsx("span", { style: {
                                                                    background: path.difficulty === 'advanced' ? '#C41E3A' : path.difficulty === 'intermediate' ? '#FF9800' : '#4CAF50',
                                                                    borderRadius: '12px',
                                                                    padding: '4px 8px',
                                                                    fontSize: '12px',
                                                                    fontWeight: '600',
                                                                    color: '#fff',
                                                                    textTransform: 'capitalize'
                                                                }, children: path.difficulty }), _jsx("span", { style: {
                                                                    fontSize: '12px',
                                                                    color: '#999'
                                                                }, children: path.estimatedTime }), _jsxs("span", { style: {
                                                                    background: path.relevanceScore >= 90 ? '#4CAF50' : '#FF9800',
                                                                    borderRadius: '12px',
                                                                    padding: '4px 8px',
                                                                    fontSize: '12px',
                                                                    fontWeight: '600',
                                                                    color: '#000'
                                                                }, children: [path.relevanceScore, "% match"] })] })] }) }), _jsx("p", { style: {
                                                fontSize: '14px',
                                                color: '#ccc',
                                                marginBottom: '16px',
                                                lineHeight: 1.5
                                            }, children: path.description }), _jsxs("div", { style: {
                                                display: 'grid',
                                                gap: '8px',
                                                marginBottom: '16px'
                                            }, children: [_jsxs("h5", { style: {
                                                        fontSize: '14px',
                                                        fontWeight: '600',
                                                        margin: 0,
                                                        color: '#ccc'
                                                    }, children: ["Learning Modules (", path.modules.length, ")"] }), path.modules.slice(0, 3).map((module, index) => (_jsxs("div", { style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        padding: '8px',
                                                        background: '#333',
                                                        borderRadius: '8px'
                                                    }, children: [_jsx("span", { className: "material-icons-outlined", style: {
                                                                fontSize: '16px',
                                                                color: module.type === 'mentor_session' ? '#C41E3A' :
                                                                    module.type === 'quiz' ? '#4CAF50' :
                                                                        module.type === 'video' ? '#2196F3' : '#FF9800'
                                                            }, children: module.type === 'mentor_session' ? 'school' :
                                                                module.type === 'quiz' ? 'quiz' :
                                                                    module.type === 'video' ? 'play_circle' : 'article' }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("p", { style: {
                                                                        fontSize: '14px',
                                                                        fontWeight: '500',
                                                                        margin: 0
                                                                    }, children: module.title }), _jsxs("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#666',
                                                                        margin: 0
                                                                    }, children: [module.duration, " \u2022 ", module.type.replace('_', ' ')] })] })] }, module.id))), path.modules.length > 3 && (_jsxs("p", { style: {
                                                        fontSize: '12px',
                                                        color: '#666',
                                                        margin: '4px 0 0 0',
                                                        textAlign: 'center'
                                                    }, children: ["+", path.modules.length - 3, " more modules"] }))] }), _jsx("button", { style: {
                                                width: '100%',
                                                background: '#C41E3A',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '12px',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }, children: "Start Learning Path" })] }, path.id))) })] })), activeTab === 'progress' && userProgress && (_jsxs("div", { children: [_jsx("h3", { style: {
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }, children: "Your Learning Progress" }), _jsx("div", { style: {
                                    background: '#2a2a2a',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    marginBottom: '24px'
                                }, children: _jsxs("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                        gap: '16px',
                                        marginBottom: '20px'
                                    }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsxs("p", { style: {
                                                        fontSize: '28px',
                                                        fontWeight: '700',
                                                        margin: 0,
                                                        color: '#4CAF50'
                                                    }, children: [Math.round((userProgress.correctAnswers / Math.max(userProgress.totalQuestions, 1)) * 100), "%"] }), _jsx("p", { style: {
                                                        fontSize: '12px',
                                                        color: '#999',
                                                        margin: 0
                                                    }, children: "Overall Score" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("p", { style: {
                                                        fontSize: '28px',
                                                        fontWeight: '700',
                                                        margin: 0,
                                                        color: '#2196F3'
                                                    }, children: userProgress.totalQuestions }), _jsx("p", { style: {
                                                        fontSize: '12px',
                                                        color: '#999',
                                                        margin: 0
                                                    }, children: "Questions Answered" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("p", { style: {
                                                        fontSize: '28px',
                                                        fontWeight: '700',
                                                        margin: 0,
                                                        color: '#FF9800',
                                                        textTransform: 'capitalize'
                                                    }, children: userProgress.currentLevel }), _jsx("p", { style: {
                                                        fontSize: '12px',
                                                        color: '#999',
                                                        margin: 0
                                                    }, children: "Current Level" })] })] }) }), Object.keys(userProgress.categoryScores).length > 0 && (_jsxs("div", { style: {
                                    background: '#2a2a2a',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    marginBottom: '24px'
                                }, children: [_jsx("h4", { style: {
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            marginBottom: '16px'
                                        }, children: "Performance by Category" }), _jsx("div", { style: { display: 'grid', gap: '12px' }, children: Object.entries(userProgress.categoryScores).map(([category, scores]) => {
                                            const percentage = Math.round((scores.correct / scores.total) * 100);
                                            return (_jsxs("div", { style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '12px',
                                                    background: '#333',
                                                    borderRadius: '8px'
                                                }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                                    fontSize: '14px',
                                                                    fontWeight: '500',
                                                                    margin: 0,
                                                                    textTransform: 'capitalize'
                                                                }, children: category.replace('_', ' ') }), _jsxs("p", { style: {
                                                                    fontSize: '12px',
                                                                    color: '#666',
                                                                    margin: 0
                                                                }, children: [scores.correct, "/", scores.total, " correct"] })] }), _jsxs("div", { style: {
                                                            fontSize: '16px',
                                                            fontWeight: '700',
                                                            color: getScoreColor(percentage)
                                                        }, children: [percentage, "%"] })] }, category));
                                        }) })] })), _jsxs("div", { style: {
                                    background: '#2a2a2a',
                                    borderRadius: '16px',
                                    padding: '20px'
                                }, children: [_jsx("h4", { style: {
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            marginBottom: '16px'
                                        }, children: "Achievements" }), _jsx("div", { style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: '12px'
                                        }, children: achievements.map((achievement) => (_jsxs("div", { style: {
                                                padding: '16px',
                                                background: achievement.progress >= achievement.target ? '#333' : '#2a2a2a',
                                                border: achievement.progress >= achievement.target ? '2px solid #4CAF50' : '1px solid #444',
                                                borderRadius: '12px',
                                                opacity: achievement.progress >= achievement.target ? 1 : 0.6
                                            }, children: [_jsxs("div", { style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                        marginBottom: '8px'
                                                    }, children: [_jsx("span", { className: "material-icons-outlined", style: {
                                                                fontSize: '24px',
                                                                color: achievement.progress >= achievement.target ? '#4CAF50' : '#666'
                                                            }, children: achievement.icon }), _jsxs("div", { children: [_jsx("p", { style: {
                                                                        fontSize: '14px',
                                                                        fontWeight: '600',
                                                                        margin: 0
                                                                    }, children: achievement.title }), _jsxs("p", { style: {
                                                                        fontSize: '12px',
                                                                        color: '#666',
                                                                        margin: 0
                                                                    }, children: [achievement.progress, "/", achievement.target] })] })] }), _jsx("p", { style: {
                                                        fontSize: '12px',
                                                        color: '#ccc',
                                                        margin: 0
                                                    }, children: achievement.description })] }, achievement.id))) })] })] }))] }), _jsx(BottomNav, {})] }));
}
