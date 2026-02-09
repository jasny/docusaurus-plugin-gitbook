/**
 * GitBook Include component
 *
 * Displays a reference to an included file.
 *
 * Note: This component renders a placeholder/notice for the include.
 * For full build-time file inclusion in Docusaurus, use native MDX imports:
 *
 *   import Content from '.gitbook/includes/disclaimer.md';
 *   <Content />
 *
 * This component is useful for:
 * - Showing what files should be included when migrating from GitBook
 * - Providing a fallback when the included file isn't available
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { IncludeProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookInclude({ src }: IncludeProps): ReactElement {
  // Extract filename from path
  const filename = src.split('/').pop() || src;

  return (
    <div className={styles.include}>
      <span className={styles.icon}>📄</span>
      <div className={styles.content}>
        <span className={styles.label}>Included content:</span>
        <code className={styles.path}>{src}</code>
        <span className={styles.hint}>
          For build-time inclusion, use MDX imports:
          <code className={styles.code}>
            {`import ${filename.replace(/[.-]/g, '_').replace(/\.md$/, '')} from '${src}';`}
          </code>
        </span>
      </div>
    </div>
  );
}
