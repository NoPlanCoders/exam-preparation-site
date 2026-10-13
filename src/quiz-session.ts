// 進行中のクイズを localStorage に保存し、ページを更新・再起動しても続きから再開するための
// 保存データの型・検証・起動時の判断。DOMやデータ(registry)には依存しない純粋な処理だけを置く。
//
// 出題中の設問そのもの(選択肢をシャッフルした設問オブジェクト)は保存せず、
//   「元の問題データの何番目か」+「選択肢の並び順」
// だけを保存する。設問は再開時に registry の最新データから組み立て直すので、
// 画像(data URI)などの大きなデータを保存せずに済む。

export const SESSION_STORAGE_KEY = 'quiz-active-session';
/** この時間を過ぎた保存データは再開に使わない。 */
export const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export interface SavedItem {
  /** 元の問題データ(getQuestions)の何番目か。 */
  orig: number;
  /** 選択肢の並び順(元の選択肢番号を表示順に並べたもの)。選択式以外は null。 */
  order: number[] | null;
  /** 元の問題文のハッシュ。問題データが更新されて別の問題になっていないか確認するため。 */
  hash: string;
}

export interface SavedSession {
  version: 1;
  savedAt: number;
  examId: string;
  examName: string;
  subjectId: string;
  subjectName: string;
  /** 出題に使う設問(重複なし)。queue / wrong / masteryRemaining はここへの番号で表す。 */
  items: SavedItem[];
  queue: number[];
  wrong: number[];
  masteryRemaining: number[] | null;
  index: number;
  score: number;
  answered: boolean;
  masteryMode: boolean;
  masteryTotal: number;
  masteryRecorded: boolean;
  /** 保存した時点の画面。 */
  view: 'quiz' | 'result';
}

export function hashText(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

function isIndexList(value: unknown, max: number): value is number[] {
  return (
    Array.isArray(value) &&
    value.every((n) => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n < max)
  );
}

function isCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

/**
 * localStorage から読んだ文字列を検証して返す。
 * 壊れている・形式が違う・古すぎる場合は null(= 再開しない)。
 */
export function parseSavedSession(raw: string | null, now: number): SavedSession | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object') return null;
  const s = data as Record<string, unknown>;

  if (s.version !== 1) return null;
  if (typeof s.savedAt !== 'number' || now - s.savedAt > SESSION_MAX_AGE_MS || s.savedAt > now + 60_000) {
    return null;
  }
  for (const key of ['examId', 'examName', 'subjectId', 'subjectName'] as const) {
    if (typeof s[key] !== 'string' || !s[key]) return null;
  }
  if (s.view !== 'quiz' && s.view !== 'result') return null;
  if (
    typeof s.answered !== 'boolean' ||
    typeof s.masteryMode !== 'boolean' ||
    typeof s.masteryRecorded !== 'boolean' ||
    !isCount(s.index) ||
    !isCount(s.score) ||
    !isCount(s.masteryTotal)
  ) {
    return null;
  }

  if (!Array.isArray(s.items) || s.items.length === 0) return null;
  const items: SavedItem[] = [];
  for (const item of s.items) {
    if (!item || typeof item !== 'object') return null;
    const { orig, order, hash } = item as Record<string, unknown>;
    if (!isCount(orig) || typeof hash !== 'string') return null;
    if (order !== null && !(Array.isArray(order) && isIndexList(order, order.length))) return null;
    items.push({ orig, order: order as number[] | null, hash });
  }

  const count = items.length;
  if (!isIndexList(s.queue, count) || s.queue.length === 0) return null;
  if (!isIndexList(s.wrong, count)) return null;
  if (s.masteryRemaining !== null && !isIndexList(s.masteryRemaining, count)) return null;
  if (s.masteryMode !== (s.masteryRemaining !== null)) return null;
  if (s.index > s.queue.length) return null;

  return {
    version: 1,
    savedAt: s.savedAt,
    examId: s.examId as string,
    examName: s.examName as string,
    subjectId: s.subjectId as string,
    subjectName: s.subjectName as string,
    items,
    queue: s.queue,
    wrong: s.wrong,
    masteryRemaining: s.masteryRemaining as number[] | null,
    index: s.index,
    score: s.score,
    answered: s.answered,
    masteryMode: s.masteryMode,
    masteryTotal: s.masteryTotal,
    masteryRecorded: s.masteryRecorded,
    view: s.view,
  };
}

/** order が 0〜length-1 の並べ替え(重複・欠けなし)になっているか。 */
export function isPermutation(order: number[], length: number): boolean {
  return order.length === length && new Set(order).size === length && order.every((n) => n >= 0 && n < length);
}

export type StartupAction = 'restore' | 'link' | 'library';

/**
 * 起動時にどの画面から始めるか。
 * - 更新(reload)・戻る/進む(back_forward)では、URLにクイズ指定があっても保存済みの続きを優先する
 *   (そうしないと、直リンクのURLのまま更新したときに最初からやり直しになってしまう)。
 * - 新しくURLを開いた場合(navigate)は、クイズ指定のあるURLを優先する
 *   (保存データが残っていても、友達から送られたリンクが無視されないように)。
 * - どちらもなければライブラリ画面。
 */
export function decideStartup(options: {
  hasSaved: boolean;
  hasLink: boolean;
  navigationType: string;
}): StartupAction {
  const { hasSaved, hasLink, navigationType } = options;
  const isReload = navigationType === 'reload' || navigationType === 'back_forward';
  if (isReload && hasSaved) return 'restore';
  if (hasLink) return 'link';
  if (hasSaved) return 'restore';
  return 'library';
}
