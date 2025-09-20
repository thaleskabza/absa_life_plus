import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Mentors.tsx - Professional Network & Office Hours
import { useState, useEffect } from 'react';
import BottomNav from "../ui/BottomNav";
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
    getUserInterests: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return {
            businessStage: 'startup',
            industries: ['fintech', 'AI', 'digital_services'],
            goals: ['scaling', 'fundraising', 'product_development', 'market_expansion'],
            experience: 'intermediate',
            budget: 'flexible'
        };
    },
    getMentors: async (interests) => {
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
                availability: 'medium',
                priceRange: 'premium',
                sessionTypes: ['1on1', 'group'],
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
                availability: 'low',
                priceRange: 'premium',
                sessionTypes: ['1on1', 'workshop'],
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
                availability: 'high',
                priceRange: 'affordable',
                sessionTypes: ['1on1', 'group', 'workshop'],
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
                availability: 'medium',
                priceRange: 'affordable',
                sessionTypes: ['1on1', 'group'],
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
                availability: 'low',
                priceRange: 'premium',
                sessionTypes: ['1on1'],
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
                availability: 'high',
                priceRange: 'free',
                sessionTypes: ['1on1', 'group'],
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
                availability: 'medium',
                priceRange: 'premium',
                sessionTypes: ['1on1', 'workshop'],
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
                availability: 'high',
                priceRange: 'affordable',
                sessionTypes: ['1on1', 'group', 'workshop'],
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
    getAvailableSlots: async (mentorId) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const slots = [];
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
    bookMentorSession: async (slotId, mentorId) => {
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
    const [mentors, setMentors] = useState([]);
    const [userInterests, setUserInterests] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedExpertise, setSelectedExpertise] = useState('all');
    const [selectedAvailability, setSelectedAvailability] = useState('all');
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
    const [bookingConfirmation, setBookingConfirmation] = useState(null);
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
        }
        catch (error) {
            console.error('Failed to load mentor data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleMentorSelect = async (mentor) => {
        setSelectedMentor(mentor);
        setBookingLoading(true);
        try {
            const slots = await mentorsAPI.getAvailableSlots(mentor.id);
            setAvailableSlots(slots);
        }
        catch (error) {
            console.error('Failed to load slots:', error);
        }
        finally {
            setBookingLoading(false);
        }
    };
    const handleBookingConfirm = async () => {
        if (!selectedSlot || !selectedMentor)
            return;
        try {
            setBookingLoading(true);
            const result = await mentorsAPI.bookMentorSession(selectedSlot.id, selectedMentor.id);
            if (result.success) {
                setBookingConfirmation(result);
                setShowBookingConfirmation(true);
                setSelectedMentor(null);
                setSelectedSlot(null);
            }
        }
        catch (error) {
            console.error('Booking failed:', error);
        }
        finally {
            setBookingLoading(false);
        }
    };
    const filteredMentors = mentors.filter(mentor => {
        const expertiseMatch = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise);
        const availabilityMatch = selectedAvailability === 'all' || mentor.availability === selectedAvailability;
        return expertiseMatch && availabilityMatch;
    });
    const uniqueExpertise = Array.from(new Set(mentors.flatMap(m => m.expertise)));
    const getAvailabilityColor = (availability) => {
        switch (availability) {
            case 'high': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'low': return '#f44336';
            default: return '#666';
        }
    };
    const getPriceRangeColor = (range) => {
        switch (range) {
            case 'free': return '#4CAF50';
            case 'affordable': return '#2196F3';
            case 'premium': return '#C41E3A';
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
                            } }), _jsx("p", { children: "Finding your perfect mentors..." })] }), _jsx("style", { children: `
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
                                        }, children: "Find Your Mentor" }), _jsx("p", { style: {
                                            margin: 0,
                                            fontSize: '14px',
                                            color: '#999'
                                        }, children: "Connect with industry experts for personalized guidance" })] }), _jsx("div", { style: {
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }, children: _jsx("img", { src: "/absa-logo-red-bg.svg", alt: "ABSA Logo", style: {
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%'
                                    } }) })] }), _jsxs("div", { style: {
                            display: 'grid',
                            gap: '12px',
                            marginBottom: '16px'
                        }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                            fontSize: '14px',
                                            margin: '0 0 8px 0',
                                            color: '#ccc'
                                        }, children: "Expertise" }), _jsxs("div", { style: {
                                            display: 'flex',
                                            gap: '8px',
                                            overflowX: 'auto',
                                            paddingBottom: '4px'
                                        }, children: [_jsxs("button", { onClick: () => setSelectedExpertise('all'), style: {
                                                    padding: '8px 16px',
                                                    borderRadius: '20px',
                                                    border: 'none',
                                                    background: selectedExpertise === 'all' ? '#C41E3A' : '#333',
                                                    color: '#fff',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'pointer'
                                                }, children: ["All (", mentors.length, ")"] }), uniqueExpertise.slice(0, 6).map((expertise) => (_jsx("button", { onClick: () => setSelectedExpertise(expertise), style: {
                                                    padding: '8px 16px',
                                                    borderRadius: '20px',
                                                    border: 'none',
                                                    background: selectedExpertise === expertise ? '#C41E3A' : '#333',
                                                    color: '#fff',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'pointer'
                                                }, children: expertise.replace('_', ' ') }, expertise)))] })] }), _jsxs("div", { children: [_jsx("p", { style: {
                                            fontSize: '14px',
                                            margin: '0 0 8px 0',
                                            color: '#ccc'
                                        }, children: "Availability" }), _jsx("div", { style: {
                                            display: 'flex',
                                            gap: '8px'
                                        }, children: ['all', 'high', 'medium', 'low'].map((availability) => (_jsx("button", { onClick: () => setSelectedAvailability(availability), style: {
                                                padding: '8px 16px',
                                                borderRadius: '20px',
                                                border: 'none',
                                                background: selectedAvailability === availability ? '#C41E3A' : '#333',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                textTransform: 'capitalize'
                                            }, children: availability }, availability))) })] })] })] }), _jsx("main", { style: { padding: '20px', paddingBottom: '100px' }, children: _jsx("div", { style: { display: 'grid', gap: '20px' }, children: filteredMentors.map((mentor) => (_jsx("div", { style: {
                            background: '#2a2a2a',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: mentor.lifeMatch >= 90 ? '2px solid #C41E3A' : '1px solid #444'
                        }, children: _jsxs("div", { style: { padding: '20px' }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '16px',
                                        marginBottom: '16px'
                                    }, children: [_jsxs("div", { style: {
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                background: '#333'
                                            }, children: [_jsx("img", { src: mentor.imageUrl, alt: mentor.name, style: {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }, onError: (e) => {
                                                        // Fallback if image fails to load
                                                        e.currentTarget.style.display = 'none';
                                                        const fallbackElement = e.currentTarget.nextElementSibling;
                                                        if (fallbackElement) {
                                                            fallbackElement.style.display = 'flex';
                                                        }
                                                    } }), _jsx("div", { style: {
                                                        display: 'none',
                                                        width: '80px',
                                                        height: '80px',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        background: '#C41E3A',
                                                        borderRadius: '50%'
                                                    }, children: _jsx("span", { className: "material-icons-outlined", style: {
                                                            fontSize: '32px',
                                                            color: '#fff'
                                                        }, children: "person" }) })] }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs("div", { style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'flex-start',
                                                        marginBottom: '8px'
                                                    }, children: [_jsxs("div", { children: [_jsx("h3", { style: {
                                                                        fontSize: '20px',
                                                                        fontWeight: '700',
                                                                        margin: 0,
                                                                        marginBottom: '4px'
                                                                    }, children: mentor.name }), _jsx("p", { style: {
                                                                        fontSize: '16px',
                                                                        fontWeight: '600',
                                                                        color: '#C41E3A',
                                                                        margin: 0,
                                                                        marginBottom: '2px'
                                                                    }, children: mentor.title }), _jsx("p", { style: {
                                                                        fontSize: '14px',
                                                                        color: '#999',
                                                                        margin: 0
                                                                    }, children: mentor.company })] }), _jsxs("div", { style: { textAlign: 'right' }, children: [_jsxs("div", { style: {
                                                                        background: mentor.lifeMatch >= 90 ? '#4CAF50' : mentor.lifeMatch >= 80 ? '#FF9800' : '#666',
                                                                        borderRadius: '12px',
                                                                        padding: '4px 8px',
                                                                        fontSize: '12px',
                                                                        fontWeight: '700',
                                                                        color: '#000',
                                                                        marginBottom: '4px'
                                                                    }, children: [mentor.lifeMatch, "% match"] }), _jsxs("div", { style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '4px',
                                                                        fontSize: '14px',
                                                                        color: '#ccc'
                                                                    }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '16px' }, children: "star" }), mentor.rating, " (", mentor.reviewCount, ")"] })] })] }), _jsxs("div", { style: {
                                                        display: 'flex',
                                                        gap: '8px',
                                                        marginBottom: '12px'
                                                    }, children: [_jsxs("div", { style: {
                                                                background: getAvailabilityColor(mentor.availability),
                                                                borderRadius: '12px',
                                                                padding: '4px 8px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                color: '#fff'
                                                            }, children: [mentor.availability, " availability"] }), _jsx("div", { style: {
                                                                background: getPriceRangeColor(mentor.priceRange),
                                                                borderRadius: '12px',
                                                                padding: '4px 8px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                color: '#fff'
                                                            }, children: mentor.priceRange })] })] })] }), _jsx("p", { style: {
                                        fontSize: '14px',
                                        color: '#ccc',
                                        lineHeight: 1.5,
                                        marginBottom: '16px'
                                    }, children: mentor.bio }), _jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '6px',
                                        flexWrap: 'wrap',
                                        marginBottom: '16px'
                                    }, children: [mentor.expertise.slice(0, 4).map((skill) => (_jsx("span", { style: {
                                                background: '#444',
                                                borderRadius: '12px',
                                                padding: '4px 12px',
                                                fontSize: '12px',
                                                color: '#ccc'
                                            }, children: skill.replace('_', ' ') }, skill))), mentor.expertise.length > 4 && (_jsxs("span", { style: {
                                                color: '#999',
                                                fontSize: '12px',
                                                alignSelf: 'center'
                                            }, children: ["+", mentor.expertise.length - 4, " more"] }))] }), _jsxs("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '16px',
                                        fontSize: '12px',
                                        color: '#999'
                                    }, children: [_jsxs("div", { children: ["Sessions: ", mentor.sessionTypes.join(', ')] }), _jsxs("div", { children: ["Languages: ", mentor.languages.join(', ')] })] }), _jsxs("button", { onClick: () => handleMentorSelect(mentor), style: {
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
                                    }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '20px' }, children: "event_available" }), "Book Session \u2022 Next: ", mentor.nextAvailable] })] }) }, mentor.id))) }) }), selectedMentor && (_jsx("div", { style: {
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
                        maxWidth: '500px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '20px'
                            }, children: [_jsxs("h3", { style: {
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        margin: 0
                                    }, children: ["Book with ", selectedMentor.name] }), _jsx("button", { onClick: () => setSelectedMentor(null), style: {
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#999',
                                        cursor: 'pointer'
                                    }, children: _jsx("span", { className: "material-icons-outlined", style: { fontSize: '24px' }, children: "close" }) })] }), bookingLoading ? (_jsxs("div", { style: { textAlign: 'center', padding: '40px 0' }, children: [_jsx("div", { style: {
                                        width: '32px',
                                        height: '32px',
                                        border: '2px solid #333',
                                        borderTop: '2px solid #C41E3A',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite',
                                        margin: '0 auto 16px'
                                    } }), _jsx("p", { children: "Loading available slots..." })] })) : (_jsxs("div", { children: [_jsx("h4", { style: {
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '16px'
                                    }, children: "Available Time Slots" }), _jsx("div", { style: {
                                        display: 'grid',
                                        gap: '8px',
                                        maxHeight: '300px',
                                        overflowY: 'auto',
                                        marginBottom: '20px'
                                    }, children: availableSlots.slice(0, 10).map((slot) => (_jsx("button", { onClick: () => setSelectedSlot(slot), style: {
                                            background: selectedSlot?.id === slot.id ? '#C41E3A' : '#333',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '12px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            textAlign: 'left'
                                        }, children: _jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }, children: [_jsxs("div", { children: [_jsxs("p", { style: {
                                                                fontSize: '14px',
                                                                fontWeight: '600',
                                                                margin: 0
                                                            }, children: [new Date(slot.date).toLocaleDateString('en-ZA', {
                                                                    weekday: 'short',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                }), " at ", slot.time] }), _jsxs("p", { style: {
                                                                fontSize: '12px',
                                                                color: selectedSlot?.id === slot.id ? 'rgba(255,255,255,0.8)' : '#999',
                                                                margin: '2px 0 0 0'
                                                            }, children: [slot.duration, " min \u2022 ", slot.type] })] }), _jsxs("div", { style: {
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }, children: ["R", slot.price] })] }) }, slot.id))) }), selectedSlot && (_jsxs("div", { style: {
                                        background: '#333',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        marginBottom: '20px'
                                    }, children: [_jsx("h5", { style: {
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                margin: '0 0 8px 0'
                                            }, children: "Session Details" }), _jsxs("p", { style: {
                                                fontSize: '14px',
                                                margin: '0 0 4px 0'
                                            }, children: ["Date: ", new Date(selectedSlot.date).toLocaleDateString('en-ZA', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })] }), _jsxs("p", { style: {
                                                fontSize: '14px',
                                                margin: '0 0 4px 0'
                                            }, children: ["Time: ", selectedSlot.time, " (", selectedSlot.duration, " minutes)"] }), _jsxs("p", { style: {
                                                fontSize: '14px',
                                                margin: '0 0 8px 0'
                                            }, children: ["Price: R", selectedSlot.price] })] })), _jsx("button", { onClick: handleBookingConfirm, disabled: !selectedSlot || bookingLoading, style: {
                                        width: '100%',
                                        background: !selectedSlot || bookingLoading ? '#666' : '#4CAF50',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '14px',
                                        color: '#fff',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: !selectedSlot || bookingLoading ? 'not-allowed' : 'pointer'
                                    }, children: bookingLoading ? 'Booking...' : 'Confirm Booking' })] }))] }) })), showBookingConfirmation && bookingConfirmation && (_jsx("div", { style: {
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
                            }, children: "Booking Confirmed!" }), _jsx("p", { style: {
                                fontSize: '14px',
                                color: '#ccc',
                                marginBottom: '20px'
                            }, children: "Your mentorship session has been successfully booked." }), _jsxs("div", { style: {
                                background: '#333',
                                borderRadius: '8px',
                                padding: '16px',
                                marginBottom: '24px',
                                textAlign: 'left'
                            }, children: [_jsxs("p", { style: {
                                        fontSize: '14px',
                                        margin: '0 0 8px 0'
                                    }, children: [_jsx("strong", { children: "Booking ID:" }), " ", bookingConfirmation.bookingId] }), _jsxs("p", { style: {
                                        fontSize: '14px',
                                        margin: '0 0 8px 0'
                                    }, children: [_jsx("strong", { children: "Confirmation:" }), " ", bookingConfirmation.confirmationCode] })] }), _jsxs("div", { style: {
                                display: 'flex',
                                gap: '12px'
                            }, children: [_jsx("button", { onClick: () => setShowBookingConfirmation(false), style: {
                                        flex: 1,
                                        background: '#333',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }, children: "Close" }), _jsx("button", { onClick: () => window.open(bookingConfirmation.calendarUrl, '_blank'), style: {
                                        flex: 1,
                                        background: '#C41E3A',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }, children: "Add to Calendar" })] })] }) })), _jsx(BottomNav, {})] }));
}
