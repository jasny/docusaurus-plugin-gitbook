/**
 * GitBook Tabs component
 *
 * Container for tabbed content with tab bar
 */

import React, { useState, Children, isValidElement, cloneElement } from 'react';
import type { ReactElement } from 'react';
import type { TabsProps } from '../types.js';
import styles from './styles.module.css';

interface TabInfo {
  title: string;
  index: number;
}

interface TabChildProps {
  title?: string;
  isActive?: boolean;
}

export default function GitBookTabs({ children }: TabsProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);

  // Extract tab titles from children
  const tabs: TabInfo[] = [];
  Children.forEach(children, (child, index) => {
    if (isValidElement<TabChildProps>(child) && child.props.title) {
      tabs.push({
        title: child.props.title,
        index,
      });
    }
  });

  // Render children with isActive prop
  const renderedChildren = Children.map(children, (child, index) => {
    if (isValidElement<TabChildProps>(child)) {
      return cloneElement(child, {
        isActive: index === activeIndex,
      });
    }
    return child;
  });

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.index}
            className={`${styles.tab} ${tab.index === activeIndex ? styles.active : ''}`}
            role="tab"
            aria-selected={tab.index === activeIndex}
            onClick={() => setActiveIndex(tab.index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.tabPanels}>{renderedChildren}</div>
    </div>
  );
}
