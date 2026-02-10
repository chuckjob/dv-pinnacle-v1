import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dailyPerformanceData, metricInsights, type MetricType } from "@/data/mockData";
import { colors } from "@/tokens/foundry";
import { AlertTriangle, Info, Zap } from "lucide-react";

interface PerformanceChartProps {
  selectedMetric: MetricType;
}

const metricLabels: Record<MetricType, { label: string; format: (v: number) => string }> = {
  impressions: { label: "Impressions (K)", format: (v) => `${(v / 1000).toFixed(0)}K` },
  suitability: { label: "Suitability (%)", format: (v) => `${v}%` },
  cpm: { label: "CPM ($)", format: (v) => `$${v.toFixed(2)}` },
  alignedCpm: { label: "Aligned CPM ($)", format: (v) => `$${v.toFixed(2)}` },
  cpr: { label: "CPR ($)", format: (v) => `$${v.toFixed(3)}` },
};

const insightIcons = {
  info: Info,
  warning: AlertTriangle,
  activation: Zap,
};

const insightColors = {
  info: { bg: "bg-sky-50", text: "text-sky-500", border: "border-sky-100" },
  warning: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
  activation: { bg: "bg-grass-50", text: "text-grass-700", border: "border-grass-100" },
};

export function PerformanceChart({ selectedMetric }: PerformanceChartProps) {
  const chartData = dailyPerformanceData[selectedMetric];
  const insights = metricInsights[selectedMetric];
  const { label, format } = metricLabels[selectedMetric];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h6 text-cool-900">Daily Performance — {label}</h3>
        <div className="flex items-center gap-4 text-caption">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.plum[500] }} />
            With Pre-Bid
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.cool[300] }} />
            Without Pre-Bid
          </span>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral[100]} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: colors.cool[500] }}
              axisLine={{ stroke: colors.neutral[200] }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: colors.cool[500] }}
              axisLine={false}
              tickLine={false}
              tickFormatter={format}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.neutral[200]}`,
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              }}
              formatter={(value: number) => format(value)}
            />
            <Bar
              dataKey="withPreBid"
              fill={colors.plum[500]}
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="With Pre-Bid"
            />
            <Bar
              dataKey="withoutPreBid"
              fill={colors.cool[300]}
              radius={[4, 4, 0, 0]}
              barSize={20}
              name="Without Pre-Bid"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Contextual Insights */}
      {insights.length > 0 && (
        <div className="mt-4 space-y-2">
          {insights.map((insight, i) => {
            const Icon = insightIcons[insight.type];
            const style = insightColors[insight.type];
            return (
              <div
                key={i}
                className={`flex items-start gap-2 p-2.5 rounded-md border ${style.bg} ${style.border}`}
              >
                <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${style.text}`} />
                <p className="text-body3 text-cool-800">{insight.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
