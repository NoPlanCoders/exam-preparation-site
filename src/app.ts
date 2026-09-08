import type { Question, Subject } from './types.js';
import { getExams, getSubjects, getQuestions } from './data/registry.js';
import { ICONS, getIcon } from './icons.js';
import { getTestCountdown } from './countdown.js';

interface AttemptState {
  examId: string;
  examName: string;
  subjectId: string;
  subjectName: string;
  queue: Question[];
  index: number;
  score: number;
  wrong: Question[];
  answered: boolean;
  masteryMode: boolean;
  masteryTotal: number;
  masteryRemaining: Set<Question> | null;
  masteryRecorded: boolean;
}

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let state: AttemptState | null = null;
let currentExam: { id: string; name: string } | null = null;
let deferredInstallPrompt: InstallPromptEvent | null = null;

function $<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`要素が見つかりません: #${id}`);
  return el as T;
}

const splashScreen = $<HTMLElement>('splash-screen');
const viewExam = $<HTMLElement>('view-exam');
const viewSubject = $<HTMLElement>('view-subject');
const viewSettings = $<HTMLElement>('view-settings');
const viewDashboard = $<HTMLElement>('view-dashboard');
const viewQuiz = $<HTMLElement>('view-quiz');
const viewResult = $<HTMLElement>('view-result');

let settingsReturnView: HTMLElement = viewExam;

const examList = $<HTMLElement>('exam-list');
const subjectList = $<HTMLElement>('subject-list');
const subjectViewTitle = $<HTMLElement>('subject-view-title');

const quizProgressText = $<HTMLElement>('quiz-progress-text');
const quizScoreText = $<HTMLElement>('quiz-score-text');
const quizProgressFill = $<HTMLElement>('quiz-progress-fill');
const quizModeLabel = $<HTMLElement>('quiz-mode-label');
const quizQuestion = $<HTMLElement>('quiz-question');
const quizChoices = $<HTMLElement>('quiz-choices');
const quizTextInputArea = $<HTMLElement>('quiz-text-input-area');
const quizTextInput = $<HTMLInputElement>('quiz-text-input');
const btnSubmitText = $<HTMLButtonElement>('btn-submit-text');
const quizHandwritingArea = $<HTMLElement>('quiz-handwriting-area');
const quizCanvas = $<HTMLCanvasElement>('quiz-canvas');
const btnClearCanvas = $<HTMLButtonElement>('btn-clear-canvas');
const btnCheckHandwriting = $<HTMLButtonElement>('btn-check-handwriting');
const handwritingAnswerReveal = $<HTMLElement>('handwriting-answer-reveal');
const handwritingCorrectAnswer = $<HTMLElement>('handwriting-correct-answer');
const quizFeedback = $<HTMLElement>('quiz-feedback');
const quizExplanation = $<HTMLElement>('quiz-explanation');
const btnNext = $<HTMLButtonElement>('btn-next');
const btnEndQuiz = $<HTMLButtonElement>('btn-end-quiz');

const btnMenuToggle = $<HTMLButtonElement>('btn-menu-toggle');
const menuPanel = $<HTMLElement>('menu-panel');
const menuMain = $<HTMLElement>('menu-main');
const menuGoExam = $<HTMLButtonElement>('menu-go-exam');
const menuGoSubject = $<HTMLButtonElement>('menu-go-subject');
const menuGoDashboard = $<HTMLButtonElement>('menu-go-dashboard');
const menuPinnedDivider = $<HTMLElement>('menu-pinned-divider');
const menuPinnedList = $<HTMLElement>('menu-pinned-list');
const menuAddSubject = $<HTMLButtonElement>('menu-add-subject');
const menuSettings = $<HTMLButtonElement>('menu-settings');
const menuInstall = $<HTMLButtonElement>('menu-install');
const menuSearch = $<HTMLElement>('menu-search');
const menuSearchBack = $<HTMLButtonElement>('menu-search-back');
const menuSearchInput = $<HTMLInputElement>('menu-search-input');
const menuSearchResults = $<HTMLElement>('menu-search-results');

const btnBackFromSettings = $<HTMLButtonElement>('btn-back-from-settings');
const darkModeToggle = $<HTMLInputElement>('dark-mode-toggle');
const themeSettingSummary = $<HTMLElement>('theme-setting-summary');
const splashAnimationToggle = $<HTMLInputElement>('splash-animation-toggle');
const splashSettingSummary = $<HTMLElement>('splash-setting-summary');
const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

const navLibrary = $<HTMLButtonElement>('nav-library');
const navDashboard = $<HTMLButtonElement>('nav-dashboard');
const dashboardAnswered = $<HTMLElement>('dashboard-answered');
const dashboardAccuracy = $<HTMLElement>('dashboard-accuracy');
const dashboardSubjectCount = $<HTMLElement>('dashboard-subject-count');
const dashboardRemainingHours = $<HTMLElement>('dashboard-remaining-hours');
const dashboardRemainingDays = $<HTMLElement>('dashboard-remaining-days');
const dashboardSubjectList = $<HTMLElement>('dashboard-subject-list');
const dashboardGoLibrary = $<HTMLButtonElement>('dashboard-go-library');

const confirmOverlay = $<HTMLElement>('confirm-overlay');
const confirmMessage = $<HTMLElement>('confirm-message');
const confirmBtnOk = $<HTMLButtonElement>('confirm-btn-ok');
const confirmBtnCancel = $<HTMLButtonElement>('confirm-btn-cancel');

