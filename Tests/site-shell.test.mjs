import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFile(path.join(root, file), 'utf8');

test('アプリシェルが必要な画面とPWA参照を持つ', async () => {
  const html = await read('public/index.html');
  const manifest = JSON.parse(await read('public/manifest.webmanifest'));
  const serviceWorker = await read('public/sw.js');

  for (const id of [
    'view-exam',
    'view-subject',
    'view-settings',
    'view-dashboard',
    'view-quiz',
    'view-result',
    'splash-screen',
    'menu-panel',
    'menu-install',
    'dark-mode-toggle',
    'dashboard-remaining-hours',
    'dashboard-remaining-days',
  ]) {
    assert.match(html, new RegExp(`id="${id}"`), `#${id} がありません`);
  }

  assert.match(html, /rel="manifest"\s+href="manifest\.webmanifest"/);
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.icons.length >= 2, 'PWAアイコンが不足しています');
  assert.match(serviceWorker, /const CACHE_NAME = '[^']+'/);
  assert.match(serviceWorker, /'\.\/css\/style\.css'/);
  assert.match(serviceWorker, /'\.\/js\/bundle\.js'/);
});

test('アニメーションが通常時と縮小モーション時の両方で定義されている', async () => {
  const css = await read('public/css/style.css');
  const bundle = await read('public/js/bundle.js');

  for (const keyframe of ['view-enter', 'list-enter', 'surface-enter', 'gentle-fade-in']) {
    assert.match(css, new RegExp(`@keyframes ${keyframe}`), `${keyframe} がありません`);
  }
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.view\.view-entering/);
  assert.match(css, /\.menu-panel\.menu-panel-entering/);
  assert.match(css, /@keyframes splash-mark-in/);
  assert.match(css, /\.splash-screen\.is-hiding/);
  assert.match(css, /@media \(max-width: 699px\)/);
  assert.match(css, /\.main-app \.app-main-nav \{[\s\S]*position: fixed/);
  assert.match(css, /@media \(max-width: 480px\) \{[\s\S]*\.subject-mode-row \.subject-card-controls \{[\s\S]*display: grid/);
  assert.match(bundle, /view\.classList\.add\(['"]view-entering/);
  assert.match(bundle, /beforeinstallprompt/);
  assert.match(bundle, /appinstalled/);
  assert.match(bundle, /dismissSplash/);
});
