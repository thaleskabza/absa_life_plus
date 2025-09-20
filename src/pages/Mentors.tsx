// src/pages/Mentors.tsx - Professional Network & Office Hours
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";

// Mentor and booking interfaces
interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  bio: string;
  experience: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  availability: 'high' | 'medium' | 'low';
  priceRange: 'free' | 'affordable' | 'premium';
  sessionTypes: ('1on1' | 'group' | 'workshop')[];
  languages: string[];
  timezone: string;
  nextAvailable: string;
  lifeMatch: number;
  tags: string[];
}

interface BookingSlot {
  id: string;
  mentorId: string;
  date: string;
  time: string;
  duration: number;
  type: '1on1' | 'group' | 'workshop';
  price: number;
  available: boolean;
}

interface UserInterests {
  businessStage: 'idea' | 'startup' | 'scaling' | 'established';
  industries: string[];
  goals: string[];
  experience: string;
  budget: 'free' | 'budget' | 'flexible';
}

// Mock free profile images (in production, you'd fetch from APIs like Unsplash, Pexels, etc.)
const MENTOR_IMAGE_POOLS = {
  // In production, replace these with actual API calls to:
  // - Unsplash API: https://api.unsplash.com/photos/random?query=professional+portrait
  // - Pexels API: https://api.pexels.com/v1/search?query=business+professional
  // - Lorem Picsum: https://picsum.photos/200/200?random=
  male: [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face'
  ],
  female: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face'
  ]
};

