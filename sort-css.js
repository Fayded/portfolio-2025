#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function sortCssSelectors(cssContent) {
  // Split content into blocks (selectors and their rules)
  const blocks = [];
  let currentBlock = '';
  let braceCount = 0;
  let inSelector = false;

  const lines = cssContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip @rules, comments, and empty lines at the top level
    if (
      line.trim().startsWith('@') ||
      line.trim().startsWith('//') ||
      line.trim() === ''
    ) {
      if (braceCount === 0) {
        // Add to separate blocks if we're at top level
        if (currentBlock.trim()) {
          blocks.push(currentBlock);
          currentBlock = '';
        }
        blocks.push(line);
        continue;
      }
    }

    currentBlock += line + '\n';

    // Count braces to track nesting
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    braceCount += openBraces - closeBraces;

    // If we've closed all braces, this block is complete
    if (braceCount === 0 && currentBlock.trim() && line.includes('}')) {
      blocks.push(currentBlock.trim());
      currentBlock = '';
    }
  }

  // Add any remaining content
  if (currentBlock.trim()) {
    blocks.push(currentBlock.trim());
  }

  // Separate selectors from other content (imports, keyframes, etc.)
  const imports = [];
  const keyframes = [];
  const selectors = [];
  const other = [];

  blocks.forEach((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('@use') || trimmed.startsWith('@import')) {
      imports.push(block);
    } else if (trimmed.startsWith('@keyframes') || trimmed.startsWith('//')) {
      keyframes.push(block);
    } else if (trimmed.includes('{') && !trimmed.startsWith('@')) {
      // Sort properties within the selector
      const sortedBlock = sortPropertiesInBlock(block);
      selectors.push(sortedBlock);
    } else if (trimmed) {
      other.push(block);
    }
  });

  // Sort selectors alphabetically
  selectors.sort((a, b) => {
    const selectorA = a.split('{')[0].trim().toLowerCase();
    const selectorB = b.split('{')[0].trim().toLowerCase();
    return selectorA.localeCompare(selectorB);
  });

  // Combine everything back together
  const result = [];
  if (imports.length) result.push(...imports, '');
  if (keyframes.length) result.push(...keyframes, '');
  if (selectors.length) result.push(...selectors);
  if (other.length) result.push(...other);

  return (
    result
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n'
  );
}

function sortPropertiesInBlock(block) {
  const lines = block.split('\n');
  const result = [];
  let currentSelector = '';
  let properties = [];
  let nestedRules = [];
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track brace nesting
    const openBraces = (line.match(/{/g) || []).length;
    const closeBraces = (line.match(/}/g) || []).length;
    braceCount += openBraces - closeBraces;

    if (braceCount === 1 && trimmed.includes(':') && !trimmed.includes('{')) {
      // This is a CSS property
      properties.push(line);
    } else if (braceCount > 1 || (trimmed.includes('{') && braceCount > 0)) {
      // This is a nested rule
      nestedRules.push(line);
    } else {
      // This is selector or closing brace
      if (currentSelector === '' && trimmed.includes('{')) {
        currentSelector = line;
      } else if (trimmed === '}' && braceCount === 0) {
        // Sort properties alphabetically
        properties.sort((a, b) => {
          const propA = a.trim().split(':')[0].trim().toLowerCase();
          const propB = b.trim().split(':')[0].trim().toLowerCase();
          return propA.localeCompare(propB);
        });

        // Build the sorted block
        result.push(currentSelector);
        result.push(...properties);
        result.push(...nestedRules);
        result.push(line);

        // Reset for next block
        currentSelector = '';
        properties = [];
        nestedRules = [];
      } else {
        result.push(line);
      }
    }
  }

  return result.join('\n');
}

// Main execution
if (process.argv.length > 2) {
  const filePath = process.argv[2];

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const sortedContent = sortCssSelectors(content);
    fs.writeFileSync(filePath, sortedContent);
    console.log(`Sorted CSS selectors in ${filePath}`);
  } else {
    console.error(`File not found: ${filePath}`);
  }
}
