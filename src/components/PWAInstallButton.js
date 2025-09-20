import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/PWAInstallButton.tsx
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
export default function PWAInstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
            // Show the install button
            setShowInstallButton(true);
        };
        const handleAppInstalled = () => {
            console.log('PWA was installed');
            setShowInstallButton(false);
            setDeferredPrompt(null);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);
        // Check if app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setShowInstallButton(false);
        }
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);
    const handleInstallClick = async () => {
        if (!deferredPrompt)
            return;
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        else {
            console.log('User dismissed the install prompt');
        }
        // Clear the deferredPrompt variable
        setDeferredPrompt(null);
        setShowInstallButton(false);
    };
    if (!showInstallButton) {
        return null;
    }
    return (_jsx("div", { style: {
            position: 'fixed',
            bottom: '100px', // Above bottom nav
            right: 'var(--space-3)',
            zIndex: 1000,
            background: '#fff',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-2)',
            padding: '8px'
        }, children: _jsxs(Button, { variant: "primary", size: "sm", onClick: handleInstallClick, style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                borderRadius: 'var(--radius-pill)'
            }, children: [_jsx("span", { className: "material-icons-outlined", style: { fontSize: '18px' }, children: "get_app" }), "Install App"] }) }));
}
