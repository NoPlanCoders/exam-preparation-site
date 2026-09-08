import {
  ArrowLeft,
  Brain,
  Calculator,
  ClipboardCheck,
  Database,
  Dice5,
  Download,
  Gauge,
  GraduationCap,
  Grid2X2,
  Keyboard,
  Languages,
  LayoutDashboard,
  Library,
  Menu,
  Monitor,
  Network,
  Pencil,
  Play,
  Plus,
  Save,
  Settings,
  Star,
  Target,
  TreePine,
  Waves,
  Wrench,
  X,
  Zap,
  createIcons,
} from 'lucide';

const LUCIDE_ICONS = {
  ArrowLeft,
  Brain,
  Calculator,
  ClipboardCheck,
  Database,
  Dice5,
  Download,
  Gauge,
  GraduationCap,
  Grid2X2,
  Keyboard,
  Languages,
  LayoutDashboard,
  Library,
  Menu,
  Monitor,
  Network,
  Pencil,
  Play,
  Plus,
  Save,
  Settings,
  Star,
  Target,
  TreePine,
  Waves,
  Wrench,
  X,
  Zap,
};

const ICON_NAMES: Record<string, string> = {
  'graduation-cap': 'graduation-cap',
  database: 'database',
  keyboard: 'keyboard',
  languages: 'languages',
  dice: 'dice-5',
  brain: 'brain',
  pencil: 'pencil',
  wrench: 'wrench',
  bolt: 'zap',
  tree: 'tree-pine',
  book: 'book-open',
  save: 'save',
  monitor: 'monitor',
  clipboard: 'clipboard-check',
  star: 'star',
  network: 'network',
  calculator: 'calculator',
  matrix: 'grid-2x2',
  gauge: 'gauge',
  wave: 'waves',
  target: 'target',
  'clipboard-check': 'clipboard-check',
  menu: 'menu',
  library: 'library',
  'layout-dashboard': 'layout-dashboard',
  settings: 'settings',
  download: 'download',
  plus: 'plus',
  'arrow-left': 'arrow-left',
  play: 'play',
  x: 'x',
};

function iconMarkup(name: string): string {
  return `<i data-lucide="${name}" aria-hidden="true"></i>`;
}

// データ側の既存キーを保ったまま、公式Lucideアイコンへ差し替える。
export const ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(ICON_NAMES).map(([key, name]) => [key, iconMarkup(name)]),
);

export function getIcon(key: string | undefined, fallback: string): string {
  return iconMarkup(ICON_NAMES[key ?? ''] ?? ICON_NAMES[fallback] ?? fallback);
}

export function refreshIcons(root: Element | Document | DocumentFragment = document): void {
  createIcons({ root, icons: LUCIDE_ICONS });
}