// window.confirm() の代わりに、サイト内で完結する確認ダイアログを表示する。
// okLabel を指定すると「OK」ボタンの文言を状況に応じて変えられる。
function showConfirmDialog(message: string, okLabel = 'OK'): Promise<boolean> {
  return new Promise((resolve) => {
    confirmMessage.textContent = message;
    confirmBtnOk.textContent = okLabel;
    confirmOverlay.hidden = false;

    const cleanup = (result: boolean) => {
      confirmOverlay.hidden = true;
      confirmBtnOk.removeEventListener('click', onOk);
      confirmBtnCancel.removeEventListener('click', onCancel);
      confirmOverlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onKeydown);
      resolve(result);
    };
    const onOk = () => cleanup(true);
    const onCancel = () => cleanup(false);
    const onOverlayClick = (e: MouseEvent) => {
      if (e.target === confirmOverlay) cleanup(false);
    };
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cleanup(false);
    };

    confirmBtnOk.addEventListener('click', onOk);
    confirmBtnCancel.addEventListener('click', onCancel);
    confirmOverlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeydown);
    confirmBtnOk.focus();
  });
}

const resultScore = $<HTMLElement>('result-score');
const resultMessage = $<HTMLElement>('result-message');
const resultScoreRing = $<HTMLElement>('result-score-ring');
const resultScorePercent = $<HTMLElement>('result-score-percent');
const resultWrongList = $<HTMLElement>('result-wrong-list');
const btnReviewWrong = $<HTMLButtonElement>('btn-review-wrong');
const btnRetrySubject = $<HTMLButtonElement>('btn-retry-subject');
const btnBackToSubject = $<HTMLButtonElement>('btn-back-to-subject');

const CHOICE_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];
const DEFAULT_EXAM_ICON = 'graduation-cap';
const DEFAULT_SUBJECT_ICON = 'book';

const canvasCtx = quizCanvas.getContext('2d')!;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function canvasPoint(e: PointerEvent): { x: number; y: number } {
  const rect = quizCanvas.getBoundingClientRect();
  const scaleX = quizCanvas.width / rect.width;
  const scaleY = quizCanvas.height / rect.height;
  return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
}

function clearCanvas(): void {
  canvasCtx.clearRect(0, 0, quizCanvas.width, quizCanvas.height);
}

quizCanvas.addEventListener('pointerdown', (e) => {
  isDrawing = true;
  quizCanvas.setPointerCapture(e.pointerId);
  const p = canvasPoint(e);
  lastX = p.x;
  lastY = p.y;
});

quizCanvas.addEventListener('pointermove', (e) => {
  if (!isDrawing) return;
  const p = canvasPoint(e);
  canvasCtx.strokeStyle = '#1e2433';
  canvasCtx.lineWidth = 6;
  canvasCtx.lineCap = 'round';
  canvasCtx.beginPath();
  canvasCtx.moveTo(lastX, lastY);
  canvasCtx.lineTo(p.x, p.y);
  canvasCtx.stroke();
  lastX = p.x;
  lastY = p.y;
});

function stopDrawing(): void {
  isDrawing = false;
}
quizCanvas.addEventListener('pointerup', stopDrawing);
quizCanvas.addEventListener('pointerleave', stopDrawing);
quizCanvas.addEventListener('pointercancel', stopDrawing);

btnClearCanvas.addEventListener('click', clearCanvas);

function setMainNav(section: 'library' | 'dashboard'): void {
  navLibrary.classList.toggle('is-active', section === 'library');
  navDashboard.classList.toggle('is-active', section === 'dashboard');
}

function showView(view: HTMLElement): void {
  for (const v of [viewExam, viewSubject, viewSettings, viewDashboard, viewQuiz, viewResult]) {
    v.hidden = v !== view;
    v.classList.remove('view-entering');
  }
  if (view === viewDashboard) setMainNav('dashboard');
  else if (view !== viewSettings) setMainNav('library');
  void view.offsetWidth;
  view.classList.add('view-entering');
}

function dismissSplash(): void {
  splashScreen.classList.add('is-hiding');
  const onAnimationEnd = (event: AnimationEvent) => {
    if (event.target !== splashScreen) return;
    splashScreen.hidden = true;
    splashScreen.removeEventListener('animationend', onAnimationEnd);
  };
  splashScreen.addEventListener('animationend', onAnimationEnd);
}

const THEME_STORAGE_KEY = 'quiz-theme';
type Theme = 'light' | 'dark';

function loadTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // 保存できなくても、現在の画面には反映する。
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  darkModeToggle.checked = theme === 'dark';
  themeSettingSummary.textContent = theme === 'dark' ? 'ダークモードが有効です' : 'ライトモードが有効です';
  themeColorMeta?.setAttribute('content', theme === 'dark' ? '#11162a' : '#6366f1');
}

const SPLASH_STORAGE_KEY = 'quiz-splash-enabled';

function loadSplashAnimationEnabled(): boolean {
  try {
    return localStorage.getItem(SPLASH_STORAGE_KEY) !== 'false';
  } catch {
    return true;
  }
}

function saveSplashAnimationEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(SPLASH_STORAGE_KEY, String(enabled));
  } catch {
    // 保存できなくても、現在の画面には反映する。
  }
}

