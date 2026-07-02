const fs = require('fs');
const path = require('path');

// ── Helpers ───────────────────────────────────────────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

// ── Clean dist ────────────────────────────────────────────────────────────────
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');

// ── Read source ───────────────────────────────────────────────────────────────
let c = fs.readFileSync('index.html', 'utf8');
const origSize = c.length;

// ── Production cleanups ───────────────────────────────────────────────────────

// 1. Strip Google Tag Manager script tags
c = c.replace(/<script[^>]*src="https:\/\/www\.googletagmanager[^"]*"[^>]*><\/script>/g, '');
c = c.replace(/<script[^>]*>[\s\S]*?window\.dataLayer[\s\S]*?<\/script>/g, '');
c = c.replace(/<noscript[^>]*><iframe[^>]*googletagmanager[^>]*><\/iframe><\/noscript>/g, '');

// 2. Strip Framer analytics / telemetry
c = c.replace(/<script[^>]*src="https:\/\/events\.framer\.com[^"]*"[^>]*><\/script>/g, '');
c = c.split('window.dbbRum').join('window._dbbRum_removed');
c = c.split('"Initializing Framer Analytics Anonymous"').join('"[removed]"');

// 3. Disable Framer login fetch (makes unnecessary auth requests)
c = c.split('window.__framerLoginFetch = fetch(').join('window.__framerLoginFetch = false && fetch(');

// 4. Remove speculation rules (Framer prefetch — irrelevant for our domain)
c = c.split('speculationrules').join('speculationrules-removed');

// 5. Fix canonical URL (still points to framer.com in the SSR blob)
c = c.split('https://www.framer.com/').join('https://morningcawfee.com/');
c = c.split('"url": "https://www.framer.com"').join('"url": "https://morningcawfee.com"');

// 6. Fix OG / Twitter meta if still Framer-branded
c = c.replace(/<meta property="og:url" content="[^"]*framer[^"]*">/g,
  '<meta property="og:url" content="https://morningcawfee.com/">');
c = c.replace(/<meta property="og:site_name" content="[^"]*Framer[^"]*">/g,
  '<meta property="og:site_name" content="MorningCawfee">');

// 7. Suppress Framer hydration console errors (they're harmless but noisy in prod)
const titleLock = '<script>(function(){'
  + 'var ce=console.error;'
  + 'console.error=function(){'
  + 'var a=Array.from(arguments).join(" ");'
  + 'if(a.includes("Hydration")||a.includes("#418")||a.includes("#422"))return;'
  + 'ce.apply(console,arguments);'
  + '};'
  + '})();<\/script>';
c = c.replace('<head>', '<head>\n' + titleLock);

// ── Write dist/index.html ─────────────────────────────────────────────────────
fs.writeFileSync('dist/index.html', c, 'utf8');

// ── Copy assets and fonts ─────────────────────────────────────────────────────
copyDir('assets', 'dist/assets');
copyDir('fonts',  'dist/fonts');

// ── Report ────────────────────────────────────────────────────────────────────
const distSize = fs.statSync('dist/index.html').size;
console.log(`Build complete.`);
console.log(`  index.html : ${(origSize/1024).toFixed(1)} KB -> ${(distSize/1024).toFixed(1)} KB`);
console.log(`  assets/    : copied`);
console.log(`  fonts/     : copied`);
console.log(`  Output     : dist/`);
