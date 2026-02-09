/**
 * GitBook Update component
 *
 * Individual update entry in an updates timeline
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { UpdateProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookUpdate({
  date,
  children,
}: UpdateProps): ReactElement {
  // Format date if provided
  let formattedDate = date;
  try {
    if (date) {
      const dateObj = new Date(date);
      formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  } catch {
    // Keep original date string if parsing fails
  }

  return (
    <div className={styles.update}>
      <div className={styles.timeline}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>
      <div className={styles.content}>
        {date && <time className={styles.date}>{formattedDate}</time>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
