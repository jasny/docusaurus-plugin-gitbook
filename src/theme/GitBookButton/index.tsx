/**
 * GitBook Button component
 *
 * Styled button link with primary/secondary variants
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { ButtonProps } from '../types.js';
import styles from './styles.module.css';

export default function GitBookButton({
  href,
  variant = 'primary',
  icon: _icon,
  children,
}: ButtonProps): ReactElement {
  return (
    <a
      href={href}
      className={`${styles.button} ${styles[variant]}`}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}
