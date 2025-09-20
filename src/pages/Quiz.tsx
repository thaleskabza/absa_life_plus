// src/pages/Quiz.tsx - Financial Literacy & Learning Paths
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";

// Quiz and learning interfaces
interface QuizQuestion {
  id: string;
  category: 'budgeting' | 'investing' | 'credit' | 'insurance' | 'business' | 'tax' | 'retirement';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
  tags: string[];
}

interface UserProgress {
  totalQuestions: number;
  correctAnswers: number;
  categoryScores: Record<string, { correct: number; total: number }>;
  completedAssessments: string[];
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  strengths: string[];
  weakAreas: string[];
  lastActivity: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  modules: LearningModule[];
  prerequisites: string[];
  outcomes: string[];
  relevanceScore: number;
}

interface LearningModule {
  id: string;
  title: string;
  type: 'quiz' | 'reading' | 'video' | 'interactive' | 'mentor_session';
  duration: string;
  content?: string;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

// Financial Literacy Question Bank (sourced from public financial education resources)
const QUESTION_BANK: QuizQuestion[] = [
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
  getUserProgress: async (): Promise<UserProgress> => {
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

  saveUserProgress: async (progress: UserProgress): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    localStorage.setItem('quiz_progress', JSON.stringify(progress));
  },

  getQuestionsByLevel: async (level: string, category?: string): Promise<QuizQuestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    let filtered = QUESTION_BANK.filter(q => q.difficulty === level);
    if (category && category !== 'all') {
      filtered = filtered.filter(q => q.category === category);
    }

    // Randomize order
    return filtered.sort(() => Math.random() - 0.5).slice(0, 5);
  },

