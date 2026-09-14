// バージョン表示(バーガーメニュー最下部)用のファイルを生成するスクリプト。
// package.jsonの"version"(major.minor部分)と、gitのコミット数(3番目の数字)を
// 組み合わせて "1.0.47" のような文字列を作り、src/data/app-version.json に書き出す。
// npm run build のたびに自動実行される(package.jsonのbuildスクリプト参照)ので、
// 手動で書き換える必要はない。
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
const [major, minor] = pkg.version.split('.');

let commitCount = '0';
try {
  commitCount = execSync('git rev-list --count HEAD', { cwd: root }).toString().trim();
} catch {
  // gitが使えない環境(初回clone直後でコミットがまだ無い等)では0のままにする。
}

const version = `${major}.${minor}.${commitCount}`;
const outPath = path.join(root, 'src/data/app-version.json');
writeFileSync(outPath, `${JSON.stringify({ version }, null, 2)}\n`);
console.log(`app-version.json を生成しました: ${version}`);
