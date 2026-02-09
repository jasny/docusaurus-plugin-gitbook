/**
 * GitBook Step component
 *
 * Individual step in a stepper sequence
 */

import React from 'react';
import type { ReactElement } from 'react';
import styles from './styles.module.css';

export interface GitBookStepProps {
  stepNumber: number | string;
  children: React.ReactNode;
}

export default function GitBookStep({
  stepNumber,
  children,
}: GitBookStepProps): ReactElement {
  return (
    <div className={styles.step}>
      <div className={styles.stepIndicator}>
        <div className={styles.stepNumber}>{stepNumber}</div>
        <div className={styles.stepLine} />
      </div>
      <div className={styles.stepContent}>{children}</div>
    </div>
  );
}