function applySplashAnimationSetting(enabled: boolean): void {
  splashAnimationToggle.checked = enabled;
  splashSettingSummary.textContent = enabled ? '起動時に表示します' : '起動時に表示しません';
  if (!enabled) {
    splashScreen.classList.remove('is-hiding');
    splashScreen.hidden = true;
  }
}

interface LearningProgressEntry {
  examId: string;
  examName: string;
  subjectId: string;
  subjectName: string;
  answered: number;
  correct: number;
  lastStudied: number;
  masteryCount: number;
}

type LearningProgressStore = Record<string, LearningProgressEntry>;

const LEARNING_PROGRESS_STORAGE_KEY = 'quiz-learning-progress';

function loadLearningProgress(): LearningProgressStore {
  try {
    const raw = localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => {
        if (!value || typeof value !== 'object') return false;
        const entry = value as Record<string, unknown>;
        return (
          typeof entry.examId === 'string' &&
          typeof entry.examName === 'string' &&
          typeof entry.subjectId === 'string' &&
          typeof entry.subjectName === 'string' &&
          Number.isFinite(entry.answered) &&
          Number.isFinite(entry.correct) &&
          Number.isFinite(entry.lastStudied) &&
          Number.isFinite(entry.masteryCount)
        );
      }),
    ) as LearningProgressStore;
  } catch {
    return {};
  }
}

function saveLearningProgress(): void {
  try {
    localStorage.setItem(LEARNING_PROGRESS_STORAGE_KEY, JSON.stringify(learningProgress));
  } catch {
    // 保存できなくても、現在のセッションには反映する。
  }
}

let learningProgress: LearningProgressStore = loadLearningProgress();

function getProgressKey(examId: string, subjectId: string): string {
  return `${examId}::${subjectId}`;
}

function getOrCreateProgressEntry(): LearningProgressEntry | null {
  if (!state) return null;
  const key = getProgressKey(state.examId, state.subjectId);
  const existing = learningProgress[key];
  if (existing) return existing;

  const entry: LearningProgressEntry = {
    examId: state.examId,
    examName: state.examName,
    subjectId: state.subjectId,
    subjectName: state.subjectName,
    answered: 0,
    correct: 0,
    lastStudied: 0,
    masteryCount: 0,
  };
  learningProgress[key] = entry;
  return entry;
}

function recordAnswer(correct: boolean): void {
  const entry = getOrCreateProgressEntry();
  if (!entry) return;
  entry.answered++;
  if (correct) entry.correct++;
  entry.lastStudied = Date.now();
  saveLearningProgress();
}

function recordMasteryCompletion(): void {
  const entry = getOrCreateProgressEntry();
  if (!entry) return;
  entry.masteryCount++;
  entry.lastStudied = Date.now();
  saveLearningProgress();
}

function formatCount(value: number): string {
  return new Intl.NumberFormat('ja-JP').format(value);
}

function formatProgressDate(timestamp: number): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(timestamp);
}

function renderTestCountdown(): void {
  const countdown = getTestCountdown();
  dashboardRemainingHours.textContent = formatCount(countdown.hours);
  dashboardRemainingDays.textContent = formatCount(countdown.days);
}

function renderDashboard(): void {
  const entries = Object.values(learningProgress).sort((a, b) => b.lastStudied - a.lastStudied);
  const answered = entries.reduce((sum, entry) => sum + entry.answered, 0);
  const correct = entries.reduce((sum, entry) => sum + entry.correct, 0);

  dashboardAnswered.textContent = formatCount(answered);
  dashboardAccuracy.textContent = answered ? `${Math.round((correct / answered) * 100)}%` : '—';
  dashboardSubjectCount.textContent = formatCount(entries.length);
  renderTestCountdown();
  dashboardSubjectList.innerHTML = '';

  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'dashboard-empty';
    empty.textContent = 'まだ学習記録がありません。ライブラリから問題を解いてみましょう。';
    dashboardSubjectList.appendChild(empty);
    return;
  }

  for (const [index, entry] of entries.entries()) {
    const accuracy = entry.answered ? Math.round((entry.correct / entry.answered) * 100) : 0;
    const item = document.createElement('article');
    item.className = 'dashboard-subject-item';
    item.style.setProperty('--stagger-index', String(index));

    const heading = document.createElement('div');
    heading.className = 'dashboard-subject-heading';
    const titleGroup = document.createElement('div');
    titleGroup.className = 'dashboard-subject-title';
    const subjectName = document.createElement('h4');
    subjectName.textContent = entry.subjectName;
    const examName = document.createElement('p');
    examName.textContent = entry.examName;
    titleGroup.append(subjectName, examName);
    heading.appendChild(titleGroup);

    if (entry.masteryCount > 0) {
      const badge = document.createElement('span');
      badge.className = 'dashboard-mastery-badge';
      badge.textContent = '全問正解達成';
      heading.appendChild(badge);
    }
    item.appendChild(heading);

    const score = document.createElement('div');
    score.className = 'dashboard-subject-score';
    score.innerHTML = `<strong>${accuracy}%</strong><span>${entry.correct} / ${entry.answered}問正解</span>`;
    item.appendChild(score);

    const progress = document.createElement('div');
    progress.className = 'dashboard-progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className = 'dashboard-progress-fill';
    progressFill.style.width = `${accuracy}%`;
    progress.appendChild(progressFill);
    item.appendChild(progress);

    const meta = document.createElement('p');
    meta.className = 'dashboard-subject-meta';
    meta.textContent = `最終学習: ${formatProgressDate(entry.lastStudied)}`;
    item.appendChild(meta);
    dashboardSubjectList.appendChild(item);
  }
}

