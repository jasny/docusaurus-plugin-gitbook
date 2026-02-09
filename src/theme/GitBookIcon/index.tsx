/**
 * GitBook Icon component
 *
 * Displays inline icons
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { IconProps } from '../types.js';
import styles from './styles.module.css';

// Simple emoji fallback for common Font Awesome icons
const ICON_MAP: Record<string, string> = {
  // Status
  check: '✓',
  'check-circle': '✓',
  times: '✕',
  'times-circle': '✕',
  warning: '⚠',
  'exclamation-triangle': '⚠',
  'info-circle': 'ℹ',
  info: 'ℹ',
  question: '?',
  'question-circle': '?',

  // Actions
  download: '↓',
  upload: '↑',
  edit: '✎',
  pencil: '✎',
  trash: '🗑',
  copy: '📋',
  link: '🔗',
  'external-link': '↗',
  search: '🔍',
  cog: '⚙',
  gear: '⚙',

  // Objects
  file: '📄',
  folder: '📁',
  image: '🖼',
  video: '🎬',
  music: '🎵',
  code: '💻',
  terminal: '💻',
  book: '📖',
  envelope: '✉',
  calendar: '📅',
  clock: '🕐',
  user: '👤',
  users: '👥',
  star: '⭐',
  heart: '❤',
  bolt: '⚡',
  fire: '🔥',
  lock: '🔒',
  unlock: '🔓',
  key: '🔑',

  // Arrows
  'arrow-up': '↑',
  'arrow-down': '↓',
  'arrow-left': '←',
  'arrow-right': '→',
  'chevron-up': '▲',
  'chevron-down': '▼',
  'chevron-left': '◀',
  'chevron-right': '▶',

  // Brands (simplified)
  github: '🐙',
  twitter: '🐦',

  // Default
  circle: '●',
};

export default function GitBookIcon({ name }: IconProps): ReactElement {
  const icon = ICON_MAP[name] || ICON_MAP.circle;

  return (
    <span className={styles.icon} aria-label={name}>
      {icon}
    </span>
  );
}
