// GitHub Pages has no SPA rewrite: serving the app shell as 404.html keeps deep links and refreshes working.
import { copyFileSync, writeFileSync } from 'node:fs'
copyFileSync('docs/index.html', 'docs/404.html')
writeFileSync('docs/.nojekyll', '')
console.log('postbuild: wrote docs/404.html and docs/.nojekyll')