function shuffle<T>(items: T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderExamList(): void {
  const exams = getExams();
  examList.innerHTML = '';
  for (const [index, exam] of exams.entries()) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.style.setProperty('--stagger-index', String(index));
    card.innerHTML = `
      <span class="card-icon">${getIcon(exam.icon, DEFAULT_EXAM_ICON)}</span>
      <span class="card-body"><h3>${exam.name}</h3><p>${exam.description}</p></span>
    `;
    card.addEventListener('click', () => renderSubjectView(exam.id, exam.name));
    examList.appendChild(card);
  }
}

function splitSubjectName(name: string): { groupName: string; modeName: string } {
  // ponytail: グループ名は末尾の括弧表記に依存。例外的な命名が増えたらSubjectにgroup/modeを持たせる。
  const match = name.match(/^(.*?)[（(]([^（）()]+)[）)]$/);
  return match
    ? { groupName: match[1].trim(), modeName: match[2].trim() }
    : { groupName: name, modeName: '問題' };
}

function renderSubjectView(examId: string, examName: string): void {
  currentExam = { id: examId, name: examName };
  menuGoSubject.hidden = false;
  subjectViewTitle.textContent = `${examName} - 科目を選んでください`;
  subjectList.innerHTML = '';

  // 通常の科目一覧には履修科目のみを表示する。選択科目はメニューの
  // 「選択科目を追加」から検索してピン留めしたときだけ個別に表示される。
  const subjects: Subject[] = getSubjects(examId).filter((s) => s.category !== '選択科目');
  const groups = new Map<string, { name: string; icon?: string; subjects: Subject[] }>();
  for (const subject of subjects) {
    const { groupName } = splitSubjectName(subject.name);
    const group = groups.get(groupName);
    if (group) {
      group.subjects.push(subject);
    } else {
      groups.set(groupName, { name: groupName, icon: subject.icon, subjects: [subject] });
    }
  }

  for (const [index, group] of Array.from(groups.values()).entries()) {
    const totalQuestions = group.subjects.reduce(
      (sum, subject) => sum + getQuestions(examId, subject.id).length,
      0,
    );
    const card = document.createElement('div');
    card.className = 'card subject-card subject-group-card';
    card.style.setProperty('--stagger-index', String(index));

    const modesHtml = group.subjects
      .map((subject) => {
        const { modeName } = splitSubjectName(subject.name);
        const questions = getQuestions(examId, subject.id);
        const total = questions.length;
        const masteryLabel = questions.some((question) => question.type === 'handwriting')
          ? '全問確認まで'
          : '全問正解まで';
        const countOptions: number[] = [];
        if (total > 20) countOptions.push(20);
        if (total > 10) countOptions.push(10);
        countOptions.push(total);

        const optionsHtml = countOptions
          .map((n) => `<option value="${n}">${n === total ? `全${n}問` : `${n}問`}</option>`)
          .join('');

        return `
          <div class="subject-mode-row" data-subject-id="${subject.id}">
            <div class="subject-mode-heading">
              <span class="subject-mode-name">${modeName}</span>
              <span class="subject-mode-total">全${total}問</span>
            </div>
            <div class="subject-card-controls">
              <div class="count-select-wrap">
                <select class="count-select" aria-label="${group.name} ${modeName}の出題数">${optionsHtml}</select>
              </div>
              <button type="button" class="start-btn">開始</button>
              <button type="button" class="mastery-btn" title="${masteryLabel === '全問確認まで' ? '全ての手書き問題を確認するまで繰り返す' : '全問正解するまで繰り返す'}">${masteryLabel}</button>
            </div>
          </div>
        `;
      })
      .join('');

    card.innerHTML = `
      <span class="card-icon">${getIcon(group.icon, DEFAULT_SUBJECT_ICON)}</span>
      <span class="card-body">
        <h3>${group.name}</h3>
        <p>全${totalQuestions}問・${group.subjects.length}形式</p>
        <div class="subject-mode-list">${modesHtml}</div>
      </span>
    `;

    Array.from(card.querySelectorAll('.subject-mode-row')).forEach((row) => {
      const modeRow = row as HTMLElement;
      const subject = group.subjects.find((candidate) => candidate.id === modeRow.dataset.subjectId);
      if (!subject) return;
      const select = modeRow.querySelector('.count-select') as HTMLSelectElement;
      const startBtn = modeRow.querySelector('.start-btn') as HTMLButtonElement;
      const masteryBtn = modeRow.querySelector('.mastery-btn') as HTMLButtonElement;
      startBtn.addEventListener('click', () => {
        const count = Number(select.value);
        startQuiz(examId, examName, subject.id, subject.name, count);
      });
      masteryBtn.addEventListener('click', () => {
        const count = Number(select.value);
        startQuiz(examId, examName, subject.id, subject.name, count, true);
      });
    });

    subjectList.appendChild(card);
  }

  showView(viewSubject);
}

