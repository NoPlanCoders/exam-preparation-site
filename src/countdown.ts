import { getAllExamPeriods } from './schedule.js';
import { QUIZ_EXAMS } from './data/exams.js';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export type TestCountdownPhase =
  | 'before' // 試験開始前。targetは開始日時。
  | 'during' // 試験期間中。targetは終了日時。
  | 'none'; // src/schedule.ts に登録されている試験の日程がない、またはすべて終了した。

export interface TestCountdown {
  hours: number;
  days: number;
  target: Date;
  phase: TestCountdownPhase;
  examId?: string;
  examName?: string;
}

// 「今日を含む・まだ終わっていない試験期間」を、開始日が早い順に探す。
// 開始前ならその試験の開始日時まで、期間中ならその試験の終了日時までをカウントする。
// その試験期間が終われば、次に登録されている試験期間へ自動的に切り替わる。
export function getTestCountdown(now = new Date()): TestCountdown {
  const period = getAllExamPeriods().find((p) => now <= p.end);

  if (!period) {
    return { hours: 0, days: 0, target: now, phase: 'none' };
  }

  const phase: TestCountdownPhase = now < period.start ? 'before' : 'during';
  const target = phase === 'before' ? period.start : period.end;
  const remaining = target.getTime() - now.getTime();
  const examName = QUIZ_EXAMS.find((exam) => exam.id === period.examId)?.name;

  return {
    hours: Math.ceil(remaining / HOUR_MS),
    days: Math.floor(remaining / DAY_MS),
    target,
    phase,
    examId: period.examId,
    examName,
  };
}
