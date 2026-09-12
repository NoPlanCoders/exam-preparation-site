// 試験ごとの時間割データ。
// 新しい試験の時間割を追加するときは、EXAM_SCHEDULESに examId をキーとして
// 1件追加するだけでよい(試験そのものの追加は src/data/exams.ts と
// src/data/registry.ts の手順に従うこと。ここへの追加は任意で、時間割が
// 用意できていない試験は「試験日程」画面で未登録として案内される)。

export interface SchedulePeriod {
  time: string;
  subject: string;
  room?: string;
  // 学校の時間割上「選択科目」扱いの授業かどうか。このサイトのクイズ側の
  // 履修科目/選択科目の分類(pinして表示するかどうか)とは別の、独立した
  // 学校側の分類。クイズがまだ登録されていない科目にも付けられる。
  isElective?: boolean;
}

export interface ScheduleDay {
  month: number; // 1-12
  day: number;
}

export interface ScheduleDayEntry extends ScheduleDay {
  periods: SchedulePeriod[];
}

export interface ExamSchedule {
  year: number;
  days: ScheduleDayEntry[];
}

const WEEKDAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'];

export function weekdayLabel(year: number, month: number, day: number): string {
  return WEEKDAY_LABELS[new Date(year, month - 1, day).getDay()];
}

// examId(src/data/exams.ts の id と一致させる)ごとの時間割。
const EXAM_SCHEDULES: Record<string, ExamSchedule> = {
  '4i-zenki-kimatsu': {
    // 出典: 2026年度 4年生 前期期末 時間割(I組分を抜粋)。
    // 注意: 配布された時間割PDF自体の日付表記は実際より1日前にずれていたため、
    // ここでは実際の日付(2026年9月15日(火)〜19日(土))に修正して格納している。
    year: 2026,
    days: [
      {
        month: 9,
        day: 15,
        periods: [
          { time: '1限 9:30〜10:20', subject: 'データベース', room: '322' },
          { time: '2限 10:30〜11:20', subject: '国語4a', room: '322' },
          { time: '3限 11:30〜12:20', subject: '(授業なし)' },
          { time: '4限 13:30〜14:20', subject: '韓国語Ⅰa', room: '022', isElective: true },
        ],
      },
      {
        month: 9,
        day: 16,
        periods: [
          { time: '1限 9:30〜10:20', subject: '制御工学', room: '322' },
          { time: '2限 10:30〜11:20', subject: '英語4a', room: '322' },
          { time: '3限 11:30〜12:20', subject: 'オペレーティングシステム', room: '322' },
          { time: '4限 13:30〜14:20', subject: '英語演習4a', room: '022', isElective: true },
        ],
      },
      {
        month: 9,
        day: 17,
        periods: [
          { time: '1限 9:30〜10:20', subject: '応用物理a', room: '322' },
          { time: '2限 10:30〜11:20', subject: 'メカトロニクスa', room: '322' },
          { time: '3限 11:30〜12:20', subject: 'データ構造とアルゴリズムⅠa', room: '322' },
          { time: '4限 13:30〜14:20', subject: '応用物理演習4a', room: '022', isElective: true },
        ],
      },
      {
        month: 9,
        day: 18,
        periods: [
          { time: '1限 9:30〜10:20', subject: '応用数学a', room: '322' },
          { time: '2限 10:30〜11:20', subject: '数値計算法', room: '322' },
          { time: '3限 11:30〜12:20', subject: '中国語初級a', room: '022', isElective: true },
          { time: '4限 13:30〜14:20', subject: '(授業なし)' },
        ],
      },
      {
        month: 9,
        day: 19,
        periods: [
          { time: '1限 9:30〜10:20', subject: '経済学a', room: '322' },
          { time: '2限 10:30〜11:20', subject: 'ゲーム理論a', room: '322' },
          { time: '3限 11:30〜12:20', subject: '確率統計Ⅰa', room: '322', isElective: true },
          { time: '4限 13:30〜14:20', subject: '回路演習', room: '022', isElective: true },
        ],
      },
    ],
  },
};

export function getExamSchedule(examId: string): ExamSchedule | undefined {
  return EXAM_SCHEDULES[examId];
}

export interface ExamPeriod {
  examId: string;
  /** 試験期間の開始(初日の午前0時)。 */
  start: Date;
  /** 試験期間の終了(最終日の23:59:59)。 */
  end: Date;
}

// 登録されている全試験の日程を、開始日が早い順に並べて返す。
// ダッシュボードのカウントダウンは、この一覧から「今日を含む・まだ終わっていない
// 試験期間」を探して使う(開始前なら開始日まで、期間中なら終了日までをカウントする)。
export function getAllExamPeriods(): ExamPeriod[] {
  return Object.entries(EXAM_SCHEDULES)
    .map(([examId, schedule]) => {
      const sortedDays = [...schedule.days].sort((a, b) => a.month - b.month || a.day - b.day);
      const first = sortedDays[0];
      const last = sortedDays[sortedDays.length - 1];
      return {
        examId,
        start: new Date(schedule.year, first.month - 1, first.day, 0, 0, 0),
        end: new Date(schedule.year, last.month - 1, last.day, 23, 59, 59),
      };
    })
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}
