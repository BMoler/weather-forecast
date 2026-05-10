import type { FC } from "react";
import type { HourlyRecord } from "./types";

interface DayTableProps {
  date: string;
  hours: HourlyRecord[];
}

function fmtHour(iso: string): string {
  const h = new Date(iso).getHours();
  if (h === 0) return "12a";
  if (h < 12) return `${h}a`;
  if (h === 12) return "12p";
  return `${h - 12}p`;
}

const DayTable: FC<DayTableProps> = ({ date, hours }) => {
  const rows: {
    label: string;
    unit: string;
    render: (h: HourlyRecord) => string;
  }[] = [
    {
      label: "Precip Prob",
      unit: "%",
      render: (h) => `${h.precipitation_probability}`,
    },
    {
      label: "Precip",
      unit: "in",
      render: (h) => (h.precipitation > 0 ? h.precipitation.toFixed(2) : "—"),
    },
    {
      label: "Wind Speed",
      unit: "kn",
      render: (h) => `${h.wind_speed_10m}`,
    },
    {
      label: "Visibility",
      unit: "sm",
      render: (h) => `${h.visibility}`,
    },
    {
      label: "Wave Height",
      unit: "ft",
      render: (h) => (h.wave_height != null ? h.wave_height.toFixed(1) : "—"),
    },
    {
      label: "Swell Height",
      unit: "ft",
      render: (h) =>
        h.swell_wave_height != null ? h.swell_wave_height.toFixed(1) : "—",
    },
    {
      label: "Wind Wave Height",
      unit: "ft",
      render: (h) =>
        h.wind_wave_heght != null ? h.wind_wave_heght.toFixed(1) : "—",
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
                {hours.map((h, i) => (
                  <td key={i} className="px-1.5 py-1 text-center text-gray-800">
                    {row.render(h)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DayTable;
