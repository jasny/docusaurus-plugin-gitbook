/**
 * GitBook Cards component
 *
 * Grid container for card navigation
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { CardsProps } from '../types.js';
import styles from './styles.module.css';

export default function GitBookCards({ children }: CardsProps): ReactElement {
  return <div className={styles.cards}>{children}</div>;
}