function startQuiz(
  examId: string,
  examName: string,
  subjectId: string,
  subjectName: string,
  count: number,
  masteryMode = false,
): void {
  const all = getQuestions(examId, subjectId);
  const queue = shuffle(all).slice(0, count);

  state = {
    examId,
    examName,
    subjectId,
    subjectName,
    queue,
    index: 0,
    score: 0,
    wrong: [],
    answered: false,
    masteryMode,
    masteryTotal: queue.length,
    masteryRemaining: masteryMode ? new Set(queue) : null,
    masteryRecorded: false,
  };

  quizModeLabel.hidden = !masteryMode;
  quizModeLabel.textContent = masteryMode
    ? `${queue.some((question) => question.type === 'handwriting') ? '全問確認' : '全問正解'}モード`
    : '';
  showView(viewQuiz);
  renderQuestion();
}

function updateQuizProgress(): void {
  if (!state) return;

  if (state.masteryMode) {
    const remaining = state.masteryRemaining?.size ?? 0;
    const completed = state.masteryTotal - remaining;
    quizProgressText.textContent = `正解済み ${completed} / ${state.masteryTotal} 問`;
    quizScoreText.textContent = `残り: ${remaining}問`;
    quizProgressFill.style.width = `${(completed / state.masteryTotal) * 100}%`;
    return;
  }

  quizProgressText.textContent = `第 ${state.index + 1} / ${state.queue.length} 問`;
  quizScoreText.textContent = `正解数: ${state.score}`;
  quizProgressFill.style.width = `${(state.index / state.queue.length) * 100}%`;
}

function renderQuestion(): void {
  if (!state) return;
  const q = state.queue[state.index];
  state.answered = false;

  updateQuizProgress();
  quizQuestion.textContent = q.question;

  quizFeedback.hidden = true;
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizExplanation.hidden = true;
  quizExplanation.innerHTML = '';
  btnNext.hidden = true;

  quizChoices.innerHTML = '';
  quizChoices.hidden = true;
  quizTextInputArea.hidden = true;
  quizTextInput.value = '';
  quizTextInput.disabled = false;
  btnSubmitText.disabled = false;
  quizHandwritingArea.hidden = true;
  handwritingAnswerReveal.hidden = true;
  handwritingCorrectAnswer.textContent = '';
  btnCheckHandwriting.hidden = false;
  clearCanvas();
  quizCanvas.style.pointerEvents = 'auto';

  if (q.type === 'choice') {
    quizChoices.hidden = false;
    q.choices.forEach((choice, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.innerHTML = `<span class="choice-label">${CHOICE_LABELS[i] ?? i + 1}</span><span class="choice-text">${choice}</span>`;
      btn.addEventListener('click', () => submitChoice(i));
      quizChoices.appendChild(btn);
    });
  } else if (q.type === 'text') {
    quizTextInputArea.hidden = false;
    quizTextInput.focus();
  } else {
    quizHandwritingArea.hidden = false;
  }
}

function normalizeText(s: string): string {
  return s.trim().toLowerCase();
}

function isTextCorrect(q: Extract<Question, { type: 'text' }>, input: string): boolean {
  const candidates = Array.isArray(q.answer) ? q.answer : [q.answer];
  const normalizedInput = normalizeText(input);
  return candidates.some((c) => normalizeText(c) === normalizedInput);
}

function submitChoice(selected: number): void {
  if (!state || state.answered) return;
  const q = state.queue[state.index];
  if (q.type !== 'choice') return;
  state.answered = true;

  const correct = selected === q.answer;
  const buttons = Array.from(quizChoices.querySelectorAll<HTMLButtonElement>('.choice-btn'));
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    if (i === selected && !correct) btn.classList.add('incorrect');
  });

  finishAnswer(correct, q.choices[q.answer]);

  if (!correct) renderChoiceExplanation(q, selected);
}

function addExplanationLine(tag: string, tagClass: string, text: string): void {
  const p = document.createElement('p');
  p.className = 'quiz-explanation-line';
  const badge = document.createElement('span');
  badge.className = `quiz-explanation-tag ${tagClass}`;
  badge.textContent = tag;
  p.appendChild(badge);
  p.appendChild(document.createTextNode(text));
  quizExplanation.appendChild(p);
}

// 不正解の選択肢を選んだときに、選んだ選択肢(と、あれば正解の選択肢)の
// 解説を表示する。解説が1つも登録されていなければ何も表示しない。
function renderChoiceExplanation(
  q: Extract<Question, { type: 'choice' }>,
  selected: number,
): void {
  const exps = q.explanations ?? [];
  const yourExp = (exps[selected] ?? '').trim();
  const correctExp = (exps[q.answer] ?? '').trim();

  quizExplanation.innerHTML = '';
  if (yourExp) {
    addExplanationLine(`あなたの回答 ${CHOICE_LABELS[selected] ?? selected + 1}`, 'is-wrong', yourExp);
  }
  if (correctExp) {
    addExplanationLine(`正解 ${CHOICE_LABELS[q.answer] ?? q.answer + 1}`, 'is-correct', correctExp);
  }
  quizExplanation.hidden = quizExplanation.childElementCount === 0;
}

function submitText(): void {
  if (!state || state.answered) return;
  const q = state.queue[state.index];
  if (q.type !== 'text') return;
  state.answered = true;

  const correct = isTextCorrect(q, quizTextInput.value);
  quizTextInput.disabled = true;
  btnSubmitText.disabled = true;

  const correctText = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  finishAnswer(correct, correctText);
}

