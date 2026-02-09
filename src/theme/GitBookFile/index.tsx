/**
 * GitBook File component
 *
 * Displays a downloadable file with description
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { FileProps } from '../../theme-types.js';
import styles from './styles.module.css';

const FILE_ICONS: Record<string, string> = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  xls: '📊',
  xlsx: '📊',
  ppt: '📽️',
  pptx: '📽️',
  zip: '📦',
  rar: '📦',
  tar: '📦',
  gz: '📦',
  png: '🖼️',
  jpg: '🖼️',
  jpeg: '🖼️',
  gif: '🖼️',
  svg: '🖼️',
  mp3: '🎵',
  mp4: '🎬',
  wav: '🎵',
  default: '📁',
};

function getFileExtension(src: string): string {
  const parts = src.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

function getFileName(src: string): string {
  const parts = src.split('/');
  return parts[parts.length - 1];
}

function getFileIcon(extension: string): string {
  return FILE_ICONS[extension] || FILE_ICONS.default;
}

export default function GitBookFile({ src, children }: FileProps): ReactElement {
  const extension = getFileExtension(src);
  const fileName = getFileName(src);
  const icon = getFileIcon(extension);

  return (
    <div className={styles.file}>
      <a href={src} className={styles.link} download>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.name}>{fileName}</span>
      </a>
      {children && <div className={styles.description}>{children}</div>}
    </div>
  );
}
