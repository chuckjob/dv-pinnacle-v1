import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { campaignsData } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { BrandSafetyTab } from "./BrandSafetyTab";
import { SummaryTab } from "./SummaryTab";
import { ContentInsightsTab } from "./ContentInsightsTab";
import { AiOptimizationTab } from "./AiOptimizationTab";

type TabId = "summary" | "brand-safety" | "content-insights" | "ai-optimization";

const tabs: { id: TabId; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "brand-safety", label: "Brand Safety" },
  { id: "content-insights", label: "Content Insights" },
  { id: "ai-optimization", label: "AI Optimization" },
];

const statusConfig = {
  "on-track": { label: "On Track", bgColor: "bg-grass-50", textColor: "text-grass-700", dotColor: "bg-grass-500" },
  "at-risk": { label: "At Risk", bgColor: "bg-orange-50", textColor: "text-orange-700", dotColor: "bg-orange-500" },
  "needs-attention": { label: "Needs Attention", bgColor: "bg-tomato-50", textColor: "text-tomato-700", dotColor: "bg-tomato-500" },
};

export function CampaignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("summary");

  const campaign = campaignsData.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-body2 text-cool-600">Campaign not found.</p>
      </div>
    );
  }

  const status = statusConfig[campaign.status];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-body3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="text-cool-600 hover:text-plum-500 transition-colors duration-200 flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Campaign Health
          </button>
          <ChevronRight className="h-4 w-4 text-cool-600" />
          <span className="text-cool-900 font-medium">{campaign.name}</span>
        </div>

        {/* Campaign Header */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-h5 text-cool-900">{campaign.name}</h1>
          <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", status.bgColor, status.textColor)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", status.dotColor)} />
            {status.label}
          </span>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 border-b border-neutral-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2.5 text-body3 font-medium transition-colors duration-200 relative",
                activeTab === tab.id
                  ? "text-plum-600"
                  : "text-cool-600 hover:text-cool-900"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-plum-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "summary" && <SummaryTab campaign={campaign} onNavigateToTab={(tab) => setActiveTab(tab as TabId)} />}
        {activeTab === "brand-safety" && <BrandSafetyTab campaign={campaign} />}
        {activeTab === "content-insights" && <ContentInsightsTab />}
        {activeTab === "ai-optimization" && <AiOptimizationTab />}
      </div>
    </div>
  );
}
