import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';

const dist = resolve('dist');
const base = '/aczel.design';
const htmlFiles = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) htmlFiles.push(path);
  }
}

walk(dist);

test('build contains the expected public routes', () => {
  const required = [
    'index.html',
    'about/index.html',
    'ux-ui/index.html',
    'web-design/index.html',
    'brand-logo/index.html',
    'graphics/index.html',
    'consultation/index.html',
    '404.html',
  ];
  for (const file of required) assert.ok(existsSync(join(dist, file)), `${file} is missing`);
  assert.ok(
    htmlFiles.length >= 27,
    `expected at least 27 generated pages, found ${htmlFiles.length}`,
  );
});

test('production HTML has no Wix dependencies or branding', () => {
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    assert.doesNotMatch(html, /wixstatic|wixsite|built on wix/i, file);
  }
});

test('HTML pages include essential metadata and one main heading', () => {
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    assert.match(html, /<meta name="description"/i, `${file} has no description`);
    assert.match(html, /<link rel="canonical"/i, `${file} has no canonical URL`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${file} should have exactly one h1`);
  }
});

test('internal page links resolve inside the static build', () => {
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    for (const href of hrefs) {
      if (!href.startsWith(base) || href.includes('#') || /\.[a-z0-9]+$/i.test(href)) continue;
      const route = href.slice(base.length).replace(/^\//, '').replace(/\/$/, '');
      const target = route ? join(dist, route, 'index.html') : join(dist, 'index.html');
      assert.ok(existsSync(target), `${file} links to missing route ${href}`);
    }
  }
});
