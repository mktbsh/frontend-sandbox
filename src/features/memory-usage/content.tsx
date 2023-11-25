import { useEffect, useState } from "react";
import { bytesFormat, getUnSafeMemoryInfo } from "./lib";

type State = {
  limit: number;
  total: number;
  used: number;
  timestamp: Date;
};

function toHHMMSS(date: Date) {
  const format = (num: number) => num.toString().padStart(2, "0");

  const hours = format(date.getHours());
  const minutes = format(date.getMinutes());
  const seconds = format(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

export function MemoryUsageContent() {
  const [state, setState] = useState<State>();

  useEffect(() => {
    const { jsHeapSizeLimit, usedJSHeapSize, totalJSHeapSize } =
      getUnSafeMemoryInfo();

    setState({
      limit: jsHeapSizeLimit,
      total: totalJSHeapSize,
      used: usedJSHeapSize,
      timestamp: new Date(),
    });
  }, []);

  if (!state) return null;

  return (
    <div className="w-40 p-3">
      <div className="flex flex-row justify-between">
        <span>使用可能:</span>
        <span>{bytesFormat(state.limit, "GB")}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span>割当済:</span>
        <span>{bytesFormat(state.total, "MB")}</span>
      </div>
      <div className="flex flex-row justify-between">
        <span>使用中:</span>
        <span>{bytesFormat(state.used, "MB")}</span>
      </div>
      <div className="mt-1 flex flex-row justify-between text-xs text-gray-400">
        <span>最終更新:</span>
        <span>{toHHMMSS(state.timestamp)}</span>
      </div>
    </div>
  );
}
