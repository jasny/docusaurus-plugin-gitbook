/**
 * Shared types for GitBook theme components
 */

import type { ReactNode } from 'react';

/**
 * Tabs component props
 */
export interface TabsProps {
  children: ReactNode;
}

/**
 * Tab component props
 */
export interface TabProps {
  title: string;
  children: ReactNode;
}

/**
 * Stepper component props
 */
export interface StepperProps {
  children: ReactNode;
}

/**
 * Step component props
 */
export interface StepProps {
  stepNumber?: number;
  children: ReactNode;
}

/**
 * Columns component props
 */
export interface ColumnsProps {
  children: ReactNode;
}

/**
 * Column component props
 */
export interface ColumnProps {
  children: ReactNode;
}

/**
 * Updates component props
 */
export interface UpdatesProps {
  format?: 'full' | 'compact';
  children: ReactNode;
}

/**
 * Update component props
 */
export interface UpdateProps {
  date: string;
  children: ReactNode;
}

/**
 * CodeBlock component props
 */
export interface CodeBlockProps {
  title: string;
  lineNumbers?: boolean;
  overflow?: 'wrap' | 'scroll';
  children: ReactNode;
}

/**
 * Embed component props
 */
export interface EmbedProps {
  url: string;
}

/**
 * File component props
 */
export interface FileProps {
  src: string;
  children?: ReactNode;
}

/**
 * Cards component props
 */
export interface CardsProps {
  children: ReactNode;
}

/**
 * Card component props
 */
export interface CardProps {
  title: string;
  href: string;
  children?: ReactNode;
}

/**
 * Button component props
 */
export interface ButtonProps {
  href: string;
  variant?: 'primary' | 'secondary';
  icon?: string;
  children: ReactNode;
}

/**
 * FAIcon component props
 */
export interface FAIconProps {
  icon: string;
}

/**
 * Expression component props
 */
export interface ExpressionProps {
  expression: string;
  value?: string;
}

/**
 * Include component props
 */
export interface IncludeProps {
  src: string;
}

/**
 * OpenAPI component props
 */
export interface OpenAPIProps {
  src: string;
  path: string;
  method: string;
}

/**
 * Cover component props
 */
export interface CoverProps {
  dark?: string;
  light?: string;
}
