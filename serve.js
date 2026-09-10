#!/usr/bin/env node
// Dev server: builds once (with placeholder markers), serves dist/ with clean
// URLs, rebuilds when anything in src/ changes. Zero dependencies.
//   node serve.js            → http://localhost:8080
//   PORT=3000 node serve.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 8080;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json'
};

function rebuild() {
  try {
    // Fresh process so edited templates/content are re-required.
    execFileSync(process.execPath, [path.join(ROOT, 'build.js'), '--mark-placeholders'], { stdio: 'inherit' });
  } catch (e) {
    console.error('build failed');
  }
}

rebuild();

let timer = null;
fs.watch(path.join(ROOT, 'src'), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 120);
});

http
  .createServer((req, res) => {
    // Dev stub for the lead endpoint so the form can be exercised locally.
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (c) => (body += c));
      req.on('end', () => {
        console.log('POST', req.url, body.slice(0, 400));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true,"dev":true}');
      });
      return;
    }
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    let file = path.join(DIST, urlPath);
    if (!file.startsWith(DIST)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      res.writeHead(301, { Location: urlPath + '/' });
      return res.end();
    }
    if (!fs.existsSync(file)) {
      const m = urlPath.match(/^\/(\w\w)\//);
      const nf = m && fs.existsSync(path.join(DIST, m[1], '404.html')) ? path.join(DIST, m[1], '404.html') : path.join(DIST, '404.html');
      res.writeHead(404, { 'Content-Type': MIME['.html'] });
      return res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'Not found');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`dev server → http://localhost:${PORT}/  (watching src/)`));
