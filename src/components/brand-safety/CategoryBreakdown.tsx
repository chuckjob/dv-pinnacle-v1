import { Card, CardContent } from "@/components/ui/card";
import { brandSafetyCategories } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskStyles = {
  high: { bg: "bg-tomato-50", text: "text-tomato-700", dot: "bg-tomato-500", bar: "bg-tomato-300" },
  medium: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500", bar: "bg-orange-500" },
  low: { bg: "bg-grass-50", text: "text-grass-700", dot: "bg-grass-500", bar: "bg-grass-300" },
};

export function CategoryBreakdown() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-h6 text-cool-900 mb-4">Unsuitable Content Categories</h3>

        {/* Risk Tier Legend */}
        <div className="flex items-center gap-4 mb-4">
          {(["high", "medium", "low"] as const).map((risk) => (
            <span key={risk} className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", riskStyles[risk].bg, riskStyles[risk].text)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", riskStyles[risk].dot)} />
              {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
            </span>
          ))}
        </div>

        {/* Horizontal Bar Chart */}
        <div className="space-y-3">
          {brandSafetyCategories.map((cat) => {
            const style = riskStyles[cat.risk];
            return (
              <div key={cat.name} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body3 text-cool-800">{cat.name}</span>
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", style.bg, style.text)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", style.dot)} />
                      {cat.risk.charAt(0).toUpperCase() + cat.risk.slice(1)}
                    </span>
                  </div>
                  <span className="text-body3 font-medium text-cool-900">{cat.percentage}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", style.bar)}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
