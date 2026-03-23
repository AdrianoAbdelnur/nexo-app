import { Platform } from 'react-native';

const palette = {
  primary: '#005f8f',
  primaryStrong: '#0a567f',
  primaryDeep: '#0b4f75',
  primarySoft: '#2f8fc3',
  secondaryBlue: '#1ea6df',
  surface: '#ffffff',
  surfaceLow: '#f6fafd',
  surfaceHigh: '#eaf3fa',
  surfaceStrong: '#d6e6f2',
  border: '#b8ccdb',
  textMain: '#13202b',
  textMuted: '#415a6b',
  accentInfo: '#bde7ff',
  accentOrange: '#ff8a00',
  accentOrangeStrong: '#f47a00',
  accentOrangeSoft: '#ffe1c2',
  accentWarning: '#ffe1c2',
  accentDanger: '#ba1a1a',
} as const;

export const Colors = {
  light: {
    text: palette.textMain,
    background: palette.surface,
    tint: palette.primary,
    icon: palette.textMuted,
    tabIconDefault: '#6f7681',
    tabIconSelected: palette.primary,
    card: '#ffffff',
    border: palette.border,
    topBar: palette.surfaceLow,
  },
  dark: {
    text: '#f8f9fb',
    background: '#0a3957',
    tint: '#ffffff',
    icon: '#c9d6eb',
    tabIconDefault: '#9fb2cf',
    tabIconSelected: '#ffffff',
    card: '#0f4468',
    border: '#3c678a',
    topBar: '#124c74',
  },
  brand: palette,
} as const;

export const OperationalPalette = palette;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    display: 'ui-rounded',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    display: 'normal',
  },
  web: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'Segoe UI', system-ui, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    display: "Manrope, 'Segoe UI', system-ui, sans-serif",
  },
})!;
