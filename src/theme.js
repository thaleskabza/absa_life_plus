// src/theme.ts
export const tokens = {
    colors: {
        // Brand Colors
        absaRed: '#E30613',
        absaRedDark: '#C10511',
        absaRedLight: '#F0323C',
        absaRose: '#B80A2A',
        // Neutral Colors
        bg: '#F7F7F7',
        panel: '#FFFFFF',
        text: '#1D1D1B',
        textSecondary: '#5B5B58',
        textTertiary: '#9B9B9B',
        border: '#EEEEEE',
        borderHover: '#DDDDDD',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
        xxxl: '48px',
    },
    radius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 6px 24px rgba(0, 0, 0, 0.12)',
        lg: '0 12px 48px rgba(0, 0, 0, 0.18)',
    },
    typography: {
        fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
        fontSize: {
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '32px',
        },
        fontWeight: {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        },
    },
    transitions: {
        fast: '0.15s ease-in-out',
        normal: '0.2s ease-in-out',
        slow: '0.3s ease-in-out',
    },
};