function revealHandwritingAnswer(): void {
  if (!state || state.answered) return;
  const q = state.queue[state.index];
  if (q.type !== 'handwriting') return;
  state.answered = true;
  state.masteryRemaining?.delete(q);

  handwritingCorrectAnswer.textContent = q.answer;
  handwritingAnswerReveal.hidden = false;
  btnCheckHandwriting.hidden = true;
  quizCanvas.style.pointerEvents = 'none';

  updateQuizProgress();
  btnNext.hidden = false;
  btnNext.textContent = state.index + 1 < state.queue.length ? '次へ' : '結果を見る';
}

function finishAnswer(correct: boolean, correctText: string): void {
  if (!state) return;
  const q = state.queue[state.index];
  recordAnswer(correct);

  if (correct) {
    state.score++;
    state.masteryRemaining?.delete(q);
    if (state.masteryMode) {
      state.wrong = state.wrong.filter((candidate) => candidate !== q);
    }
    quizFeedback.textContent = '正解!';
    quizFeedback.classList.add('correct');
  } else {
    if (state.masteryMode) {
      if (!state.wrong.includes(q)) state.wrong.push(q);
      state.queue.push(q);
    } else {
      state.wrong.push(q);
    }
    quizFeedback.textContent = `不正解… 正解は「${correctText}」`;
    quizFeedback.classList.add('incorrect');
  }
  quizFeedback.hidden = false;
  updateQuizProgress();
  btnNext.hidden = false;
  btnNext.textContent = state.index + 1 < state.queue.length ? '次へ' : '結果を見る';
}

function nextQuestion(): void {
  if (!state) return;
  state.index++;
  if (state.index < state.queue.length) {
    renderQuestion();
  } else {
    renderResult();
  }
}

function renderResult(): void {
  if (!state) return;
  showView(viewResult);

  const total = state.masteryMode ? state.masteryTotal : state.queue.length;
  const judged = state.masteryMode
    ? state.masteryTotal
    : state.queue.filter((q) => q.type !== 'handwriting').length;
  const scoreForResult = state.masteryMode
    ? state.masteryTotal - (state.masteryRemaining?.size ?? 0)
    : state.score;
  const masteryComplete = state.masteryMode && (state.masteryRemaining?.size ?? 0) === 0;

  if (masteryComplete && !state.masteryRecorded) {
    recordMasteryCompletion();
    state.masteryRecorded = true;
  }

  if (judged === 0) {
    resultScoreRing.hidden = true;
    resultMessage.hidden = true;
    resultScore.textContent = `${total}問を確認しました`;
  } else {
    resultScoreRing.hidden = false;
    resultMessage.hidden = false;
    const percent = Math.round((scoreForResult / judged) * 100);

    resultScore.textContent = state.masteryMode
      ? `${total}問中 ${scoreForResult}問クリア`
      : `${judged}問中 ${scoreForResult}問正解`;
    resultScorePercent.textContent = `${percent}%`;

    let ringColor = '#dc2626';
    let message = 'もう一息!間違えた問題を復習しよう';
    if (percent >= 80) {
      ringColor = '#16a34a';
      message = 'よくできました!この調子!';
    } else if (percent >= 50) {
      ringColor = '#d97706';
      message = 'まずまず!復習してもう一歩前進しよう';
    }
    resultScoreRing.style.setProperty('--ring-color', ringColor);
    resultScoreRing.style.setProperty('--ring-percent', `${percent}`);
    resultMessage.textContent = message;
    resultMessage.style.color = ringColor;
  }

  resultWrongList.innerHTML = '';
  const masteryIncomplete = state.masteryMode && !masteryComplete;

  if (judged === 0) {
    btnReviewWrong.hidden = true;
  } else if (state.wrong.length === 0 && !masteryIncomplete) {
    resultWrongList.innerHTML = `<p class="all-correct">${ICONS.star} 全問正解です!すごい!</p>`;
    btnReviewWrong.hidden = true;
  } else if (state.wrong.length === 0) {
    resultWrongList.innerHTML = '<p class="result-pending">未回答の問題が残っています。</p>';
    btnReviewWrong.hidden = true;
  } else {
    btnReviewWrong.hidden = false;
    const heading = document.createElement('h3');
    heading.textContent = '間違えた問題';
    resultWrongList.appendChild(heading);

    for (const q of state.wrong) {
      const item = document.createElement('div');
      item.className = 'wrong-item';
      const answerText =
        q.type === 'choice' ? q.choices[q.answer] : Array.isArray(q.answer) ? q.answer[0] : q.answer;
      item.innerHTML = `<p class="wrong-question">${q.question}</p><p class="wrong-answer">正解: ${answerText}</p>`;
      resultWrongList.appendChild(item);
    }
  }
}

btnNext.addEventListener('click', nextQuestion);
btnSubmitText.addEventListener('click', submitText);
btnCheckHandwriting.addEventListener('click', revealHandwritingAnswer);

btnEndQuiz.addEventListener('click', async () => {
  if (!state) return;
  const ok = await showConfirmDialog('クイズを終了して、ここまでの結果を見ますか?', '終了する');
  if (!ok) return;
  // まだ回答していない設問は結果の集計対象から外す
  const answeredCount = state.answered ? state.index + 1 : state.index;
  state.queue = state.queue.slice(0, answeredCount);
  renderResult();
});
quizTextInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitText();
});

