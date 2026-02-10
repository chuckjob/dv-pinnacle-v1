import { Card, CardContent } from "@/components/ui/card";
import { type CampaignData, formatNumber, formatCurrency } from "@/data/mockData";
import { TrendingUp, TrendingDown, Shield, DollarSign, Eye, Target, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors } from "@/tokens/foundry";

interface SummaryTabProps {
  campaign: CampaignData;
  onNavigateToTab?: (tab: string) => void;
}

export function SummaryTab({ campaign, onNavigateToTab }: SummaryTabProps) {
  const metrics = [
    {
      label: "Measured Impressions",
      value: formatNumber(campaign.impressions),
      icon: Eye,
      color: colors.sky[500],
      trend: "+12.3%",
      positive: true,
    },
    {
      label: "Brand Suitability",
      value: `${campaign.suitabilityRate}%`,
      icon: Shield,
      color: colors.turquoise[500],
      trend: "+6.0%",
      positive: true,
    },
    {
      label: "CPM",
      value: `$${campaign.cpm.toFixed(2)}`,
      icon: DollarSign,
      color: colors.berry[500],
      trend: "-3.2%",
      positive: true,
    },
    {
      label: "Media Cost",
      value: formatCurrency(campaign.mediaCost),
      icon: Target,
      color: colors.orange[500],
      trend: "+8.1%",
      positive: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${metric.color}15` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: metric.color }} />
                  </div>
                  <span className="text-label text-cool-600">{metric.label}</span>
                </div>
                <div className="text-h4 text-cool-900 mb-1">{metric.value}</div>
                <span className={`inline-flex items-center gap-0.5 text-caption font-medium ${metric.positive ? "text-grass-700" : "text-tomato-700"}`}>
                  {metric.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.trend}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Brand Safety Overview */}
      <Card
        className="cursor-pointer hover:shadow-elevation-hover transition-all group"
        onClick={() => onNavigateToTab?.("brand-safety")}
      >
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-plum-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-5 w-5 text-plum-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-body2 font-semibold text-cool-900">Brand Safety</h3>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium",
                    campaign.blockRate > 8 ? "bg-tomato-50 text-tomato-700" : campaign.blockRate > 5 ? "bg-orange-50 text-orange-700" : "bg-grass-50 text-grass-700"
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      campaign.blockRate > 8 ? "bg-tomato-500" : campaign.blockRate > 5 ? "bg-orange-500" : "bg-grass-500"
                    )} />
                    {campaign.blockRate > 8 ? "Needs Attention" : campaign.blockRate > 5 ? "Monitor" : "Healthy"}
                  </span>
                </div>
                <p className="text-body3 text-cool-600">
                  {campaign.brandSafetyProfile} · {campaign.blockRate}% block rate · {campaign.suitabilityRate}% suitability
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-400 group-hover:text-plum-500 transition-colors flex-shrink-0 ml-3" />
          </div>
        </CardContent>
      </Card>

      {/* Service Activation */}
      <Card className="">
        <CardContent className="p-5">
          <h3 className="text-h6 text-cool-900 mb-4">Service Activation</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { service: "Authentic Brand Suitability", status: "Active", source: "Meta" },
              { service: "Pre-Bid Filtering", status: "Active", source: "Meta" },
              { service: "Custom Contextual", status: "Not Active", source: "-" },
            ].map((item) => (
              <div key={item.service} className="p-3 rounded-lg border border-neutral-200 bg-neutral-25">
                <p className="text-body3 font-medium text-cool-900">{item.service}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium ${item.status === "Active" ? "bg-grass-50 text-grass-700" : "bg-neutral-100 text-cool-600"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Active" ? "bg-grass-500" : "bg-neutral-300"}`} />
                    {item.status}
                  </span>
                  <span className="text-caption text-cool-600">{item.source}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Missed Opportunities */}
      <Card className="">
        <CardContent className="p-5">
          <h3 className="text-h6 text-cool-900 mb-4">Missed Opportunities</h3>
          <div className="space-y-3">
            {[
              { title: "Enable Pre-Bid on 3 additional ad accounts", impact: "Estimated $18K in savings", priority: "high" },
              { title: "Switch IG Reels to Moderate inventory filter", impact: "Improve suitability by ~4%", priority: "medium" },
              { title: "Review keyword blocklist — 12 low-risk keywords may be over-blocking", impact: "Recover ~$5K in reach", priority: "low" },
            ].map((opp) => (
              <div key={opp.title} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-25 transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${opp.priority === "high" ? "bg-tomato-500" : opp.priority === "medium" ? "bg-orange-500" : "bg-lemon-500"}`} />
                <div className="flex-1">
                  <p className="text-body3 font-medium text-cool-900">{opp.title}</p>
                  <p className="text-caption text-cool-600">{opp.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
