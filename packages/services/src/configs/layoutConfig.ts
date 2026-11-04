import type { LayoutVariant } from './settingsService';

export interface LayoutVariantConfig {
  id: LayoutVariant;
  label: string;
  description: string;
  iconType: 'standard' | 'command_center' | 'focus' | 'tabbed';
}

export const DASHBOARD_LAYOUT_VARIANTS: LayoutVariantConfig[] = [
  {
    id: 'standard',
    label: 'Standard Grid',
    description: 'Balanced layout with metrics top and task stream left.',
    iconType: 'standard',
  },
  {
    id: 'command_center',
    label: 'Command Center',
    description: 'Asymmetric Bento grid for high-density monitoring.',
    iconType: 'command_center',
  },
  {
    id: 'focus',
    label: 'Focus Mode',
    description: 'Task-first wide stream with compact sidebar utilities.',
    iconType: 'focus',
  },
  {
    id: 'tabbed',
    label: 'Tabbed Workspace',
    description: 'Minimalist view separating stream, analytics, and timers.',
    iconType: 'tabbed',
  },
];