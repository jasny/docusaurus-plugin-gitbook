/**
 * GitBook Embed component
 *
 * Embeds external content (YouTube, Vimeo, CodePen, etc.)
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { EmbedProps } from '../types.js';
import styles from './styles.module.css';

interface EmbedInfo {
  type: 'youtube' | 'vimeo' | 'codepen' | 'codesandbox' | 'generic';
  embedUrl: string;
}

function parseEmbedUrl(url: string): EmbedInfo {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace('www.', '');

    // YouTube
    if (hostname === 'youtube.com' || hostname === 'youtu.be') {
      let videoId = '';
      if (hostname === 'youtu.be') {
        videoId = parsed.pathname.slice(1);
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
      if (videoId) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
        };
      }
    }

    // Vimeo
    if (hostname === 'vimeo.com') {
      const videoId = parsed.pathname.slice(1);
      if (videoId) {
        return {
          type: 'vimeo',
          embedUrl: `https://player.vimeo.com/video/${videoId}`,
        };
      }
    }

    // CodePen
    if (hostname === 'codepen.io') {
      const parts = parsed.pathname.split('/');
      if (parts.length >= 4) {
        const user = parts[1];
        const penId = parts[3];
        return {
          type: 'codepen',
          embedUrl: `https://codepen.io/${user}/embed/${penId}?default-tab=result`,
        };
      }
    }

    // CodeSandbox
    if (hostname === 'codesandbox.io') {
      const sandboxId = parsed.pathname.replace('/s/', '').replace('/embed/', '');
      return {
        type: 'codesandbox',
        embedUrl: `https://codesandbox.io/embed/${sandboxId}`,
      };
    }

    // Generic iframe
    return {
      type: 'generic',
      embedUrl: url,
    };
  } catch {
    return {
      type: 'generic',
      embedUrl: url,
    };
  }
}

export default function GitBookEmbed({ url }: EmbedProps): ReactElement {
  const embedInfo = parseEmbedUrl(url);

  return (
    <div className={styles.embed}>
      <iframe
        src={embedInfo.embedUrl}
        className={styles.iframe}
        title="Embedded content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <a href={url} className={styles.link} target="_blank" rel="noopener noreferrer">
        Open in new tab
      </a>
    </div>
  );
}
