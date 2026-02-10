import { TrendingUp, TrendingDown } from "lucide-react";
import { metricsConfig, type MetricType } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface KpiCardsProps {
  selectedMetric: MetricType;
  onMetricChange: (metric: MetricType) => void;
}

export function KpiCards({ selectedMetric, onMetricChange }: KpiCardsProps) {
  return (
    <div className="flex border-b border-neutral-100">
      {metricsConfig.map((metric, index) => {
        const isSelected = selectedMetric === metric.id;
        const isPositiveTrend =
          (metric.trendDirection === "up" && ["impressions", "suitability"].includes(metric.id)) ||
          (metric.trendDirection === "down" && ["cpm", "alignedCpm", "cpr"].includes(metric.id));
        const isLast = index === metricsConfig.length - 1;

        return (
          <button
            key={metric.id}
            onClick={() => onMetricChange(metric.id)}
            className={cn(
              "flex-1 text-left px-4 py-4 transition-all duration-200 relative cursor-pointer",
              !isLast && "border-r border-neutral-100",
              isSelected
                ? "bg-plum-25"
                : "hover:bg-neutral-25"
            )}
          >
            {/* Bottom accent for selected */}
            {isSelected && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-plum-500" />
            )}

            <div className="flex items-center justify-between mb-2">
              <span className="text-label text-cool-600 truncate">{metric.label}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-caption font-medium px-1.5 py-0.5 rounded-full",
                  isPositiveTrend
                    ? "text-grass-700 bg-grass-50"
                    : "text-tomato-700 bg-tomato-50"
                )}
              >
                {isPositiveTrend ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.trend}%
              </span>
            </div>
            <div className={cn("text-[24px] leading-[32px] font-bold", isSelected ? "text-plum-700" : "text-cool-900")}>{metric.value}</div>
            <div className="flex gap-3 mt-2 text-caption text-cool-600">
              <span>w/ Pre-Bid: {metric.withPreBid}</span>
              <span>w/o: {metric.withoutPreBid}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
