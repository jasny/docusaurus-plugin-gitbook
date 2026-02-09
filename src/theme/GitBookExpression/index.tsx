/**
 * GitBook Expression component
 *
 * Displays dynamic variable values
 *
 * Note: In a full implementation, this would receive variables from
 * a context provider that reads from .gitbook/vars.yaml and frontmatter.
 * For now, it displays the expression as a placeholder.
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { ExpressionProps } from '../types.js';
import styles from './styles.module.css';

export default function GitBookExpression({
  expression,
  value,
}: ExpressionProps): ReactElement {
  // If a pre-evaluated value is provided, use it
  if (value !== undefined) {
    return <span className={styles.expression}>{value}</span>;
  }

  // Otherwise, display the expression as a placeholder
  // In production, this would be evaluated against actual variables
  return (
    <span className={styles.expression} title={`Expression: ${expression}`}>
      {`{${expression}}`}
    </span>
  );
}
