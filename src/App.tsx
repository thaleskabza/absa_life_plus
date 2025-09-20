// src/App.tsx - Fixed routing to ensure "/" goes to RetailBank
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RetailBank from './pages/RetailBank';
import Discover from './pages/Discover';
import Mentors from './pages/Mentors';  // Import the full Mentors component

// Import BottomNav for placeholder pages
import BottomNav from './ui/BottomNav';

// Placeholder components for remaining routes
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

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        
        <Routes>
          {/* Fixed Navigation Routes - ROOT route first for priority */}
          <Route path="/" element={<RetailBank />} />           {/* HOME - RetailBank */}
          <Route path="/mentors" element={<Mentors />} />       {/* Full Mentors component */}
          <Route path="/Concierge" element={<Discover />} />    {/* Life+ button */}
          <Route path="/wallet" element={<Wallet />} />         {/* Wallet placeholder */}
          <Route path="/rewards" element={<Rewards />} />       {/* Rewards placeholder */}
          
          {/* Debug Route to see what's happening */}
          <Route path="*" element={
            <div style={{ 
              minHeight: '100vh', 
              background: '#1a1a1a', 
              color: '#fff', 
              padding: '40px', 
              textAlign: 'center' 
            }}>
              <h1>Debug: 404 - Route Not Found</h1>
              <p><strong>Current URL:</strong> {window.location.href}</p>
              <p><strong>Pathname:</strong> {window.location.pathname}</p>
              <div style={{ background: '#333', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
                <h3>Available routes:</h3>
                <ul style={{ textAlign: 'left', display: 'inline-block' }}>
                  <li><a href="/" style={{ color: '#C41E3A' }}>/ → RetailBank (Home)</a></li>
                  <li><a href="/mentors" style={{ color: '#C41E3A' }}>/mentors → Mentors</a></li>
                  <li><a href="/Concierge" style={{ color: '#C41E3A' }}>/Concierge → Discover (Life+)</a></li>
                  <li><a href="/wallet" style={{ color: '#C41E3A' }}>/wallet → Wallet</a></li>
                  <li><a href="/rewards" style={{ color: '#C41E3A' }}>/rewards → Rewards</a></li>
                </ul>
              </div>
              <button 
                onClick={() => window.location.href = '/'}
                style={{
                  background: '#C41E3A',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Go to Home (RetailBank)
              </button>
              <BottomNav />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}