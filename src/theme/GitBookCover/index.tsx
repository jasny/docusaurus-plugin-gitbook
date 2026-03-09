/**
 * GitBook Cover component
 *
 * Renders a page cover image with optional dark/light mode variants.
 * Uses CSS data-theme selectors to switch images, matching Docusaurus's
 * own ThemedImage approach — no React context required, SSR safe.
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { CoverProps } from '../../theme-types.js';
import styles from './styles.module.css';

export default function GitBookCover({ dark, light }: CoverProps): ReactElement | null {
  if (!dark && !light) return null;

  // If only one variant provided, use it for both modes
  const darkSrc = dark ?? light!;
  const lightSrc = light ?? dark!;

  if (darkSrc === lightSrc) {
    return (
      <div className={styles.cover}>
        <img src={darkSrc} alt="" />
      </div>
    );
  }

  return (
    <div className={styles.cover}>
      <img src={lightSrc} alt="" className={styles.lightModeImage} />
      <img src={darkSrc} alt="" className={styles.darkModeImage} />
    </div>
  );
}
