/**
 * GitBook Card component
 *
 * Individual card in a cards grid
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { CardProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookCard({
  title,
  href,
  children,
}: CardProps): ReactElement {
  return (
    <a href={href} className={styles.card}>
      <div className={styles.title}>{title}</div>
      {children && <div className={styles.content}>{children}</div>}
    </a>
  );
}
