// src/App.tsx - Updated with all navigation routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RetailBank from '../src/pages/RetailBank';
import Discover from '../src/pages/Discover';

// Import BottomNav for placeholder pages
import BottomNav from './ui/BottomNav';

// Placeholder components for new routes
const Mentors = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px', textAlign: 'center' }}>
    <h1>Mentors</h1>
    <p>Connect with financial mentors and advisors</p>
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNav />
    </div>
  </div>
);

const DiscoverPage = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px', textAlign: 'center' }}>
    <h1>Discover</h1>
    <p>Explore new financial products and opportunities</p>
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNav />
    </div>
  </div>
);

const Wallet = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px', textAlign: 'center' }}>
    <h1>Wallet</h1>
    <p>Your cards and payment methods</p>
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNav />
    </div>
  </div>
);

const Rewards = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px', textAlign: 'center' }}>
    <h1>Rewards</h1>
    <p>Your loyalty points and benefits</p>
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNav />
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div style={{ 
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
        minHeight: '100vh'
      }}>
        {/* Global CSS Variables */}
        <style>{`
          :root {
            --absa-red: #C41E3A;
            --absa-rose: #E91E63;
            --bg: #F8F9FA;
            --bg-secondary: #F1F3F4;
            --ink: #202124;
            --ink-light: #5F6368;
            --border-light: #E8EAED;
            --space-1: 4px;
            --space-2: 8px;
            --space-3: 12px;
            --space-4: 16px;
            --space-5: 20px;
            --space-6: 24px;
            --shadow-1: 0 1px 3px rgba(0, 0, 0, 0.1);
            --shadow-2: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            background: #1a1a1a;
            color: #fff;
          }
          
          .card {
            background: #fff;
            border-radius: 16px;
            border: 1px solid var(--border-light);
            box-shadow: var(--shadow-1);
          }
          
          .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 0 var(--space-4);
          }
          
          .gradient-header {
            background: linear-gradient(135deg, var(--absa-red) 0%, var(--absa-rose) 100%);
            color: white;
          }
          
          .h1 {
            font-size: 28px;
            font-weight: 700;
            line-height: 1.2;
          }
          
          .h3 {
            font-size: 18px;
            font-weight: 600;
            line-height: 1.3;
          }
          
          .subtitle {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .subtle {
            font-size: 14px;
            color: var(--ink-light);
          }
          
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
          }
          
          * {
            box-sizing: border-box;
          }
          
          * {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
          }

          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            background: #1a1a1a;
            color: #fff;
            overflow-x: hidden; /* Prevent horizontal scroll */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Mobile-first responsive container */
          .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 0 var(--space-4);
            width: 100%;
          }

          /* Ensure mobile compatibility */
          @media (max-width: 480px) {
            .container {
              padding: 0 16px;
            }
          }
        `}</style>
        
        <Routes>
          {/* All Navigation Routes */}
          <Route path="/" element={<RetailBank />} />
          <Route path="/Concierge" element={<Discover />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </Router>
  );
}