import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';

const dist = resolve('dist');
const base = '/design';
const htmlFiles = [];
const restoredArticles = JSON.parse(readFileSync(resolve('src/data/wix-articles.json'), 'utf8'));

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

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

test('restored Wix articles keep the complete migrated content set', () => {
  const articles = Object.entries(restoredArticles);
  const blocks = articles.flatMap(([, article]) => article.blocks);
  const images = blocks.filter((block) => block.type === 'image');
  const lists = blocks.filter((block) => block.type === 'list');

  assert.equal(articles.length, 47, 'all 47 published Wix articles should be present');
  assert.equal(blocks.length, 511, 'article block count changed unexpectedly');
  assert.equal(images.length, 97, 'inline article image count changed unexpectedly');
  assert.equal(lists.length, 7, 'semantic article list count changed unexpectedly');
  assert.equal(
    lists.reduce((count, list) => count + list.items.length, 0),
    24,
    'semantic article list item count changed unexpectedly',
  );

  for (const [slug] of articles) {
    assert.ok(
      existsSync(join(dist, 'projects', slug, 'index.html')),
      `restored article has no route: ${slug}`,
    );
  }
  for (const image of images) {
    assert.ok(
      existsSync(resolve('src/assets/projects', image.file)),
      `restored article image is missing: ${image.file}`,
    );
  }
});

test('Octo Design System retains its original order and all sections', () => {
  const octo = restoredArticles['octo-design-system'];
  const headings = octo.blocks
    .filter((block) => block.type === 'heading')
    .map((block) => block.text);

  assert.equal(octo.blocks.length, 33);
  assert.equal(octo.blocks.filter((block) => block.type === 'image').length, 5);
  assert.deepEqual(headings, [
    'The Octo Design System Foundation',
    'Colors and Tokens',
    'Hierarchy',
    'Component Layer',
    'Icons',
    'Summary',
  ]);
});

test('restored article copy retains its original inline formatting', () => {
  const richBlocks = Object.values(restoredArticles)
    .flatMap((article) => article.blocks)
    .filter((block) => block.html);
  const markup = richBlocks.map((block) => block.html).join('');

  assert.equal(richBlocks.length, 42, 'rich-text block count changed unexpectedly');
  assert.equal((markup.match(/<strong>/g) ?? []).length, 26);
  assert.equal((markup.match(/<em>/g) ?? []).length, 6);
  assert.equal((markup.match(/<u>/g) ?? []).length, 2);
  assert.equal((markup.match(/<a href=/g) ?? []).length, 21);
});

test('restored articles render source titles, heading levels, and image captions', () => {
  for (const [slug, article] of Object.entries(restoredArticles)) {
    const html = readFileSync(join(dist, 'projects', slug, 'index.html'), 'utf8');
    assert.ok(
      html.includes(
        `<h1 class="text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">${escapeHtml(article.sourceTitle)}</h1>`,
      ),
      `${slug} does not use its original article title`,
    );

    for (const block of article.blocks) {
      if (block.type === 'heading') {
        const level = block.level === 2 ? 2 : block.level === 3 ? 3 : 4;
        assert.ok(
          html.includes(`<h${level}`) && html.includes(escapeHtml(block.text)),
          `${slug} is missing heading level ${level}: ${block.text}`,
        );
      }
      if (block.type === 'image' && block.caption) {
        assert.ok(
          html.includes(`<figcaption`) && html.includes(escapeHtml(block.caption)),
          `${slug} is missing image caption: ${block.caption}`,
        );
      }
    }
  }
});

test('consecutive source images render as galleries', () => {
  const pubcrawl = readFileSync(join(dist, 'projects', 'pubcrawl-budapest', 'index.html'), 'utf8');

  assert.match(
    pubcrawl,
    /class="my-10 grid items-start gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"/,
    'PubCrawl screenshots should render as a responsive gallery',
  );
  for (const image of ['wix-post-08-01', 'wix-post-08-02', 'wix-post-08-03']) {
    assert.ok(pubcrawl.includes(image), `PubCrawl gallery is missing ${image}`);
  }
});

test('project images are wired to the shared lightbox', () => {
  const pubcrawl = readFileSync(join(dist, 'projects', 'pubcrawl-budapest', 'index.html'), 'utf8');

  assert.match(pubcrawl, /<dialog[^>]*data-image-lightbox/);
  assert.ok(
    (pubcrawl.match(/data-lightbox-image/g) ?? []).length >= 4,
    'PubCrawl cover and gallery images should open in the lightbox',
  );
});

test('Graphics preserves every source section, image, and caption', () => {
  const graphics = readFileSync(join(dist, 'graphics', 'index.html'), 'utf8');

  for (const section of ['Editorial Design', 'Packaging &amp; Wearables']) {
    assert.ok(graphics.includes(section), `Graphics is missing ${section}`);
  }
  for (const caption of [
    'BLACK by Aczel - photo book',
    'Everything Else by Aczel - photo book',
    'Isaac Asimov - Foundation',
    'Isaac Asimov - Foundation and Empire',
    'Isaac Asimov - Second Foundation',
    "Vernon Sullivan - The Girls don't Understand",
    'Vernon Sullivan - I Spit on your Graves',
    'Hex - Red and White wine label',
    'Budapest Honey',
    'Octomind Swag',
    'UX department swag',
  ]) {
    assert.ok(graphics.includes(caption), `Graphics is missing caption: ${caption}`);
  }
  assert.equal((graphics.match(/data-lightbox-image="true"/g) ?? []).length, 11);
  assert.doesNotMatch(graphics, /project-card-link/);
  assert.ok(!existsSync(join(dist, 'projects', 'book-covers', 'index.html')));
  assert.ok(!existsSync(join(dist, 'projects', 'hex-wine-label', 'index.html')));
  assert.ok(!existsSync(join(dist, 'projects', 'budapest-souvenir', 'index.html')));
});
