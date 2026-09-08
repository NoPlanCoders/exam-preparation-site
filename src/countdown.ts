const TEST_START_MONTH = 8;
const TEST_START_DAY = 19;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

export interface TestCountdown {
  hours: number;
  days: number;
  target: Date;
}

export function getTestCountdown(now = new Date()): TestCountdown {
  const target = new Date(now.getFullYear(), TEST_START_MONTH, TEST_START_DAY);
  if (target <= now) target.setFullYear(target.getFullYear() + 1);

  const remaining = target.getTime() - now.getTime();
  return {
    hours: Math.ceil(remaining / HOUR_MS),
    days: Math.floor(remaining / DAY_MS),
    target,
  };
}
