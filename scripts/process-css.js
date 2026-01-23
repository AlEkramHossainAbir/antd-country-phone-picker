/**
 * Post-build script to process CSS and remove :global() syntax
 * This fixes the "global is not recognized as a valid pseudo-class" error
 */

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'dist', 'index.css');

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  
  // Remove :global() wrapper - convert :global(.selector) to .selector
  css = css.replace(/:global\(([^)]+)\)/g, '$1');
  
  // Remove standalone :global
  css = css.replace(/:global\s+/g, '');
  
  fs.writeFileSync(cssPath, css);
  console.log('✅ CSS processed successfully - :global() syntax removed');
} else {
  console.log('⚠️  dist/index.css not found');
}
