/**
 * FAIcon component
 *
 * Renders Font Awesome icons using CSS classes.
 * Requires Font Awesome CSS to be loaded (e.g., @fortawesome/fontawesome-free).
 */

import React from 'react';
import type { ReactElement } from 'react';
import type { FAIconProps } from '../../theme-types.js';

export default function FAIcon({ icon }: FAIconProps): ReactElement {
  return <i className={icon} aria-hidden="true" />;
}
