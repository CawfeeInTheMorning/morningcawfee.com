const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

function rep(old, neo, label) {
  if (!c.includes(old)) { console.error('NOT FOUND:', label); process.exit(1); }
  c = c.replace(old, neo);
  console.log('OK:', label);
}

// Remove the col-lg-8/row wrapper close tags (the open was already removed)
// Current: ...last card</a></div>(skills_cards)</div>(col)</div>(row)</div>(outer)<div id="work">
// Target:  ...last card</a></div>(skills_cards)</div>(outer)<div id="work">
rep(
  '</a></div></div></div></div><div id="work">',
  '</a></div></div><div id="work">',
  'skills cards remove col wrapper (close)'
);

// Remove --bs-gutter-x on work_experience
rep(
  '  .row.work_experience { padding-top: 24vh !important; padding-bottom: 24vh !important; }',
  '  .row.work_experience { padding-top: 24vh !important; padding-bottom: 24vh !important; --bs-gutter-x: 0 !important; }',
  'work_experience gutter'
);

// Move about_accent to right
rep(
  '  .about_accent { position: absolute; right: calc(var(--screen-x) - .75rem); left: auto; top: 50%; transform: translateY(-50%); width: 1.75rem; height: auto; pointer-events: none; z-index: 1; }',
  '  .about_accent { position: absolute; right: calc(var(--screen-x) - .75rem); left: auto; top: 50%; transform: translateY(-50%); width: 1.75rem; height: auto; pointer-events: none; z-index: 1; }',
  'about_accent right (already done?)'
);

fs.writeFileSync('index.html', c, 'utf8');

const v = fs.readFileSync('index.html', 'utf8');
console.log('\nskills no col wrapper:', !v.includes('offset-lg-2 offset-sm-1 col-12'));
console.log('work gutter 0:', v.includes('--bs-gutter-x: 0'));
const accentCheck = v.includes('right: calc(var(--screen-x) - .75rem)') && !v.includes('left: calc(var(--screen-x) - .75rem)');
console.log('about_accent right only:', accentCheck);
