/**
 * GitBook Stepper component
 *
 * Container for sequential steps
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { StepperProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookStepper({ children }: StepperProps): ReactElement {
  return <div className={styles.stepper}>{children}</div>;
}
