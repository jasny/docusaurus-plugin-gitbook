/**
 * GitBook Column component
 *
 * Individual column in a columns layout
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { ColumnProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookColumn({ children }: ColumnProps): ReactElement {
  return <div className={styles.column}>{children}</div>;
}