btnReviewWrong.addEventListener('click', () => {
  if (!state) return;
  const wrongQuestions = state.wrong;
  const { examId, examName, subjectId, subjectName } = state;
  state = {
    examId,
    examName,
    subjectId,
    subjectName,
    queue: shuffle(wrongQuestions),
    index: 0,
    score: 0,
    wrong: [],
    answered: false,
    masteryMode: false,
    masteryTotal: wrongQuestions.length,
    masteryRemaining: null,
    masteryRecorded: false,
  };
  quizModeLabel.hidden = true;
  quizModeLabel.textContent = '';
  showView(viewQuiz);
  renderQuestion();
});

btnRetrySubject.addEventListener('click', () => {
  if (!state) return;
  renderSubjectView(state.examId, state.examName);
});

btnBackToSubject.addEventListener('click', () => {
  if (!state) return;
  renderSubjectView(state.examId, state.examName);
});

document.getElementById('btn-back-to-exam')?.addEventListener('click', () => {
  showView(viewExam);
});

// ---- お気に入り科目(メニューに個別表示するクイズショートカット) ----

interface PinnedSubject {
  examId: string;
  subjectId: string;
}

interface FlatSubjectEntry {
  examId: string;
  examName: string;
  subjectId: string;
  subjectName: string;
  description: string;
  icon?: string;
  category?: Subject['category'];
}

const PINNED_STORAGE_KEY = 'quiz-pinned-subjects';

function loadPinned(): PinnedSubject[] {
  try {
    const raw = localStorage.getItem(PINNED_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is PinnedSubject =>
        p && typeof p.examId === 'string' && typeof p.subjectId === 'string',
    );
  } catch {
    return [];
  }
}

function savePinned(list: PinnedSubject[]): void {
  try {
    localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // 保存できなくても致命的ではないので無視する(プライベートモード等)
  }
}

let pinnedSubjects: PinnedSubject[] = loadPinned();

function getAllSubjectsFlat(): FlatSubjectEntry[] {
  const result: FlatSubjectEntry[] = [];
  for (const exam of getExams()) {
    for (const subject of getSubjects(exam.id)) {
      result.push({
        examId: exam.id,
        examName: exam.name,
        subjectId: subject.id,
        subjectName: subject.name,
        description: subject.description,
        icon: subject.icon,
        category: subject.category,
      });
    }
  }
  return result;
}

function isPinned(examId: string, subjectId: string): boolean {
  return pinnedSubjects.some((p) => p.examId === examId && p.subjectId === subjectId);
}

function togglePinned(examId: string, subjectId: string): void {
  if (isPinned(examId, subjectId)) {
    pinnedSubjects = pinnedSubjects.filter((p) => !(p.examId === examId && p.subjectId === subjectId));
  } else {
    pinnedSubjects = [...pinnedSubjects, { examId, subjectId }];
  }
  savePinned(pinnedSubjects);
  renderPinnedMenu();
  renderSearchResults(menuSearchInput.value);
}

async function startPinnedQuiz(entry: FlatSubjectEntry): Promise<void> {
  closeMenu();
  if (!(await confirmLeaveQuizIfNeeded())) return;
  const count = getQuestions(entry.examId, entry.subjectId).length;
  if (count === 0) return;
  startQuiz(entry.examId, entry.examName, entry.subjectId, entry.subjectName, count);
}

function renderPinnedMenu(): void {
  const flat = getAllSubjectsFlat();
  const entries = pinnedSubjects
    .map((p) => flat.find((f) => f.examId === p.examId && f.subjectId === p.subjectId))
    .filter((e): e is FlatSubjectEntry => !!e);

  // 存在しなくなった科目(データ更新等)は保存データからも取り除く
  if (entries.length !== pinnedSubjects.length) {
    pinnedSubjects = entries.map((e) => ({ examId: e.examId, subjectId: e.subjectId }));
    savePinned(pinnedSubjects);
  }

  menuPinnedDivider.hidden = entries.length === 0;
  menuPinnedList.innerHTML = '';

  for (const entry of entries) {
    const row = document.createElement('div');
    row.className = 'menu-pinned-item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-item';
    btn.textContent = entry.subjectName;
    btn.addEventListener('click', () => startPinnedQuiz(entry));

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'menu-pinned-remove';
    removeBtn.setAttribute('aria-label', `${entry.subjectName}をお気に入りから削除`);
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => togglePinned(entry.examId, entry.subjectId));

    row.appendChild(btn);
    row.appendChild(removeBtn);
    menuPinnedList.appendChild(row);
  }
}

