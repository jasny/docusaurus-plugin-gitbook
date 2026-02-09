/**
 * GitBook Updates component
 *
 * Container for changelog/update entries
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { UpdatesProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookUpdates({
  format = 'full',
  children,
}: UpdatesProps): ReactElement {
  return (
    <div className={`${styles.updates} ${styles[format]}`}>{children}</div>
  );
}
