import type { FC } from "react";
import type { HourlyRecord } from "./types";

export interface Threshold {
  yellow: number;
  red: number;
  direction?: "above" | "below";
}

export interface TimeRange {
  start: number;
  end: number;
}

export type ThresholdMap = Partial<Record<string, Threshold>>;

interface DayTableProps {
  date: string;
  hours: HourlyRecord[];
  thresholds?: ThresholdMap;
  activeHours: TimeRange;
}

function fmtHour(iso: string): string {
  const h = new Date(iso).getHours();
  if (h === 0) return "12a";
  if (h < 12) return `${h}a`;
  if (h === 12) return "12p";
  return `${h - 12}p`;
}

function thresholdClass(value: number | null, threshold?: Threshold): string {
  if (value == null || !threshold) return "";

  if (threshold.direction === "below") {
    if (value <= threshold.red) return "bg-red-300";
    if (value <= threshold.yellow) return "bg-yellow-200";
  } else {
    if (value >= threshold.red) return "bg-red-300";
    if (value >= threshold.yellow) return "bg-yellow-200";
  }

  return "";
}

function activeClass(hour: number, range: TimeRange): string {
  if (hour >= range.start && hour <= range.end) return "bg-blue-100";
  return "";
}

const DayTable: FC<DayTableProps> = ({
  date,
  hours,
  thresholds,
  activeHours,
}) => {
  const rows: {
    label: string;
    unit: string;
    render: (h: HourlyRecord) => string;
    value: (h: HourlyRecord) => number | null;
  }[] = [
    {
      label: "Precip Prob",
      unit: "%",
      render: (h) => `${h.precipitation_probability}`,
      value: (h) => h.precipitation_probability,
    },
    {
      label: "Precip",
      unit: "in",
      render: (h) => (h.precipitation > 0 ? h.precipitation.toFixed(2) : "—"),
      value: (h) => h.precipitation,
    },
    {
      label: "Wind Speed",
      unit: "kn",
      render: (h) => `${h.wind_speed_10m}`,
      value: (h) => h.wind_speed_10m,
    },
    {
      label: "Visibility",
      unit: "m",
      render: (h) => (h.visibility > 0 ? h.visibility.toFixed(0) : "—"),
      value: (h) => h.visibility,
    },
    {
      label: "Wave Height",
      unit: "ft",
      render: (h) => (h.wave_height != null ? h.wave_height.toFixed(1) : "—"),
      value: (h) => h.wave_height,
    },
    {
      label: "Swell Height",
      unit: "ft",
      render: (h) =>
        h.swell_wave_height != null ? h.swell_wave_height.toFixed(1) : "—",
      value: (h) => h.swell_wave_height,
    },
    {
      label: "Wind Wave Height",
      unit: "ft",
      render: (h) =>
        h.wind_wave_heght != null ? h.wind_wave_heght.toFixed(1) : "—",
      value: (h) => h.wind_wave_heght,
    },
  ];

  return (
    <div className="bg-gray-200 p-4 rounded">
      <div className="text-lg font-semibold mb-2">{date}</div>
      <div className="overflow-x-auto">
        <table className="text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left pr-3 py-1 sticky left-0 bg-gray-200 font-medium text-gray-600">
                Variable
              </th>
              {hours.map((h, i) => (
                <th
                  key={i}
                  className="px-1.5 py-1 text-center font-medium text-gray-500 whitespace-nowrap"
                >
                  {fmtHour(h.time)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-gray-300">
                <td className="pr-3 py-1 sticky left-0 bg-gray-200 font-medium text-gray-700 whitespace-nowrap">
                  {row.label}{" "}
                  {row.unit && (
                    <span className="text-gray-400 font-normal">
                      ({row.unit})
                    </span>
                  )}
                </td>
                {hours.map((h, i) => {
                  const hr = new Date(h.time).getHours();
                  const tClass = thresholdClass(
                    row.value(h),
                    thresholds ? thresholds[row.label] : undefined,
                  );
                  const aClass = tClass ? "" : activeClass(hr, activeHours);
                  return (
                    <td
                      key={i}
                      className={`px-1.5 py-1 text-center text-gray-800 ${tClass || aClass}`}
                    >
                      {row.render(h)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DayTable;
