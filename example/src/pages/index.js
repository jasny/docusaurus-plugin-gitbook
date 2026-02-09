import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary')}
      style={{ padding: '4rem 0' }}
    >
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Example site demonstrating GitBook syntax in Docusaurus"
    >
      <HomepageHeader />
      <main style={{ padding: '2rem' }}>
        <div className="container">
          <div className="row">
            <div className="col col--4">
              <div className="text--center">
                <h3>Easy Migration</h3>
                <p>
                  Migrate from GitBook to Docusaurus without rewriting all your
                  content.
                </p>
              </div>
            </div>
            <div className="col col--4">
              <div className="text--center">
                <h3>Full Support</h3>
                <p>
                  Supports hints, tabs, stepper, columns, embeds, and more
                  GitBook syntax.
                </p>
              </div>
            </div>
            <div className="col col--4">
              <div className="text--center">
                <h3>Customizable</h3>
                <p>
                  Full CSS variable support for customizing the look and feel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
