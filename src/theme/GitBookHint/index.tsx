/**
 * GitBook Hint component
 *
 * Renders a callout box with different styles (info, warning, danger, success)
 */

import React from 'react';
import type { HintProps, HintStyle } from '../../theme-types.js';
import styles from './styles.module.css';

const STYLE_ICONS: Record<HintStyle, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚨',
  success: '✅',
};

export default function GitBookHint({ style, children }: HintProps): React.ReactElement {
  const icon = STYLE_ICONS[style];

  return (
    <div className={`${styles.hint} ${styles[style]}`}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
