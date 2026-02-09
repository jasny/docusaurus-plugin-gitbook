/**
 * GitBook OpenAPI component
 *
 * Displays a reference to an OpenAPI endpoint.
 *
 * Note: This is a simplified display component. For full interactive
 * OpenAPI documentation, consider using docusaurus-openapi-docs plugin.
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { OpenAPIProps } from '../types.js';
import styles from './styles.module.css';

// HTTP method color mapping
const methodColors: Record<string, string> = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
  HEAD: 'head',
  OPTIONS: 'options',
};

export default function GitBookOpenAPI({
  src,
  path,
  method,
}: OpenAPIProps): ReactElement {
  const methodClass = methodColors[method.toUpperCase()] || 'get';

  return (
    <div className={styles.openapi}>
      <div className={styles.header}>
        <span className={`${styles.method} ${styles[methodClass]}`}>
          {method.toUpperCase()}
        </span>
        <code className={styles.path}>{path}</code>
      </div>
      <div className={styles.source}>
        <span className={styles.label}>OpenAPI Spec:</span>
        <a href={src} className={styles.link} target="_blank" rel="noopener noreferrer">
          {src}
        </a>
      </div>
    </div>
  );
}
