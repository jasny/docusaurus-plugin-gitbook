/**
 * GitBook Columns component
 *
 * Container for side-by-side columns
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { ColumnsProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookColumns({ children }: ColumnsProps): ReactElement {
  return <div className={styles.columns}>{children}</div>;
}
