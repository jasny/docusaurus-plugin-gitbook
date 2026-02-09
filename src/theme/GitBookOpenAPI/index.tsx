/**
 * GitBook OpenAPI component
 *
 * Fetches an OpenAPI spec and displays endpoint details inline.
 * Shows method badge, path, description, parameters, and response codes.
 *
 * When docusaurus-theme-openapi-docs is installed, users get full API
 * documentation via that plugin. This component serves as a lightweight
 * inline endpoint viewer for {% openapi %} blocks.
 */

import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import type { OpenAPIProps } from '../../theme-types.js';
import styles from './styles.module.css';

interface ParameterInfo {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
  schema?: { type?: string };
}

interface ResponseInfo {
  description?: string;
}

interface EndpointInfo {
  summary?: string;
  description?: string;
  parameters?: ParameterInfo[];
  responses?: Record<string, ResponseInfo>;
}

// Simple in-memory cache for fetched specs
const specCache = new Map<string, Record<string, unknown>>();

export default function GitBookOpenAPI({
  src,
  path,
  method,
}: OpenAPIProps): ReactElement {
  const [endpoint, setEndpoint] = useState<EndpointInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedMethod = method.toLowerCase();
  const displayMethod = method.toUpperCase();

  useEffect(() => {
    let cancelled = false;

    async function fetchSpec() {
      try {
        let spec: Record<string, unknown>;

        if (specCache.has(src)) {
          spec = specCache.get(src)!;
        } else {
          const res = await fetch(src);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          spec = await res.json();
          specCache.set(src, spec);
        }

        if (cancelled) return;

        const paths = spec.paths as
          | Record<string, Record<string, EndpointInfo>>
          | undefined;
        const pathObj = paths?.[path];
        const methodObj = pathObj?.[normalizedMethod];

        if (methodObj) {
          setEndpoint(methodObj);
        } else {
          setError(`Endpoint ${displayMethod} ${path} not found in spec`);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            `Failed to load spec: ${err instanceof Error ? err.message : String(err)}`
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchSpec();
    return () => {
      cancelled = true;
    };
  }, [src, path, normalizedMethod, displayMethod]);

  return (
    <div className={styles.openapi}>
      <div className={styles.header}>
        <span className={`${styles.method} ${styles[normalizedMethod] || ''}`}>
          {displayMethod}
        </span>
        <code className={styles.path}>{path}</code>
      </div>

      {loading && (
        <div className={styles.loading}>Loading API details…</div>
      )}

      {error && (
        <div className={styles.details}>
          <div className={styles.error}>{error}</div>
          <div className={styles.source}>
            <a
              href={src}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View OpenAPI Spec
            </a>
          </div>
        </div>
      )}

      {endpoint && (
        <div className={styles.details}>
          {endpoint.summary && (
            <div className={styles.summary}>{endpoint.summary}</div>
          )}
          {endpoint.description && (
            <div className={styles.description}>{endpoint.description}</div>
          )}

          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Parameters</h4>
              <table className={styles.paramTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>In</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoint.parameters.map((param) => (
                    <tr key={`${param.in}-${param.name}`}>
                      <td>
                        <code>{param.name}</code>
                      </td>
                      <td>{param.in}</td>
                      <td>{param.schema?.type || '—'}</td>
                      <td>{param.required ? 'Yes' : 'No'}</td>
                      <td>{param.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {endpoint.responses &&
            Object.keys(endpoint.responses).length > 0 && (
              <div className={styles.section}>
                <h4 className={styles.sectionTitle}>Responses</h4>
                <div className={styles.responseList}>
                  {Object.entries(endpoint.responses).map(([code, info]) => (
                    <div key={code} className={styles.responseRow}>
                      <span
                        className={`${styles.statusCode} ${
                          code.startsWith('2')
                            ? styles.statusSuccess
                            : code.startsWith('4') || code.startsWith('5')
                              ? styles.statusError
                              : styles.statusInfo
                        }`}
                      >
                        {code}
                      </span>
                      <span className={styles.responseDesc}>
                        {info.description || '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className={styles.source}>
            <a
              href={src}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full OpenAPI Spec
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
