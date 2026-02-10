import { type CampaignData } from "@/data/mockData";
import { BlockRateOverview } from "@/components/brand-safety/BlockRateOverview";
import { CategoryBreakdown } from "@/components/brand-safety/CategoryBreakdown";
import { TopBlockedContent } from "@/components/brand-safety/TopBlockedContent";
import { KeywordAnalysis } from "@/components/brand-safety/KeywordAnalysis";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useVeraContext } from "@/components/layout/AppLayout";

interface BrandSafetyTabProps {
  campaign: CampaignData;
}

export function BrandSafetyTab({ campaign }: BrandSafetyTabProps) {
  const { openVeraWithContext } = useVeraContext();

  return (
    <div className="space-y-8">
      {/* Block Rate Overview */}
      <BlockRateOverview blockRate={campaign.blockRate} />

      {/* Analyze with Vera CTA — directly after the overview cards */}
      <Card className="border-plum-200 bg-gradient-to-r from-plum-25 to-white">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-plum-50 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-plum-600" />
              </div>
              <div>
                <h3 className="text-body2 font-semibold text-cool-900">Analyze with Vera</h3>
                <p className="text-body3 text-cool-600">Get AI-powered insights on block rate drivers, topic concentration, and optimization opportunities.</p>
              </div>
            </div>
            <button
              onClick={() => openVeraWithContext("brand-safety-analyze")}
              className="px-4 py-2 bg-plum-600 text-white text-body3 font-medium rounded-lg hover:bg-plum-700 transition-colors flex items-center gap-2 flex-shrink-0 ml-4"
            >
              <Sparkles className="h-4 w-4" />
              Analyze
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <CategoryBreakdown />

      {/* Top Blocked Content */}
      <TopBlockedContent />

      {/* Keyword Analysis */}
      <KeywordAnalysis />
    </div>
  );
}
