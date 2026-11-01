export interface Announcement {
  date: string;
  title: string;
  body: string;
}

// 新しいお知らせを先頭に追加する。日付は YYYY-MM-DD 形式。
export const announcements: Announcement[] = [
  { date: '2026-11-01', title: '再試験のお知らせ', body: '再試験を追加しました。' },
];
