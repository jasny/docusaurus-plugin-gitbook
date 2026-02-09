/**
 * GitBook Tab component
 *
 * Individual tab content panel
 */

import React from 'react';
import type { TabProps } from '../types.js';
import styles from './styles.module.css';

export interface GitBookTabProps extends TabProps {
  isActive?: boolean;
}

export default function GitBookTab({
  title: _title,
  children,
  isActive = true,
}: GitBookTabProps): React.ReactElement | null {
  if (!isActive) {
    return null;
  }

  return <div className={styles.tabPanel}>{children}</div>;
}
