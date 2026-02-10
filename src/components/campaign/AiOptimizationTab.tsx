import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Clock, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const recommendations = [
  {
    id: "1",
    title: "Enable Pre-Bid on 3 remaining ad accounts",
    description: "Ad accounts 4, 7, and 10 are not using pre-bid filtering. Based on current block rates, enabling pre-bid could save approximately $18K in media waste.",
    impact: "High",
    savings: "$18,000",
    type: "activation",
    status: "pending" as const,
  },
  {
    id: "2",
    title: "Adjust IG Reels inventory filter to Moderate",
    description: "IG Reels currently uses Limited filter, which may be over-blocking suitable content. Switching to Moderate could recover ~4% in reach while maintaining suitability above 90%.",
    impact: "Medium",
    savings: "$5,200",
    type: "optimization",
    status: "pending" as const,
  },
  {
    id: "3",
    title: "Review and trim keyword blocklist",
    description: "12 keywords on your blocklist have low incident rates (<0.1%) and may be unnecessarily limiting reach. Consider reviewing: 'investigation', 'crisis', 'controversy'.",
    impact: "Low",
    savings: "$3,100",
    type: "cleanup",
    status: "pending" as const,
  },
  {
    id: "4",
    title: "Consolidated brand safety profile update",
    description: "Your profile was last updated 45 days ago. A quarterly review is recommended to align with current content trends.",
    impact: "Medium",
    savings: "-",
    type: "review",
    status: "completed" as const,
  },
];

const pastInquiries = [
  { question: "Why did block rate spike on Nov 15?", date: "Nov 16, 2026", summary: "Spike caused by Maduro Capture news event. Affected categories: Violence, Death & Injury." },
  { question: "Which placements have the highest CPM?", date: "Nov 14, 2026", summary: "IG Feed ($9.12) and FB Feed ($8.45) have highest CPMs. Consider rebalancing budget toward Threads ($4.23)." },
  { question: "How does our suitability compare to benchmarks?", date: "Nov 12, 2026", summary: "With pre-bid: 97% (above 94% benchmark). Without: 92% (below benchmark)." },
];

const impactColors = {
  High: "bg-tomato-50 text-tomato-700",
  Medium: "bg-orange-50 text-orange-700",
  Low: "bg-grass-50 text-grass-700",
};

export function AiOptimizationTab() {
  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <Card className="">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-plum-500" />
            <h3 className="text-h6 text-cool-900">AI Recommendations</h3>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={cn(
                  "p-4 rounded-lg border transition-colors duration-200",
                  rec.status === "completed"
                    ? "border-neutral-100 bg-neutral-25 opacity-70"
                    : "border-neutral-200 hover:border-plum-200 hover:bg-plum-25"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {rec.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-grass-500 flex-shrink-0" />
                      ) : (
                        <Lightbulb className="h-4 w-4 text-plum-500 flex-shrink-0" />
                      )}
                      <h4 className="text-body3 font-medium text-cool-900">{rec.title}</h4>
                    </div>
                    <p className="text-caption text-cool-600 ml-6">{rec.description}</p>
                    <div className="flex items-center gap-3 mt-2 ml-6">
                      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", impactColors[rec.impact as keyof typeof impactColors])}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", rec.impact === "High" ? "bg-tomato-500" : rec.impact === "Medium" ? "bg-orange-500" : "bg-grass-500")} />
                        {rec.impact} Impact
                      </span>
                      {rec.savings !== "-" && (
                        <span className="flex items-center gap-1 text-caption text-grass-700">
                          <TrendingUp className="h-3 w-3" />
                          Est. savings: {rec.savings}
                        </span>
                      )}
                    </div>
                  </div>
                  {rec.status === "pending" && (
                    <Button variant="plum" size="sm" className="text-caption h-8 gap-1 flex-shrink-0">
                      Apply
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Vera Inquiries */}
      <Card className="">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-cool-600" />
            <h3 className="text-h6 text-cool-900">Past Vera Inquiries</h3>
          </div>

          <div className="space-y-3">
            {pastInquiries.map((inquiry) => (
              <div key={inquiry.question} className="p-3 rounded-lg border border-neutral-200 hover:bg-neutral-25 transition-colors duration-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-body3 font-medium text-cool-900">{inquiry.question}</p>
                  <span className="text-caption text-cool-600 flex-shrink-0">{inquiry.date}</span>
                </div>
                <p className="text-caption text-cool-600">{inquiry.summary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
