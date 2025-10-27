#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function sortCssFile(content) {
  // First, let's restore the original content structure and then sort
  const lines = content.split('\n');
  const result = [];

  // Collect imports and @rules first
  const imports = [];
  const atRules = [];
  const cssRules = [];

  let currentRule = '';
  let braceCount = 0;
  let i = 0;

  // Process line by line
  while (i < lines.length) {
    const line = lines[i].trim();

    // Handle imports
    if (line.startsWith('@use') || line.startsWith('@import')) {
      imports.push(lines[i]);
      i++;
      continue;
    }

    // Handle comments
    if (line.startsWith('//')) {
      atRules.push(lines[i]);
      i++;
      continue;
    }

    // Handle @keyframes and other @rules
    if (line.startsWith('@keyframes') || line.startsWith('@media')) {
      let atRule = '';
      let atBraceCount = 0;

      while (i < lines.length) {
        const atLine = lines[i];
        atRule += atLine + '\n';

        const openBraces = (atLine.match(/{/g) || []).length;
        const closeBraces = (atLine.match(/}/g) || []).length;
        atBraceCount += openBraces - closeBraces;

        i++;

        if (atBraceCount === 0 && atLine.trim().endsWith('}')) {
          break;
        }
      }

      atRules.push(atRule.trim());
      continue;
    }

    // Handle CSS selectors
    if (line && !line.startsWith('@')) {
      let rule = '';
      braceCount = 0;

      while (i < lines.length) {
        const ruleLine = lines[i];
        rule += ruleLine + '\n';

        const openBraces = (ruleLine.match(/{/g) || []).length;
        const closeBraces = (ruleLine.match(/}/g) || []).length;
        braceCount += openBraces - closeBraces;

        i++;

        if (braceCount === 0 && ruleLine.trim().endsWith('}')) {
          break;
        }
      }

      if (rule.trim()) {
        cssRules.push(sortPropertiesInRule(rule.trim()));
      }
      continue;
    }

    i++;
  }

  // Sort CSS rules alphabetically by selector
  cssRules.sort((a, b) => {
    const selectorA = a.split('{')[0].trim().toLowerCase();
    const selectorB = b.split('{')[0].trim().toLowerCase();
    return selectorA.localeCompare(selectorB);
  });

  // Combine everything
  const output = [];
  if (imports.length) output.push(...imports, '');
  if (atRules.length) output.push(...atRules, '');
  if (cssRules.length) output.push(...cssRules);

  return (
    output
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim() + '\n'
  );
}

function sortPropertiesInRule(rule) {
  const lines = rule.split('\n');
  const selectorLine = lines[0];
  const closingBrace = lines[lines.length - 1];

  // Extract properties (lines that contain : but not { or })
  const properties = [];
  const nestedRules = [];

  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (
      trimmed.includes(':') &&
      !trimmed.includes('{') &&
      !trimmed.includes('}')
    ) {
      properties.push(line);
    } else if (trimmed) {
      nestedRules.push(line);
    }
  }

  // Sort properties alphabetically
  properties.sort((a, b) => {
    const propA = a.trim().split(':')[0].trim().toLowerCase();
    const propB = b.trim().split(':')[0].trim().toLowerCase();
    return propA.localeCompare(propB);
  });

  // Rebuild the rule
  const result = [selectorLine];
  result.push(...properties);
  result.push(...nestedRules);
  result.push(closingBrace);

  return result.join('\n');
}

// Main execution
if (process.argv.length > 2) {
  const filePath = process.argv[2];

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const sortedContent = sortCssFile(content);
    fs.writeFileSync(filePath, sortedContent);
    console.log(`Sorted CSS selectors and properties in ${filePath}`);
  } else {
    console.error(`File not found: ${filePath}`);
  }
}
