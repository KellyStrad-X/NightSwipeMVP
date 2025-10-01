/**
 * NightSwipe Theme Constants
 * Central source for colors, typography, spacing, and design tokens
 */

export const colors = {
  // Background
  background: {
    primary: '#0f172a', // Dark navy (slate-900)
    secondary: '#1e293b', // Lighter navy (slate-800)
    gradient: ['#0f172a', '#1e293b', '#334155'], // Dark gradient
  },

  // Brand Accents
  accent: {
    cyan: '#22d3ee', // Neon cyan - primary brand
    purple: '#7c3aed', // Purple - secondary accent
    orange: '#f97316', // Orange - tertiary accent
  },

  // Text
  text: {
    primary: '#e5e7eb', // Light gray (gray-200)
    secondary: '#9ca3af', // Medium gray (gray-400)
    inverse: '#0f172a', // Dark text on light backgrounds
  },

  // UI States
  ui: {
    success: '#10b981', // Green
    error: '#ef4444', // Red
    warning: '#f59e0b', // Amber
    info: '#3b82f6', // Blue
  },

  // Card & Surface
  surface: {
    card: '#1e293b', // Card background
    cardBorder: '#334155', // Card border
    overlay: 'rgba(15, 23, 42, 0.9)', // Modal overlay
  },
};

export const typography = {
  // Font Families (React Native defaults to system fonts)
  family: {
    default: 'System',
    mono: 'Courier',
  },

  // Font Sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },

  // Font Weights
  weight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: {
    shadowColor: colors.accent.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Animation durations (in ms)
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Screen dimensions helpers
export const layout = {
  screenPadding: spacing.lg,
  cardSpacing: spacing.md,
  buttonHeight: 56,
  iconSize: {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },
};
