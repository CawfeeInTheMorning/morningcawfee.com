const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// ── 1. Revert js-cursor rename ────────────────────────────────────────────────
c = c.replace(/\bcursor-extend\b/g, 'js-cursor-extend');
c = c.replace(/\bcursor-contract\b/g, 'js-cursor-contract');

// ── 2. Fix typewriter split: the literal newline inside split('...') is a SyntaxError
// Find the broken split and replace with a proper regex split
// The file has: txt.split('<LF>') — a literal newline inside quotes
const brokenSplit = /txt\.split\(['"][^'"]*['"]\)/;
c = c.replace(brokenSplit, "txt.split(/\\r?\\n/)");

fs.writeFileSync('index.html', c, 'utf8');

const v = fs.readFileSync('index.html', 'utf8');
console.log('js-cursor-extend:', (v.match(/js-cursor-extend/g) || []).length, 'occurrences');
console.log('js-cursor-contract:', (v.match(/js-cursor-contract/g) || []).length, 'occurrences');
const splitIdx = v.indexOf('txt.split(');
console.log('typewriter split fixed:', JSON.stringify(v.slice(splitIdx, splitIdx + 25)));
