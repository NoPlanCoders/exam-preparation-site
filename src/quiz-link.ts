// URLのクエリ文字列から「開きたい試験・科目・出題設定」を読み取る。
//
//   ?exam=<試験ID>                        … その試験の科目一覧を開く
//   ?exam=<試験ID>&subject=<科目ID>       … その科目のクイズをすぐに開始する(出題数は全問)
//   &count=<出題数>                       … 出題数(省略・all・不正な値は全問。問題数を超える場合も全問)
//   &mode=mastery                         … 全問正解(手書きは全問確認)モードで開始する
//
// 試験IDは src/data/exams.ts、科目IDは各試験フォルダの subjects.ts の id と同じ。
// ここでは文字列の解釈だけを行い、IDが実在するかどうかは呼び出し側(app.ts)で確認する。
export interface QuizLink {
  examId: string;
  subjectId?: string;
  /** 出題数。undefined のときは全問。 */
  count?: number;
  mastery: boolean;
}

export function parseQuizLink(search: string): QuizLink | null {
  const params = new URLSearchParams(search);
  const examId = params.get('exam')?.trim();
  if (!examId) return null;

  const subjectId = params.get('subject')?.trim() || undefined;

  const rawCount = params.get('count')?.trim();
  const parsedCount = rawCount ? Number(rawCount) : NaN;
  const count = Number.isInteger(parsedCount) && parsedCount > 0 ? parsedCount : undefined;

  return { examId, subjectId, count, mastery: params.get('mode') === 'mastery' };
}