  getPersonalizedLearningPaths: async (progress: UserProgress): Promise<LearningPath[]> => {
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

  getAchievements: async (progress: UserProgress): Promise<Achievement[]> => {
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
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'quiz' | 'learn' | 'progress'>('quiz');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('beginner');
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
    } catch (error) {
      console.error('Failed to load quiz data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    if (!userProgress) return;

    try {
      const questions = await quizAPI.getQuestionsByLevel(selectedDifficulty, selectedCategory);
      setCurrentQuiz(questions);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setQuizComplete(false);
      setQuizInProgress(true);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = async () => {
    if (selectedAnswer === null || !userProgress) return;

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
    } else {
      setQuizComplete(true);
      setQuizInProgress(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
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
          <p>Loading your learning dashboard...</p>
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
              Financial Literacy
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#999'
            }}>
              Build your financial knowledge step by step
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

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          {[
            { id: 'quiz', label: 'Take Quiz', icon: 'quiz' },
            { id: 'learn', label: 'Learning Paths', icon: 'school' },
            { id: 'progress', label: 'Progress', icon: 'analytics' }
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
        {/* Quiz Tab */}
        {activeTab === 'quiz' && !quizInProgress && (
          <div>
            <div style={{
              background: '#2a2a2a',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Quick Assessment
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#ccc',
                marginBottom: '20px'
              }}>
                Test your financial knowledge and get personalized learning recommendations
              </p>

              <div style={{
                display: 'grid',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div>
                  <p style={{
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#ccc'
                  }}>
                    Choose Topic
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '4px'
                  }}>
                    {categories.slice(0, 4).map((category) => (
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
                </div>

                <div>
                  <p style={{
                    fontSize: '14px',
                    marginBottom: '8px',
                    color: '#ccc'
                  }}>
                    Difficulty Level
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: 'none',
                          background: selectedDifficulty === level ? '#C41E3A' : '#333',
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          textTransform: 'capitalize'
                        }}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={startQuiz}
                style={{
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
                }}
              >
                <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
                  play_arrow
                </span>
                Start Quiz (5 Questions)
              </button>
            </div>

            {/* Quick Stats */}
            {userProgress && userProgress.totalQuestions > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  background: '#2a2a2a',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#4CAF50'
                  }}>
                    {Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100)}%
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: 0
                  }}>
                    Overall Score
                  </p>
                </div>
                <div style={{
                  background: '#2a2a2a',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#2196F3'
                  }}>
                    {userProgress.totalQuestions}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: 0
                  }}>
                    Questions Answered
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz In Progress */}
        {quizInProgress && !quizComplete && (
          <div style={{
            background: '#2a2a2a',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                fontSize: '14px',
                color: '#999'
              }}>
                Question {currentQuestionIndex + 1} of {currentQuiz.length}
              </span>
              <div style={{
                background: '#333',
                borderRadius: '8px',
                padding: '4px 12px',
                fontSize: '12px',
                color: '#ccc',
                textTransform: 'capitalize'
              }}>
                {currentQuiz[currentQuestionIndex]?.difficulty}
              </div>
            </div>

            <div style={{
              background: '#444',
              borderRadius: '8px',
              height: '4px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: '#C41E3A',
                borderRadius: '8px',
                height: '100%',
                width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%`,
                transition: 'width 0.3s ease'
              }} />
            </div>

            {currentQuiz[currentQuestionIndex] && (
              <>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '24px',
                  lineHeight: 1.4
                }}>
                  {currentQuiz[currentQuestionIndex].question}
                </h3>

                <div style={{
                  display: 'grid',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  {currentQuiz[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      style={{
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
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
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
                        }}>
                          {showExplanation && index === currentQuiz[currentQuestionIndex].correctAnswer && (
                            <span className="material-icons-outlined" style={{
                              fontSize: '16px',
                              color: '#4CAF50'
                            }}>
                              check
                            </span>
                          )}
                          {showExplanation && selectedAnswer === index && index !== currentQuiz[currentQuestionIndex].correctAnswer && (
                            <span className="material-icons-outlined" style={{
                              fontSize: '16px',
                              color: '#f44336'
                            }}>
                              close
                            </span>
                          )}
                        </div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div style={{
                    background: '#333',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '24px'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: selectedAnswer === currentQuiz[currentQuestionIndex].correctAnswer ? '#4CAF50' : '#FF9800'
                    }}>
                      {selectedAnswer === currentQuiz[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not quite right'}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#ccc',
                      marginBottom: '12px',
                      lineHeight: 1.5
                    }}>
                      {currentQuiz[currentQuestionIndex].explanation}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: 0
                    }}>
                      Source: {currentQuiz[currentQuestionIndex].source}
                    </p>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  {!showExplanation ? (
                    <button
                      onClick={submitAnswer}
                      disabled={selectedAnswer === null}
                      style={{
                        flex: 1,
                        background: selectedAnswer !== null ? '#4CAF50' : '#666',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '14px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      style={{
                        flex: 1,
                        background: '#C41E3A',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '14px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Quiz Complete */}
        {quizComplete && (
          <div style={{
            background: '#2a2a2a',
            borderRadius: '16px',
            padding: '24px',
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
                emoji_events
              </span>
            </div>

            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '12px'
            }}>
              Quiz Complete!
            </h3>

            <p style={{
              fontSize: '16px',
              color: '#ccc',
              marginBottom: '24px'
            }}>
              You scored {userProgress ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100) : 0}%
              on this {selectedDifficulty} level quiz
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setQuizComplete(false);
                  setQuizInProgress(false);
                }}
                style={{
                  background: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Take Another Quiz
              </button>
              <button
                onClick={() => setActiveTab('learn')}
                style={{
                  background: '#C41E3A',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Explore Learning Paths
              </button>
            </div>
          </div>
        )}

        {/* Learning Paths Tab */}
        {activeTab === 'learn' && (
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Personalized Learning Paths
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              {learningPaths.map((path) => (
                <div
                  key={path.id}
                  style={{
                    background: '#2a2a2a',
                    borderRadius: '16px',
                    padding: '20px',
                    border: path.relevanceScore >= 90 ? '2px solid #C41E3A' : '1px solid #444'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: 0,
                        marginBottom: '4px'
                      }}>
                        {path.title}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          background: path.difficulty === 'advanced' ? '#C41E3A' : path.difficulty === 'intermediate' ? '#FF9800' : '#4CAF50',
                          borderRadius: '12px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#fff',
                          textTransform: 'capitalize'
                        }}>
                          {path.difficulty}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          color: '#999'
                        }}>
                          {path.estimatedTime}
                        </span>
                        <span style={{
                          background: path.relevanceScore >= 90 ? '#4CAF50' : '#FF9800',
                          borderRadius: '12px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#000'
                        }}>
                          {path.relevanceScore}% match
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '14px',
                    color: '#ccc',
                    marginBottom: '16px',
                    lineHeight: 1.5
                  }}>
                    {path.description}
                  </p>

                  <div style={{
                    display: 'grid',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: 0,
                      color: '#ccc'
                    }}>
                      Learning Modules ({path.modules.length})
                    </h5>
                    {path.modules.slice(0, 3).map((module, index) => (
                      <div
                        key={module.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px',
                          background: '#333',
                          borderRadius: '8px'
                        }}
                      >
                        <span className="material-icons-outlined" style={{
                          fontSize: '16px',
                          color: module.type === 'mentor_session' ? '#C41E3A' :
                            module.type === 'quiz' ? '#4CAF50' :
                              module.type === 'video' ? '#2196F3' : '#FF9800'
                        }}>
                          {module.type === 'mentor_session' ? 'school' :
                            module.type === 'quiz' ? 'quiz' :
                              module.type === 'video' ? 'play_circle' : 'article'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            margin: 0
                          }}>
                            {module.title}
                          </p>
                          <p style={{
                            fontSize: '12px',
                            color: '#666',
                            margin: 0
                          }}>
                            {module.duration} • {module.type.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {path.modules.length > 3 && (
                      <p style={{
                        fontSize: '12px',
                        color: '#666',
                        margin: '4px 0 0 0',
                        textAlign: 'center'
                      }}>
                        +{path.modules.length - 3} more modules
                      </p>
                    )}
                  </div>

                  <button
                    style={{
                      width: '100%',
                      background: '#C41E3A',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Start Learning Path
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && userProgress && (
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Your Learning Progress
            </h3>

            {/* Overall Stats */}
            <div style={{
              background: '#2a2a2a',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#4CAF50'
                  }}>
                    {Math.round((userProgress.correctAnswers / Math.max(userProgress.totalQuestions, 1)) * 100)}%
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: 0
                  }}>
                    Overall Score
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#2196F3'
                  }}>
                    {userProgress.totalQuestions}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: 0
                  }}>
                    Questions Answered
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#FF9800',
                    textTransform: 'capitalize'
                  }}>
                    {userProgress.currentLevel}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#999',
                    margin: 0
                  }}>
                    Current Level
                  </p>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            {Object.keys(userProgress.categoryScores).length > 0 && (
              <div style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Performance by Category
                </h4>

                <div style={{ display: 'grid', gap: '12px' }}>
                  {Object.entries(userProgress.categoryScores).map(([category, scores]) => {
                    const percentage = Math.round((scores.correct / scores.total) * 100);
                    return (
                      <div
                        key={category}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          background: '#333',
                          borderRadius: '8px'
                        }}
                      >
                        <div>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            margin: 0,
                            textTransform: 'capitalize'
                          }}>
                            {category.replace('_', ' ')}
                          </p>
                          <p style={{
                            fontSize: '12px',
                            color: '#666',
                            margin: 0
                          }}>
                            {scores.correct}/{scores.total} correct
                          </p>
                        </div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: getScoreColor(percentage)
                        }}>
                          {percentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Achievements */}
            <div style={{
              background: '#2a2a2a',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Achievements
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px'
              }}>
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    style={{
                      padding: '16px',
                      background: achievement.progress >= achievement.target ? '#333' : '#2a2a2a',
                      border: achievement.progress >= achievement.target ? '2px solid #4CAF50' : '1px solid #444',
                      borderRadius: '12px',
                      opacity: achievement.progress >= achievement.target ? 1 : 0.6
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px'
                    }}>
                      <span className="material-icons-outlined" style={{
                        fontSize: '24px',
                        color: achievement.progress >= achievement.target ? '#4CAF50' : '#666'
                      }}>
                        {achievement.icon}
                      </span>
                      <div>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          margin: 0
                        }}>
                          {achievement.title}
                        </p>
                        <p style={{
                          fontSize: '12px',
                          color: '#666',
                          margin: 0
                        }}>
                          {achievement.progress}/{achievement.target}
                        </p>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: '#ccc',
                      margin: 0
                    }}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}