import { Card, CardContent } from "@/components/ui/card";
import { alignmentData, formatCompactCurrency } from "@/data/mockData";

const total = alignmentData.mediaCost + alignmentData.savedByPreBid + alignmentData.mediaInefficiency;
const mediaPct = (alignmentData.mediaCost / total) * 100;
const savedPct = (alignmentData.savedByPreBid / total) * 100;
const wastePct = (alignmentData.mediaInefficiency / total) * 100;

// Display widths: keep proportional hierarchy but compress for readability
// Gray is clearly largest, green is medium, red is smallest
const displayWidths = { media: 60, saved: 25, waste: 15 };

const segments = [
  {
    label: "Aligned Media Cost",
    value: alignmentData.mediaCost,
    pct: mediaPct,
    displayWidth: displayWidths.media,
    color: "#aaadbb",
    description: "Brand-safe inventory spend",
  },
  {
    label: "Saved by Pre-Bid",
    value: alignmentData.savedByPreBid,
    pct: savedPct,
    displayWidth: displayWidths.saved,
    color: "#94d19e",
    description: "Blocked before serving",
  },
  {
    label: "Media Inefficiency",
    value: alignmentData.mediaInefficiency,
    pct: wastePct,
    displayWidth: displayWidths.waste,
    color: "#e48181",
    description: "Misaligned inventory",
  },
];

export function AlignmentMetrics() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-baseline justify-between mb-6">
          <h3 className="text-h6 text-cool-900">Media Alignment</h3>
          <p className="text-body3 text-cool-600">
            Total Spend: <span className="font-semibold text-cool-900">{formatCompactCurrency(total)}</span>
          </p>
        </div>

        {/* Stacked bar — display widths for readability */}
        <div className="flex h-3 rounded-full overflow-hidden gap-px">
          {segments.map((seg) => (
            <div
              key={seg.label}
              className="transition-all duration-300 first:rounded-l-full last:rounded-r-full"
              style={{ width: `${seg.displayWidth}%`, backgroundColor: seg.color }}
            />
          ))}
        </div>

        {/* Legend row — same widths as bar above */}
        <div className="flex mt-5">
          {segments.map((seg) => (
            <div
              key={seg.label}
              style={{ width: `${seg.displayWidth}%` }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-label text-cool-600 whitespace-nowrap">{seg.label}</span>
              </div>
              <p className="text-[28px] leading-[36px] font-bold text-cool-900 pl-4">{formatCompactCurrency(seg.value)}</p>
              <p className="text-caption text-cool-500 pl-4 whitespace-nowrap">{seg.pct.toFixed(1)}% · {seg.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
