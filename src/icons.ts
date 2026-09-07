// 絵文字の代わりに使うインラインSVGアイコン集。
// キー名を Subject/Exam の icon フィールドに指定して使う。
// 色は currentColor に依存するので、配置先の要素の color プロパティで見た目が決まる。

const STROKE = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

export const ICONS: Record<string, string> = {
  'graduation-cap': `<svg viewBox="0 0 24 24" ${STROKE}><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 10v6"/></svg>`,
  database: `<svg viewBox="0 0 24 24" ${STROKE}><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>`,
  keyboard: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/></svg>`,
  dice: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="16" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1" fill="currentColor" stroke="none"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M9.5 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8V11a3 3 0 0 0 1 2.2 3 3 0 0 0 2 4.8h1a3 3 0 0 0 3-3V6a3 3 0 0 0-2-3Z"/><path d="M14.5 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8V11a3 3 0 0 1-1 2.2 3 3 0 0 1-2 4.8h-1a3 3 0 0 1-3-3V6a3 3 0 0 1 2-3Z"/></svg>`,
  pencil: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94Z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" ${STROKE}><path d="m12 2 8.66 5v10L12 22l-8.66-5V7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  tree: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M12 2 6 10h3l-4 7h4l-3 5h12l-3-5h4l-4-7h3Z"/><path d="M12 24v-2"/></svg>`,
  book: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
  save: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>`,
  monitor: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2Z"/></svg>`,
  network: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><path d="M6.8 7.2 10.5 10.5M13.5 10.5 17.2 7.2M6.8 16.8 10.5 13.5M13.5 13.5 17.2 16.8"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24" ${STROKE}><rect x="5" y="2" width="14" height="20" rx="2"/><rect x="7.5" y="4.5" width="9" height="4" rx="0.5"/><circle cx="8" cy="12.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="12" cy="12.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="16" cy="12.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="8" cy="16" r="0.8" fill="currentColor" stroke="none"/><circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="0.8" fill="currentColor" stroke="none"/><circle cx="8" cy="19.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="12" cy="19.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="16" cy="19.5" r="0.8" fill="currentColor" stroke="none"/></svg>`,
  matrix: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M8 3c-1.5 0-2.5 1-2.5 2.5v13C5.5 20 6.5 21 8 21"/><path d="M16 3c1.5 0 2.5 1 2.5 2.5v13c0 1.5-1 2.5-2.5 2.5"/><circle cx="10" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="14" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="10" cy="15" r=".7" fill="currentColor" stroke="none"/><circle cx="14" cy="15" r=".7" fill="currentColor" stroke="none"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M4 15a8 8 0 1 1 16 0"/><path d="M12 15 16 9"/><circle cx="12" cy="15" r="1" fill="currentColor" stroke="none"/></svg>`,
  wave: `<svg viewBox="0 0 24 24" ${STROKE}><path d="M2 12c2 0 2-6 4-6s2 6 4 6 2-6 4-6 2 6 4 6 2-6 4-6"/></svg>`,
  target: `<svg viewBox="0 0 24 24" ${STROKE}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>`,
};

export function getIcon(key: string | undefined, fallback: string): string {
  if (key && ICONS[key]) return ICONS[key];
  return ICONS[fallback];
}