function renderSearchResults(query: string): void {
  const normalized = query.trim().toLowerCase();
  // 「選択科目を追加」では選択科目のみを検索対象にする(履修科目は通常の
  // 科目一覧からすでに選べるため、ここには表示しない)。
  const electives = getAllSubjectsFlat().filter((e) => e.category === '選択科目');
  const matches = normalized
    ? electives.filter(
        (e) =>
          e.subjectName.toLowerCase().includes(normalized) ||
          e.description.toLowerCase().includes(normalized) ||
          e.examName.toLowerCase().includes(normalized),
      )
    : electives;

  menuSearchResults.innerHTML = '';

  if (matches.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'menu-search-empty';
    empty.textContent = electives.length === 0 ? '選択科目はまだ登録されていません' : '見つかりませんでした';
    menuSearchResults.appendChild(empty);
    return;
  }

  for (const entry of matches) {
    const row = document.createElement('div');
    row.className = 'menu-search-result';

    const pinned = isPinned(entry.examId, entry.subjectId);
    row.innerHTML = `
      <span class="card-icon"><svg viewBox="0 0 24 24" width="16" height="16"></svg></span>
      <span class="menu-search-result-body">
        <span class="menu-search-result-name">${entry.subjectName}</span>
        <span class="menu-search-result-exam">${entry.examName}</span>
      </span>
    `;
    const iconSpan = row.querySelector<HTMLElement>('.card-icon')!;
    iconSpan.innerHTML = getIcon(entry.icon, DEFAULT_SUBJECT_ICON);

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'menu-pin-toggle';
    if (pinned) toggleBtn.classList.add('is-pinned');
    toggleBtn.textContent = pinned ? '追加済み' : '+ 追加';
    toggleBtn.addEventListener('click', () => togglePinned(entry.examId, entry.subjectId));

    row.appendChild(toggleBtn);
    menuSearchResults.appendChild(row);
  }
}

function openSearch(): void {
  menuMain.hidden = true;
  menuSearch.hidden = false;
  menuSearchInput.value = '';
  renderSearchResults('');
  menuSearchInput.focus();
}

function closeSearch(): void {
  menuSearch.hidden = true;
  menuMain.hidden = false;
}

function closeMenu(): void {
  menuPanel.classList.remove('menu-panel-entering');
  menuPanel.hidden = true;
  btnMenuToggle.setAttribute('aria-expanded', 'false');
  closeSearch();
}

function openMenu(): void {
  renderPinnedMenu();
  menuPanel.hidden = false;
  menuPanel.classList.remove('menu-panel-entering');
  void menuPanel.offsetWidth;
  menuPanel.classList.add('menu-panel-entering');
  btnMenuToggle.setAttribute('aria-expanded', 'true');
}

function confirmLeaveQuizIfNeeded(): Promise<boolean> {
  if (!viewQuiz.hidden && state) {
    return showConfirmDialog('クイズを終了して移動しますか?\n(ここまでの回答は保存されません)', '移動する');
  }
  return Promise.resolve(true);
}

btnMenuToggle.addEventListener('click', () => {
  if (menuPanel.hidden) {
    openMenu();
  } else {
    closeMenu();
  }
});

document.addEventListener('click', (e) => {
  if (menuPanel.hidden) return;
  const target = e.target as Node;
  if (menuPanel.contains(target) || btnMenuToggle.contains(target)) return;
  closeMenu();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

async function openLibrary(): Promise<void> {
  closeMenu();
  if (!(await confirmLeaveQuizIfNeeded())) return;
  state = null;
  showView(viewExam);
}

async function openDashboard(): Promise<void> {
  closeMenu();
  if (!(await confirmLeaveQuizIfNeeded())) return;
  if (!viewQuiz.hidden) state = null;
  renderDashboard();
  showView(viewDashboard);
}

navLibrary.addEventListener('click', openLibrary);
navDashboard.addEventListener('click', openDashboard);
menuGoExam.addEventListener('click', openLibrary);
menuGoDashboard.addEventListener('click', openDashboard);
dashboardGoLibrary.addEventListener('click', openLibrary);

menuAddSubject.addEventListener('click', () => {
  openSearch();
});

function openSettings(): void {
  settingsReturnView = [viewExam, viewSubject, viewDashboard, viewQuiz, viewResult].find((view) => !view.hidden) ?? viewExam;
  closeMenu();
  showView(viewSettings);
}

menuSettings.addEventListener('click', openSettings);

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event as InstallPromptEvent;
  menuInstall.hidden = false;
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  menuInstall.hidden = true;
});

menuInstall.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  const installPrompt = deferredInstallPrompt;
  deferredInstallPrompt = null;
  menuInstall.hidden = true;
  await installPrompt.prompt();
  await installPrompt.userChoice;
});

menuSearchBack.addEventListener('click', () => {
  closeSearch();
});

menuSearchInput.addEventListener('input', () => {
  renderSearchResults(menuSearchInput.value);
});

menuGoSubject.addEventListener('click', async () => {
  closeMenu();
  if (!currentExam) return;
  if (!(await confirmLeaveQuizIfNeeded())) return;
  state = null;
  renderSubjectView(currentExam.id, currentExam.name);
});

btnBackFromSettings.addEventListener('click', () => {
  showView(settingsReturnView);
});

applyTheme(loadTheme());
applySplashAnimationSetting(loadSplashAnimationEnabled());
darkModeToggle.addEventListener('change', () => {
  const theme: Theme = darkModeToggle.checked ? 'dark' : 'light';
  applyTheme(theme);
  saveTheme(theme);
});

splashAnimationToggle.addEventListener('change', () => {
  const enabled = splashAnimationToggle.checked;
  applySplashAnimationSetting(enabled);
  saveSplashAnimationEnabled(enabled);
});

export function initApp(): void {
  renderExamList();
  showView(viewExam);
  if (splashAnimationToggle.checked) window.setTimeout(dismissSplash, 520);
  window.setInterval(() => {
    if (!viewDashboard.hidden) renderTestCountdown();
  }, 60 * 1000);
}
