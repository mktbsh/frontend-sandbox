export type MemoryInfo = {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
};

/**
 * Performance.memory is deprecated
 */
export function getUnSafeMemoryInfo(): MemoryInfo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const memory = (performance as any).memory;
  const jsHeapSizeLimit = memory.jsHeapSizeLimit as number;
  const totalJSHeapSize = memory.totalJSHeapSize as number;
  const usedJSHeapSize = memory.usedJSHeapSize as number;

  return {
    jsHeapSizeLimit,
    totalJSHeapSize,
    usedJSHeapSize,
  };
}

const bytesMap = {
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
};

export function bytesTo(bytes: number, unit: keyof typeof bytesMap) {
  return bytes / bytesMap[unit];
}

export function bytesFormat(
  bytes: number,
  unit: keyof typeof bytesMap,
  digit = 2,
) {
  return `${bytesTo(bytes, unit).toFixed(digit)}${unit}`;
}

export const toPercent = (decimal: number) => `${(decimal * 100).toFixed(0)}%`;

export const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;
  return `${(ratio * 100).toFixed(2)}%`;
};
