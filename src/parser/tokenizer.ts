/**
 * GitBook tag tokenizer
 * Tokenizes {% tag %} syntax into structured tokens
 */

export type TokenType = 'open' | 'close' | 'self-closing';

export interface Token {
  type: TokenType;
  name: string;
  attributes: Record<string, string>;
  raw: string;
  start: number;
  end: number;
}

export interface TextSegment {
  type: 'text';
  content: string;
  start: number;
  end: number;
}

export type Segment = Token | TextSegment;

// Regex to match {% ... %} tags
const TAG_PATTERN = /\{%\s*([^%]+?)\s*%\}/g;

// Regex to parse tag content: tagname followed by optional attributes
const TAG_CONTENT_PATTERN = /^(end)?(\w+)(?:\s+(.*))?$/;

// Regex to parse attributes: key="value" or key='value' or key=value or just key
const ATTR_PATTERN = /(\w+)(?:=(?:"([^"]*)"|'([^']*)'|(\S+)))?/g;

// Regex to match standalone quoted strings (positional arguments)
const POSITIONAL_QUOTED_PATTERN = /^"([^"]*)"|^'([^']*)'/;

/**
 * Parse attributes string into key-value pairs
 */
export function parseAttributes(attrString: string): Record<string, string> {
  const attributes: Record<string, string> = {};

  if (!attrString) {
    return attributes;
  }

  // Check for positional quoted string first (e.g., include "path/to/file.md")
  const positionalMatch = POSITIONAL_QUOTED_PATTERN.exec(attrString.trim());
  if (positionalMatch) {
    // Store positional value with special key
    attributes._positional = positionalMatch[1] ?? positionalMatch[2];

    // Continue parsing remaining attributes after the positional value
    const remaining = attrString.trim().slice(positionalMatch[0].length).trim();
    if (remaining) {
      let match: RegExpExecArray | null;
      ATTR_PATTERN.lastIndex = 0;
      while ((match = ATTR_PATTERN.exec(remaining)) !== null) {
        const key = match[1];
        const value = match[2] ?? match[3] ?? match[4] ?? 'true';
        attributes[key] = value;
      }
    }
    return attributes;
  }

  let match: RegExpExecArray | null;
  ATTR_PATTERN.lastIndex = 0;
  while ((match = ATTR_PATTERN.exec(attrString)) !== null) {
    const key = match[1];
    // Value can be in double quotes, single quotes, unquoted, or boolean (no value)
    const value = match[2] ?? match[3] ?? match[4] ?? 'true';
    attributes[key] = value;
  }

  return attributes;
}

/**
 * Tokenize a single tag match
 */
function tokenizeTag(match: RegExpExecArray): Token | null {
  const raw = match[0];
  const content = match[1].trim();
  const start = match.index;
  const end = start + raw.length;

  const contentMatch = TAG_CONTENT_PATTERN.exec(content);
  if (!contentMatch) {
    return null;
  }

  const isEnd = contentMatch[1] === 'end';
  const name = contentMatch[2];
  const attrString = contentMatch[3] || '';

  // Self-closing tags are tags that don't have content (like embed, include)
  // We'll determine this based on known self-closing tags or context
  const selfClosingTags = ['embed', 'include'];
  const isSelfClosing = !isEnd && selfClosingTags.includes(name);

  return {
    type: isEnd ? 'close' : isSelfClosing ? 'self-closing' : 'open',
    name,
    attributes: isEnd ? {} : parseAttributes(attrString),
    raw,
    start,
    end,
  };
}

/**
 * Find fenced code block regions in text.
 * Returns an array of {start, end} character offsets for each code block.
 */
function findCodeBlockRegions(text: string): Array<{ start: number; end: number }> {
  const regions: Array<{ start: number; end: number }> = [];
  const lines = text.split('\n');
  let pos = 0;
  let inCodeBlock = false;
  let codeBlockStart = 0;
  let fenceChar = '';
  let fenceLen = 0;

  for (const line of lines) {
    const trimmed = line.trimStart();

    if (!inCodeBlock) {
      const openMatch = trimmed.match(/^(`{3,}|~{3,})/);
      if (openMatch) {
        inCodeBlock = true;
        codeBlockStart = pos;
        fenceChar = openMatch[1][0];
        fenceLen = openMatch[1].length;
      }
    } else {
      // Closing fence must use same char and be at least as long
      const closeMatch = trimmed.match(/^(`{3,}|~{3,})\s*$/);
      if (closeMatch && closeMatch[1][0] === fenceChar && closeMatch[1].length >= fenceLen) {
        inCodeBlock = false;
        regions.push({ start: codeBlockStart, end: pos + line.length });
      }
    }

    pos += line.length + 1; // +1 for \n
  }

  return regions;
}

/**
 * Check if a character offset falls inside any code block region.
 */
function isInsideCodeBlock(
  index: number,
  regions: Array<{ start: number; end: number }>
): boolean {
  return regions.some((r) => index >= r.start && index <= r.end);
}

/**
 * Tokenize text into segments (tokens and text)
 */
export function tokenize(text: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;

  // Pre-compute fenced code block regions to skip tags inside them
  const codeBlockRegions = findCodeBlockRegions(text);

  TAG_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TAG_PATTERN.exec(text)) !== null) {
    // Skip tags inside fenced code blocks — treat them as plain text
    if (isInsideCodeBlock(match.index, codeBlockRegions)) {
      continue;
    }

    // Add text before this tag
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
        start: lastIndex,
        end: match.index,
      });
    }

    // Tokenize the tag
    const token = tokenizeTag(match);
    if (token) {
      segments.push(token);
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex),
      start: lastIndex,
      end: text.length,
    });
  }

  return segments;
}

/**
 * Check if a segment is a token (not text)
 */
export function isToken(segment: Segment): segment is Token {
  return segment.type !== 'text';
}

/**
 * Check if a segment is a text segment
 */
export function isTextSegment(segment: Segment): segment is TextSegment {
  return segment.type === 'text';
}
