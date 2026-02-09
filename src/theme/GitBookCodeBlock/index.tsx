/**
 * GitBook Code Block component
 *
 * Wraps a code block with a title/filename header
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { CodeBlockProps } from '../types.js';
import styles from './styles.module.css';

export default function GitBookCodeBlock({
  title,
  lineNumbers: _lineNumbers,
  overflow = 'scroll',
  children,
}: CodeBlockProps): ReactElement {
  return (
    <div className={`${styles.codeBlock} ${styles[overflow]}`}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
