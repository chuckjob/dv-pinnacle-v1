import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldOff, MessageSquare, ExternalLink, AlertTriangle } from "lucide-react";
import { blockedContentItems, formatNumber, formatCurrency } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskBadge = {
  high: { bg: "bg-tomato-50", text: "text-tomato-700", border: "border-tomato-200", dot: "bg-tomato-500" },
  medium: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  low: { bg: "bg-grass-50", text: "text-grass-700", border: "border-grass-200", dot: "bg-grass-500" },
};

export function TopBlockedContent() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-h6 text-cool-900 mb-4">Top Blocked Content</h3>

        <div className="grid grid-cols-2 gap-4">
          {blockedContentItems.map((item) => {
            const badge = riskBadge[item.risk];
            return (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-100 overflow-hidden hover:shadow-elevation-hover transition-shadow duration-200"
              >
                {/* Thumbnail */}
                <div className="h-32 bg-neutral-100 relative overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <AlertTriangle className="h-8 w-8 text-neutral-300" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", badge.bg, badge.text)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", badge.dot)} />
                      {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-body3 font-medium text-cool-900 mb-1 line-clamp-1">{item.title}</h4>
                  <p className="text-caption text-cool-600 mb-3">{item.source}</p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.categories.map((cat) => (
                      <span key={cat} className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium border", badge.bg, badge.text, badge.border)}>
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 text-caption text-cool-600 mb-3">
                    <span>{formatNumber(item.impressions)} impressions</span>
                    <span>{formatCurrency(item.mediaWaste)} waste</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-caption gap-1">
                      <ShieldOff className="h-3 w-3" />
                      Blocklist
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-caption gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Feedback
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-caption gap-1 ml-auto">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
