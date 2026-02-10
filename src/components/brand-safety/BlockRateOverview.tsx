import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";
import { colors } from "@/tokens/foundry";

const blockRateTrend = [
  { date: "Nov 10", withPreBid: 6.2, withoutPreBid: 12.1 },
  { date: "Nov 11", withPreBid: 5.8, withoutPreBid: 11.8 },
  { date: "Nov 12", withPreBid: 6.5, withoutPreBid: 12.4 },
  { date: "Nov 13", withPreBid: 7.1, withoutPreBid: 13.2 },
  { date: "Nov 14", withPreBid: 6.8, withoutPreBid: 12.9 },
  { date: "Nov 15", withPreBid: 9.4, withoutPreBid: 16.2 },
  { date: "Nov 16", withPreBid: 8.9, withoutPreBid: 15.8 },
  { date: "Nov 17", withPreBid: 7.2, withoutPreBid: 13.1 },
  { date: "Nov 18", withPreBid: 6.9, withoutPreBid: 12.7 },
  { date: "Nov 19", withPreBid: 7.8, withoutPreBid: 13.5 },
  { date: "Nov 20", withPreBid: 8.2, withoutPreBid: 14.1 },
  { date: "Nov 21", withPreBid: 8.5, withoutPreBid: 14.6 },
  { date: "Nov 22", withPreBid: 8.7, withoutPreBid: 14.9 },
  { date: "Nov 23", withPreBid: 8.7, withoutPreBid: 15.0 },
];

interface BlockRateOverviewProps {
  blockRate: number;
}

export function BlockRateOverview({ blockRate }: BlockRateOverviewProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Block Rate Card */}
      <Card className="">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-label text-cool-600">Block Rate</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium bg-tomato-50 text-tomato-700">
              <TrendingUp className="h-3 w-3" />
              +2.4%
            </span>
          </div>
          <div className="text-h3 text-cool-900">{blockRate}%</div>
          <p className="text-caption text-cool-600 mt-1">of impressions blocked</p>
        </CardContent>
      </Card>

      {/* Top Blocker */}
      <Card className="">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-label text-cool-600">Top Blocker</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium bg-tomato-50 text-tomato-700">
              <TrendingUp className="h-3 w-3" />
              +12%
            </span>
          </div>
          <div className="text-h4 text-cool-900">Keywords</div>
          <p className="text-caption text-cool-600 mt-1">42% of total blocks</p>
        </CardContent>
      </Card>

      {/* Benchmark */}
      <Card className="">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-label text-cool-600">Industry Benchmark</span>
          </div>
          <div className="text-h4 text-cool-900">6.2%</div>
          <p className="text-caption text-cool-600 mt-1">
            Your rate is {blockRate > 6.2 ? <span className="text-tomato-700">{(blockRate - 6.2).toFixed(1)}% above</span> : <span className="text-grass-700">{(6.2 - blockRate).toFixed(1)}% below</span>} benchmark
          </p>
        </CardContent>
      </Card>

      {/* Trend Chart — full width */}
      <Card className="col-span-3 ">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h6 text-cool-900">Block Rate Trend</h3>
            <div className="flex items-center gap-4 text-caption">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.tomato[300] }} />
                With Pre-Bid
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.cool[300] }} />
                Without Pre-Bid
              </span>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={blockRateTrend} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral[100]} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: colors.cool[500] }} axisLine={{ stroke: colors.neutral[200] }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: colors.cool[500] }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ backgroundColor: colors.white, border: `1px solid ${colors.neutral[200]}`, borderRadius: "8px", fontSize: "12px" }} formatter={(v: number) => `${v}%`} />
                <Area type="monotone" dataKey="withoutPreBid" fill={`${colors.cool[300]}30`} stroke={colors.cool[300]} strokeWidth={2} name="Without Pre-Bid" />
                <Area type="monotone" dataKey="withPreBid" fill={`${colors.tomato[300]}30`} stroke={colors.tomato[300]} strokeWidth={2} name="With Pre-Bid" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
