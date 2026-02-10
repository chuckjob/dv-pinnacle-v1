import { useState } from "react";
import { type MetricType } from "@/data/mockData";
import { InsightsBanner } from "./InsightsBanner";
import { AlignmentMetrics } from "./AlignmentMetrics";
import { KpiCards } from "./KpiCards";
import { PerformanceChart } from "./PerformanceChart";
import { CampaignTable } from "./CampaignTable";
import { Card } from "@/components/ui/card";

interface CampaignHealthPageProps {
  sourceFilter: string;
}

export function CampaignHealthPage({ sourceFilter }: CampaignHealthPageProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("impressions");

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-h5 text-cool-900">Campaign Health</h1>
          <p className="text-body3 text-cool-600 mt-1">
            Monitor performance across all campaigns and sources.
          </p>
        </div>

        {/* AI Insights Banner */}
        <InsightsBanner />

        {/* Alignment Metrics */}
        <AlignmentMetrics />

        {/* Unified KPI Metrics + Performance Chart */}
        <Card className="overflow-hidden">
          <KpiCards selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
          <PerformanceChart selectedMetric={selectedMetric} />
        </Card>

        {/* Campaign Table */}
        <CampaignTable sourceFilter={sourceFilter} />
      </div>
    </div>
  );
}
