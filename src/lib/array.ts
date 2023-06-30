export function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function addItem<T>(arr: T[], item: T) {
  return [...arr, item];
}

export function sliceItem<T>(arr: T[], start?: number | undefined, end?: number | undefined): T[] {
  return [...arr.slice(start, end)];
}
