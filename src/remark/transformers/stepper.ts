/**
 * Stepper block transformer
 *
 * Transforms {% stepper %}{% step %}content{% endstep %}{% endstepper %}
 * into GitBookStepper/GitBookStep components
 */

import type { Content } from 'mdast';
import type { GitBookBlock } from '../../parser/index.js';
import { createMdxJsxElement } from '../utils.js';
import { registerTransformer, type BlockTransformer } from './index.js';

/**
 * Transform a stepper block into MDX JSX elements
 */
const stepperTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  // Process child step blocks
  const stepElements: Content[] = [];
  let stepNumber = 1;

  for (const child of block.children) {
    if (child.name === 'step') {
      const stepContent = transformContent(child.content);

      const stepElement = createMdxJsxElement(
        'GitBookStep',
        { stepNumber: String(stepNumber) },
        stepContent
      );
      stepElements.push(stepElement);
      stepNumber++;
    }
  }

  if (stepElements.length === 0) {
    return null;
  }

  // Create the stepper container
  const element = createMdxJsxElement('GitBookStepper', {}, stepElements);

  return [element];
};

/**
 * Step blocks are handled as children of stepper
 */
const stepTransformer: BlockTransformer = (
  block: GitBookBlock,
  transformContent: (content: string) => Content[]
): Content[] | null => {
  // Standalone step - render with step number 1
  const children = transformContent(block.content);
  const element = createMdxJsxElement('GitBookStep', { stepNumber: '1' }, children);

  return [element];
};

// Register transformers
registerTransformer('stepper', stepperTransformer);
registerTransformer('step', stepTransformer);

export { stepperTransformer, stepTransformer };
