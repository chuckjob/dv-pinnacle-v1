import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Play, AlertTriangle } from "lucide-react";
import { formatNumber } from "@/data/mockData";
import { cn } from "@/lib/utils";

const unsuitableContent = [
  { title: "Political Rally Coverage", placement: "FB Feed", impressions: 23400, risk: "high" as const, category: "Political Content" },
  { title: "True Crime Documentary", placement: "IG Reels", impressions: 18700, risk: "medium" as const, category: "Violence" },
  { title: "Controversial Podcast Clip", placement: "FB Reels", impressions: 15200, risk: "medium" as const, category: "Profanity" },
  { title: "Extreme Sports Compilation", placement: "IG Feed", impressions: 12100, risk: "low" as const, category: "Dangerous Acts" },
];

const trendingVideos = [
  { title: "Product Review: Tech Gadgets 2026", views: 1250000, sentiment: "positive", trend: 34 },
  { title: "Behind the Scenes: Fashion Week", views: 890000, sentiment: "positive", trend: 28 },
  { title: "Cooking Challenge: Street Food", views: 2100000, sentiment: "neutral", trend: -5 },
  { title: "Travel Vlog: Hidden Destinations", views: 670000, sentiment: "positive", trend: 42 },
];

const contentCategories = [
  { name: "Entertainment", percentage: 34, impressions: 45600000 },
  { name: "Lifestyle", percentage: 22, impressions: 29500000 },
  { name: "News", percentage: 18, impressions: 24100000 },
  { name: "Sports", percentage: 14, impressions: 18700000 },
  { name: "Education", percentage: 8, impressions: 10700000 },
  { name: "Other", percentage: 4, impressions: 5400000 },
];

const riskStyle = {
  high: "bg-tomato-50 text-tomato-700",
  medium: "bg-orange-50 text-orange-700",
  low: "bg-grass-50 text-grass-700",
};

export function ContentInsightsTab() {
  return (
    <div className="space-y-6">
      {/* Unsuitable Content Previews */}
      <Card className="">
        <CardContent className="p-5">
          <h3 className="text-h6 text-cool-900 mb-4">Unsuitable Content Near Your Ads</h3>
          <div className="grid grid-cols-4 gap-4">
            {unsuitableContent.map((item) => (
              <div key={item.title} className="rounded-xl border border-neutral-100 overflow-hidden">
                <div className="h-24 bg-neutral-100 flex items-center justify-center relative">
                  <AlertTriangle className="h-6 w-6 text-neutral-300" />
                  <span className={cn("absolute top-2 right-2 px-1.5 py-0.5 rounded text-caption font-medium", riskStyle[item.risk])}>
                    {item.risk}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-caption font-medium text-cool-900 line-clamp-1">{item.title}</p>
                  <p className="text-caption text-cool-600 mt-0.5">{item.placement} · {formatNumber(item.impressions)} imp</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-caption bg-neutral-50 text-cool-600">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Videos */}
      <Card className="">
        <CardContent className="p-5">
          <h3 className="text-h6 text-cool-900 mb-4">Trending Videos Near Your Ads</h3>
          <div className="grid grid-cols-4 gap-4">
            {trendingVideos.map((video) => (
              <div key={video.title} className="rounded-xl border border-neutral-100 overflow-hidden hover:shadow-elevation-hover transition-shadow duration-200">
                <div className="h-24 bg-neutral-100 flex items-center justify-center">
                  <Play className="h-8 w-8 text-neutral-300" />
                </div>
                <div className="p-3">
                  <p className="text-caption font-medium text-cool-900 line-clamp-2">{video.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-caption text-cool-600">{formatNumber(video.views)} views</span>
                    <span className={cn("inline-flex items-center gap-0.5 text-caption font-medium", video.trend > 0 ? "text-grass-700" : "text-tomato-700")}>
                      {video.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {Math.abs(video.trend)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Categories */}
      <Card className="">
        <CardContent className="p-5">
          <h3 className="text-h6 text-cool-900 mb-4">Content Categories</h3>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-neutral-100">
                <TableHead className="text-label text-cool-600 font-medium">Category</TableHead>
                <TableHead className="text-label text-cool-600 font-medium">Distribution</TableHead>
                <TableHead className="text-label text-cool-600 font-medium text-right">Impressions</TableHead>
                <TableHead className="text-label text-cool-600 font-medium text-right">Share</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentCategories.map((cat) => (
                <TableRow key={cat.name} className="border-neutral-100">
                  <TableCell className="text-body3 font-medium text-cool-900">{cat.name}</TableCell>
                  <TableCell>
                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-plum-400 rounded-full" style={{ width: `${cat.percentage}%` }} />
                    </div>
                  </TableCell>
                  <TableCell className="text-body3 text-cool-800 text-right">{formatNumber(cat.impressions)}</TableCell>
                  <TableCell className="text-body3 font-medium text-cool-900 text-right">{cat.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
