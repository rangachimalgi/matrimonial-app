/**
 * Palette: black (primary), blue (atmosphere), orange (subtle accents).
 */
export const colors = {
  black: '#0B0B0C',
  white: '#FFFFFF',

  // Blue family
  blue: '#3D5A80',
  blueSoft: '#D7E3F4',
  blueMute: '#B7C9E0',
  blueDeep: '#1F3554',

  // Orange accents (use sparingly)
  orange: '#E8753A',
  orangeSoft: '#F6D2BC',
  orangeWash: 'rgba(232, 117, 58, 0.14)',

  // Surfaces
  background: '#D7E3F4',
  backgroundSoft: '#E5EEF8',
  backgroundDeep: '#B7C9E0',
  homeBg: '#EEF3F9',
  inputBg: 'rgba(255, 255, 255, 0.85)',

  // Text
  text: '#0B0B0C',
  textMuted: '#2C3340',
  textSubtle: '#6B7382',

  // Legacy aliases used across screens
  spark: '#E8753A',
  orbit: 'rgba(31, 53, 84, 0.28)',
  cloud: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(11, 11, 12, 0.08)',
  overlay: 'rgba(11, 11, 12, 0.3)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;