// Mock Mentors API with randomization
const mentorsAPI = {
  // Randomize images each page load
  randomizeProfileImages: () => {
    const maleImages = [...MENTOR_IMAGE_POOLS.male].sort(() => Math.random() - 0.5);
    const femaleImages = [...MENTOR_IMAGE_POOLS.female].sort(() => Math.random() - 0.5);
    return { maleImages, femaleImages };
  },

  getUserInterests: async (): Promise<UserInterests> => {
    await new Promise(resolve => setTimeout(resolve, 400));

    return {
      businessStage: 'startup',
      industries: ['fintech', 'AI', 'digital_services'],
      goals: ['scaling', 'fundraising', 'product_development', 'market_expansion'],
      experience: 'intermediate',
      budget: 'flexible'
    };
  },

  getMentors: async (interests: UserInterests): Promise<Mentor[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const { maleImages, femaleImages } = mentorsAPI.randomizeProfileImages();
    let maleIndex = 0;
    let femaleIndex = 0;

    const baseMentors = [
      {
        id: 'mentor1',
        name: 'Sarah Chen',
        title: 'Fintech Founder & Serial Entrepreneur',
        company: 'PayFast (Acquired by Naspers)',
        expertise: ['fintech', 'fundraising', 'scaling', 'product_strategy'],
        bio: 'Built and sold 3 fintech companies. Led PayFast from startup to R2B acquisition. Passionate about helping African entrepreneurs scale globally.',
        experience: 12,
        rating: 4.9,
        reviewCount: 127,
        imageUrl: femaleImages[femaleIndex++] || 'https://images.unsplash.com/photo-1494790108755-2616b612b593?w=200&h=200&fit=crop&crop=face',
        availability: 'medium' as const,
        priceRange: 'premium' as const,
        sessionTypes: ['1on1' as const, 'group' as const],
        languages: ['English', 'Mandarin'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-09-25',
        lifeMatch: 95,
        tags: ['founder', 'exits', 'scaling', 'africa']
      },
      {
        id: 'mentor2',
        name: 'Marcus Williams',
        title: 'Head of Innovation',
        company: 'Standard Bank',
        expertise: ['banking', 'digital_transformation', 'innovation', 'partnerships'],
        bio: 'Leading digital innovation at Standard Bank. 15 years in financial services. Expert in bank-fintech partnerships and regulatory navigation.',
        experience: 15,
        rating: 4.7,
        reviewCount: 89,
        imageUrl: maleImages[maleIndex++] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        availability: 'low' as const,
        priceRange: 'premium' as const,
        sessionTypes: ['1on1' as const, 'workshop' as const],
        languages: ['English', 'Afrikaans'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-10-02',
        lifeMatch: 88,
        tags: ['corporate', 'innovation', 'partnerships', 'regulation']
      },
      {
        id: 'mentor3',
        name: 'Dr. Amara Okafor',
        title: 'AI Research Director & Startup Advisor',
        company: 'University of Witwatersrand',
        expertise: ['AI', 'machine_learning', 'academic_research', 'commercialization'],
        bio: 'PhD in AI from MIT. Research director at Wits. Advises 20+ AI startups. Bridge between academic research and commercial applications.',
        experience: 10,
        rating: 4.8,
        reviewCount: 156,
        imageUrl: femaleImages[femaleIndex++] || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
        availability: 'high' as const,
        priceRange: 'affordable' as const,
        sessionTypes: ['1on1' as const, 'group' as const, 'workshop' as const],
        languages: ['English', 'French', 'Igbo'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-09-21',
        lifeMatch: 92,
        tags: ['AI', 'research', 'academia', 'commercialization']
      },
      {
        id: 'mentor4',
        name: 'James van der Merwe',
        title: 'Growth Marketing Director',
        company: 'Takealot.com',
        expertise: ['growth_marketing', 'digital_marketing', 'ecommerce', 'user_acquisition'],
        bio: 'Scaled Takealot from 100K to 10M customers. Growth marketing expert. Specializes in performance marketing and customer acquisition at scale.',
        experience: 8,
        rating: 4.6,
        reviewCount: 234,
        imageUrl: maleImages[maleIndex++] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        availability: 'medium' as const,
        priceRange: 'affordable' as const,
        sessionTypes: ['1on1' as const, 'group' as const],
        languages: ['English', 'Afrikaans'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-09-23',
        lifeMatch: 82,
        tags: ['marketing', 'growth', 'ecommerce', 'performance']
      },
      {
        id: 'mentor5',
        name: 'Fatima Al-Zahra',
        title: 'Venture Capital Partner',
        company: '4DX Ventures',
        expertise: ['venture_capital', 'fundraising', 'due_diligence', 'portfolio_management'],
        bio: 'Partner at 4DX Ventures. Led investments in 40+ African startups. Former investment banker at Goldman Sachs. Expert in Series A-C fundraising.',
        experience: 11,
        rating: 4.9,
        reviewCount: 67,
        imageUrl: femaleImages[femaleIndex++] || 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
        availability: 'low' as const,
        priceRange: 'premium' as const,
        sessionTypes: ['1on1' as const],
        languages: ['English', 'Arabic', 'French'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-10-05',
        lifeMatch: 91,
        tags: ['VC', 'fundraising', 'investment', 'africa']
      },
      {
        id: 'mentor6',
        name: 'Sipho Mthembu',
        title: 'Product Management Lead',
        company: 'Spotify (Remote from Cape Town)',
        expertise: ['product_management', 'user_experience', 'agile', 'remote_work'],
        bio: 'Senior PM at Spotify. Built products used by 500M+ users. Expert in product strategy, user research, and managing distributed teams.',
        experience: 7,
        rating: 4.7,
        reviewCount: 143,
        imageUrl: maleImages[maleIndex++] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
        availability: 'high' as const,
        priceRange: 'free' as const,
        sessionTypes: ['1on1' as const, 'group' as const],
        languages: ['English', 'Zulu', 'Xhosa'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-09-20',
        lifeMatch: 87,
        tags: ['product', 'UX', 'remote', 'global']
      },
      {
        id: 'mentor7',
        name: 'Lisa Thompson',
        title: 'Legal Counsel & Startup Advisor',
        company: 'Bowmans Law',
        expertise: ['startup_law', 'contracts', 'compliance', 'intellectual_property'],
        bio: 'Senior legal counsel at Bowmans. Specializes in startup law and fintech regulation. Helped 100+ startups navigate legal complexities.',
        experience: 13,
        rating: 4.8,
        reviewCount: 91,
        imageUrl: femaleImages[femaleIndex++] || 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face',
        availability: 'medium' as const,
        priceRange: 'premium' as const,
        sessionTypes: ['1on1' as const, 'workshop' as const],
        languages: ['English'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-09-26',
        lifeMatch: 78,
        tags: ['legal', 'compliance', 'contracts', 'IP']
      },
      {
        id: 'mentor8',
        name: 'Ahmed Hassan',
        title: 'Technology Architect',
        company: 'Amazon Web Services',
        expertise: ['cloud_architecture', 'scalability', 'devops', 'system_design'],
        bio: 'Principal Solutions Architect at AWS. Designed systems for unicorn startups. Expert in scaling from MVP to millions of users.',
        experience: 14,
        rating: 4.6,
        reviewCount: 178,
        imageUrl: maleImages[maleIndex++] || 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face',
        availability: 'high' as const,
        priceRange: 'affordable' as const,
        sessionTypes: ['1on1' as const, 'group' as const, 'workshop' as const],
        languages: ['English', 'Arabic'],
        timezone: 'Africa/Johannesburg',
        nextAvailable: '2025-09-22',
        lifeMatch: 85,
        tags: ['tech', 'architecture', 'scaling', 'cloud']
      }
    ];

    // Shuffle mentors for variety
    return baseMentors.sort(() => Math.random() - 0.5);
  },

  getAvailableSlots: async (mentorId: string): Promise<BookingSlot[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const slots: BookingSlot[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start from tomorrow

    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Generate 3-5 random slots per day
      const slotsPerDay = Math.floor(Math.random() * 3) + 3;
      for (let j = 0; j < slotsPerDay; j++) {
        const hour = 9 + Math.floor(Math.random() * 8); // 9 AM to 5 PM
        const minute = Math.random() > 0.5 ? 0 : 30;

        slots.push({
          id: `slot_${mentorId}_${i}_${j}`,
          mentorId,
          date: date.toISOString().split('T')[0],
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          duration: Math.random() > 0.7 ? 60 : 30,
          type: Math.random() > 0.8 ? 'group' : '1on1',
          price: Math.floor(Math.random() * 500) + 100,
          available: Math.random() > 0.3
        });
      }
    }

    return slots.filter(slot => slot.available).slice(0, 20);
  },

  bookMentorSession: async (slotId: string, mentorId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      bookingId: `booking_${Date.now()}`,
      confirmationCode: `ABSA${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      calendarUrl: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mentor Session`
    };
  }
};

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [userInterests, setUserInterests] = useState<UserInterests | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [availableSlots, setAvailableSlots] = useState<BookingSlot[]>([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);

  useEffect(() => {
    loadMentorData();
  }, []);

  const loadMentorData = async () => {
    try {
      setLoading(true);
      const interests = await mentorsAPI.getUserInterests();
      const mentorData = await mentorsAPI.getMentors(interests);

      setUserInterests(interests);
      setMentors(mentorData);
    } catch (error) {
      console.error('Failed to load mentor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMentorSelect = async (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setBookingLoading(true);

    try {
      const slots = await mentorsAPI.getAvailableSlots(mentor.id);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Failed to load slots:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleBookingConfirm = async () => {
    if (!selectedSlot || !selectedMentor) return;

    try {
      setBookingLoading(true);
      const result = await mentorsAPI.bookMentorSession(selectedSlot.id, selectedMentor.id);

      if (result.success) {
        setBookingConfirmation(result);
        setShowBookingConfirmation(true);
        setSelectedMentor(null);
        setSelectedSlot(null);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    const expertiseMatch = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);
    const availabilityMatch = selectedAvailability === 'all' || mentor.availability === selectedAvailability;
    return expertiseMatch && availabilityMatch;
  });

  const uniqueExpertise = Array.from(new Set(mentors.flatMap(m => m.expertise)));

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'low': return '#f44336';
      default: return '#666';
    }
  };

  const getPriceRangeColor = (range: string) => {
    switch (range) {
      case 'free': return '#4CAF50';
      case 'affordable': return '#2196F3';
      case 'premium': return '#C41E3A';
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
          <p>Finding your perfect mentors...</p>
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
              Find Your Mentor
            </h1>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#999'
            }}>
              Connect with industry experts for personalized guidance
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

        {/* Filters */}
        <div style={{
          display: 'grid',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div>
            <p style={{
              fontSize: '14px',
              margin: '0 0 8px 0',
              color: '#ccc'
            }}>
              Expertise
            </p>
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}>
              <button
                onClick={() => setSelectedExpertise('all')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedExpertise === 'all' ? '#C41E3A' : '#333',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                All ({mentors.length})
              </button>
              {uniqueExpertise.slice(0, 6).map((expertise) => (
                <button
                  key={expertise}
                  onClick={() => setSelectedExpertise(expertise)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedExpertise === expertise ? '#C41E3A' : '#333',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  {expertise.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p style={{
              fontSize: '14px',
              margin: '0 0 8px 0',
              color: '#ccc'
            }}>
              Availability
            </p>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              {['all', 'high', 'medium', 'low'].map((availability) => (
                <button
                  key={availability}
                  onClick={() => setSelectedAvailability(availability)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: selectedAvailability === availability ? '#C41E3A' : '#333',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {availability}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main style={{ padding: '20px', paddingBottom: '100px' }}>
        {/* Mentor Cards */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              style={{
                background: '#2a2a2a',
                borderRadius: '16px',
                overflow: 'hidden',
                border: mentor.lifeMatch >= 90 ? '2px solid #C41E3A' : '1px solid #444'
              }}
            >
              <div style={{ padding: '20px' }}>
                {/* Mentor Header */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#333'
                  }}>
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.style.display = 'none';
                        const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallbackElement) {
                          fallbackElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div style={{
                      display: 'none',
                      width: '80px',
                      height: '80px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#C41E3A',
                      borderRadius: '50%'
                    }}>
                      <span className="material-icons-outlined" style={{
                        fontSize: '32px',
                        color: '#fff'
                      }}>
                        person
                      </span>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          margin: 0,
                          marginBottom: '4px'
                        }}>
                          {mentor.name}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#C41E3A',
                          margin: 0,
                          marginBottom: '2px'
                        }}>
                          {mentor.title}
                        </p>
                        <p style={{
                          fontSize: '14px',
                          color: '#999',
                          margin: 0
                        }}>
                          {mentor.company}
                        </p>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          background: mentor.lifeMatch >= 90 ? '#4CAF50' : mentor.lifeMatch >= 80 ? '#FF9800' : '#666',
                          borderRadius: '12px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#000',
                          marginBottom: '4px'
                        }}>
                          {mentor.lifeMatch}% match
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '14px',
                          color: '#ccc'
                        }}>
                          <span className="material-icons-outlined" style={{ fontSize: '16px' }}>
                            star
                          </span>
                          {mentor.rating} ({mentor.reviewCount})
                        </div>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        background: getAvailabilityColor(mentor.availability),
                        borderRadius: '12px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#fff'
                      }}>
                        {mentor.availability} availability
                      </div>
                      <div style={{
                        background: getPriceRangeColor(mentor.priceRange),
                        borderRadius: '12px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#fff'
                      }}>
                        {mentor.priceRange}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{
                  fontSize: '14px',
                  color: '#ccc',
                  lineHeight: 1.5,
                  marginBottom: '16px'
                }}>
                  {mentor.bio}
                </p>

                {/* Expertise Tags */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                  marginBottom: '16px'
                }}>
                  {mentor.expertise.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: '#444',
                        borderRadius: '12px',
                        padding: '4px 12px',
                        fontSize: '12px',
                        color: '#ccc'
                      }}
                    >
                      {skill.replace('_', ' ')}
                    </span>
                  ))}
                  {mentor.expertise.length > 4 && (
                    <span style={{
                      color: '#999',
                      fontSize: '12px',
                      alignSelf: 'center'
                    }}>
                      +{mentor.expertise.length - 4} more
                    </span>
                  )}
                </div>

                {/* Session Types & Languages */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  fontSize: '12px',
                  color: '#999'
                }}>
                  <div>
                    Sessions: {mentor.sessionTypes.join(', ')}
                  </div>
                  <div>
                    Languages: {mentor.languages.join(', ')}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleMentorSelect(mentor)}
                  style={{
                    width: '100%',
                    background: '#C41E3A',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
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
                    event_available
                  </span>
                  Book Session • Next: {mentor.nextAvailable}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {selectedMentor && (
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
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                margin: 0
              }}>
                Book with {selectedMentor.name}
              </h3>
              <button
                onClick={() => setSelectedMentor(null)}
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

            {bookingLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid #333',
                  borderTop: '2px solid #C41E3A',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }} />
                <p>Loading available slots...</p>
              </div>
            ) : (
              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Available Time Slots
                </h4>

                <div style={{
                  display: 'grid',
                  gap: '8px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  marginBottom: '20px'
                }}>
                  {availableSlots.slice(0, 10).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        background: selectedSlot?.id === slot.id ? '#C41E3A' : '#333',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px',
                        color: '#fff',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            margin: 0
                          }}>
                            {new Date(slot.date).toLocaleDateString('en-ZA', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })} at {slot.time}
                          </p>
                          <p style={{
                            fontSize: '12px',
                            color: selectedSlot?.id === slot.id ? 'rgba(255,255,255,0.8)' : '#999',
                            margin: '2px 0 0 0'
                          }}>
                            {slot.duration} min • {slot.type}
                          </p>
                        </div>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          R{slot.price}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedSlot && (
                  <div style={{
                    background: '#333',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px'
                  }}>
                    <h5 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: '0 0 8px 0'
                    }}>
                      Session Details
                    </h5>
                    <p style={{
                      fontSize: '14px',
                      margin: '0 0 4px 0'
                    }}>
                      Date: {new Date(selectedSlot.date).toLocaleDateString('en-ZA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      margin: '0 0 4px 0'
                    }}>
                      Time: {selectedSlot.time} ({selectedSlot.duration} minutes)
                    </p>
                    <p style={{
                      fontSize: '14px',
                      margin: '0 0 8px 0'
                    }}>
                      Price: R{selectedSlot.price}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleBookingConfirm}
                  disabled={!selectedSlot || bookingLoading}
                  style={{
                    width: '100%',
                    background: !selectedSlot || bookingLoading ? '#666' : '#4CAF50',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: !selectedSlot || bookingLoading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Confirmation */}
      {showBookingConfirmation && bookingConfirmation && (
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
              Booking Confirmed!
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '20px'
            }}>
              Your mentorship session has been successfully booked.
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
                <strong>Booking ID:</strong> {bookingConfirmation.bookingId}
              </p>
              <p style={{
                fontSize: '14px',
                margin: '0 0 8px 0'
              }}>
                <strong>Confirmation:</strong> {bookingConfirmation.confirmationCode}
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowBookingConfirmation(false)}
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
                Close
              </button>
              <button
                onClick={() => window.open(bookingConfirmation.calendarUrl, '_blank')}
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
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}