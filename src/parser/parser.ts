/**
 * GitBook block parser
 * Parses tokenized GitBook syntax into a structured tree
 */

import {
  tokenize,
  isTextSegment,
  type Token,
  type Segment,
} from './tokenizer.js';

export interface GitBookBlock {
  name: string;
  attributes: Record<string, string>;
  content: string;
  children: GitBookBlock[];
  raw: string;
  start: number;
  end: number;
}

export interface ParseResult {
  blocks: GitBookBlock[];
  errors: ParseError[];
}

export interface ParseError {
  message: string;
  start: number;
  end: number;
}

interface ParseContext {
  segments: Segment[];
  index: number;
  errors: ParseError[];
  source: string;
}

/**
 * Parse a block starting from an open token
 */
function parseBlock(ctx: ParseContext, openToken: Token): GitBookBlock | null {
  const children: GitBookBlock[] = [];
  const contentParts: string[] = [];

  while (ctx.index < ctx.segments.length) {
    const segment = ctx.segments[ctx.index];

    if (isTextSegment(segment)) {
      contentParts.push(segment.content);
      ctx.index++;
      continue;
    }

    // It's a token
    if (segment.type === 'close' && segment.name === openToken.name) {
      // Found matching close tag
      ctx.index++;

      const content = contentParts.join('');
      const endPos = segment.end;

      return {
        name: openToken.name,
        attributes: openToken.attributes,
        content: content.trim(),
        children,
        raw: ctx.source.slice(openToken.start, endPos),
        start: openToken.start,
        end: endPos,
      };
    }

    if (segment.type === 'close') {
      // Mismatched close tag - error
      ctx.errors.push({
        message: `Unexpected closing tag {% end${segment.name} %}, expected {% end${openToken.name} %}`,
        start: segment.start,
        end: segment.end,
      });
      ctx.index++;
      continue;
    }

    if (segment.type === 'self-closing') {
      // Self-closing tag becomes a child
      children.push({
        name: segment.name,
        attributes: segment.attributes,
        content: '',
        children: [],
        raw: segment.raw,
        start: segment.start,
        end: segment.end,
      });
      ctx.index++;
      continue;
    }

    if (segment.type === 'open') {
      // Nested block - recurse
      ctx.index++;
      const childBlock = parseBlock(ctx, segment);
      if (childBlock) {
        children.push(childBlock);
      }
      continue;
    }

    ctx.index++;
  }

  // Reached end without finding close tag
  ctx.errors.push({
    message: `Unclosed tag {% ${openToken.name} %}, expected {% end${openToken.name} %}`,
    start: openToken.start,
    end: openToken.end,
  });

  // Return what we have anyway
  return {
    name: openToken.name,
    attributes: openToken.attributes,
    content: contentParts.join('').trim(),
    children,
    raw: ctx.source.slice(openToken.start),
    start: openToken.start,
    end: ctx.source.length,
  };
}

/**
 * Parse GitBook block syntax from text
 */
export function parse(text: string): ParseResult {
  const segments = tokenize(text);
  const blocks: GitBookBlock[] = [];
  const ctx: ParseContext = {
    segments,
    index: 0,
    errors: [],
    source: text,
  };

  while (ctx.index < segments.length) {
    const segment = segments[ctx.index];

    if (isTextSegment(segment)) {
      // Skip top-level text
      ctx.index++;
      continue;
    }

    if (segment.type === 'close') {
      // Orphan close tag
      ctx.errors.push({
        message: `Unexpected closing tag {% end${segment.name} %} without matching open tag`,
        start: segment.start,
        end: segment.end,
      });
      ctx.index++;
      continue;
    }

    if (segment.type === 'self-closing') {
      blocks.push({
        name: segment.name,
        attributes: segment.attributes,
        content: '',
        children: [],
        raw: segment.raw,
        start: segment.start,
        end: segment.end,
      });
      ctx.index++;
      continue;
    }

    if (segment.type === 'open') {
      ctx.index++;
      const block = parseBlock(ctx, segment);
      if (block) {
        blocks.push(block);
      }
      continue;
    }

    ctx.index++;
  }

  return { blocks, errors: ctx.errors };
}

/**
 * Find all blocks of a specific type in parsed result
 */
export function findBlocks(
  blocks: GitBookBlock[],
  name: string
): GitBookBlock[] {
  const result: GitBookBlock[] = [];

  for (const block of blocks) {
    if (block.name === name) {
      result.push(block);
    }
    result.push(...findBlocks(block.children, name));
  }

  return result;
}

/**
 * Extract content between GitBook tags, returning both the content
 * and remaining text
 */
export function extractBlocks(
  text: string
): { blocks: GitBookBlock[]; textSegments: Array<{ content: string; start: number; end: number }> } {
  const textSegments: Array<{ content: string; start: number; end: number }> = [];
  const parseResult = parse(text);

  // Collect text segments that are not part of any block
  let lastBlockEnd = 0;

  for (const block of parseResult.blocks) {
    if (block.start > lastBlockEnd) {
      const content = text.slice(lastBlockEnd, block.start);
      if (content.trim()) {
        textSegments.push({
          content,
          start: lastBlockEnd,
          end: block.start,
        });
      }
    }
    lastBlockEnd = block.end;
  }

  // Add trailing text
  if (lastBlockEnd < text.length) {
    const content = text.slice(lastBlockEnd);
    if (content.trim()) {
      textSegments.push({
        content,
        start: lastBlockEnd,
        end: text.length,
      });
    }
  }

  return {
    blocks: parseResult.blocks,
    textSegments,
  };
}
