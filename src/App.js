import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx - Fixed routing to ensure "/" goes to RetailBank
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RetailBank from './pages/RetailBank';
import Discover from './pages/Discover';
import Mentors from './pages/Mentors';
import Quiz from './pages/Quiz';
// Import BottomNav for placeholder pages
import BottomNav from './ui/BottomNav';
// Placeholder components for remaining routes
const Wallet = () => (_jsxs("div", { style: { minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px', textAlign: 'center' }, children: [_jsx("h1", { children: "Wallet" }), _jsx("p", { children: "Your cards and payment methods" }), _jsx("div", { style: { position: 'fixed', bottom: 0, left: 0, right: 0 }, children: _jsx(BottomNav, {}) })] }));
const Rewards = () => (_jsxs("div", { style: { minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '40px', textAlign: 'center' }, children: [_jsx("h1", { children: "Rewards" }), _jsx("p", { children: "Your loyalty points and benefits" }), _jsx("div", { style: { position: 'fixed', bottom: 0, left: 0, right: 0 }, children: _jsx(BottomNav, {}) })] }));
export default function App() {
    return (_jsx(Router, { children: _jsxs("div", { style: {
                fontFamily: 'system-ui, -apple-system, sans-serif',
                margin: 0,
                padding: 0,
                minHeight: '100vh'
            }, children: [_jsx("style", { children: `
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
        ` }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(RetailBank, {}) }), "           ", _jsx(Route, { path: "/mentors", element: _jsx(Mentors, {}) }), "       ", _jsx(Route, { path: "/Concierge", element: _jsx(Discover, {}) }), "    ", _jsx(Route, { path: "/wallet", element: _jsx(Wallet, {}) }), "         ", _jsx(Route, { path: "/rewards", element: _jsx(Rewards, {}) }), "       ", _jsx(Route, { path: "/offers", element: _jsx(Discover, {}) }), "       ", _jsx(Route, { path: "/quiz", element: _jsx(Quiz, {}) }), "             ", _jsx(Route, { path: "*", element: _jsxs("div", { style: {
                                    minHeight: '100vh',
                                    background: '#1a1a1a',
                                    color: '#fff',
                                    padding: '40px',
                                    textAlign: 'center'
                                }, children: [_jsx("h1", { children: "Debug: 404 - Route Not Found" }), _jsxs("p", { children: [_jsx("strong", { children: "Current URL:" }), " ", window.location.href] }), _jsxs("p", { children: [_jsx("strong", { children: "Pathname:" }), " ", window.location.pathname] }), _jsxs("div", { style: { background: '#333', padding: '20px', borderRadius: '8px', margin: '20px 0' }, children: [_jsx("h3", { children: "Available routes:" }), _jsxs("ul", { style: { textAlign: 'left', display: 'inline-block' }, children: [_jsx("li", { children: _jsx("a", { href: "/", style: { color: '#C41E3A' }, children: "/ \u2192 RetailBank (Home)" }) }), _jsx("li", { children: _jsx("a", { href: "/mentors", style: { color: '#C41E3A' }, children: "/mentors \u2192 Mentors" }) }), _jsx("li", { children: _jsx("a", { href: "/Concierge", style: { color: '#C41E3A' }, children: "/Concierge \u2192 Discover (Life+)" }) }), _jsx("li", { children: _jsx("a", { href: "/wallet", style: { color: '#C41E3A' }, children: "/wallet \u2192 Wallet" }) }), _jsx("li", { children: _jsx("a", { href: "/rewards", style: { color: '#C41E3A' }, children: "/rewards \u2192 Rewards" }) })] })] }), _jsx("button", { onClick: () => window.location.href = '/', style: {
                                            background: '#C41E3A',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '12px 24px',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            cursor: 'pointer'
                                        }, children: "Go to Home (RetailBank)" }), _jsx(BottomNav, {})] }) })] })] }) }));
}
