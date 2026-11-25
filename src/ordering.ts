/** 並べた位置ではなく語句を比較する。同じ語句が複数あっても区別しない。 */
export function isOrderingCorrect(items: string[], selected: number[]): boolean {
  return selected.length === items.length && new Set(selected).size === items.length &&
    selected.every((index, position) => Number.isInteger(index) && index >= 0 && index < items.length && items[index] === items[position]);
}
