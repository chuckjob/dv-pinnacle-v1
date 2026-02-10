/**
 * Mock data for Campaign Health prototype
 * Adapted from Loveable "Meta Authentic AdVantage" prototype
 */

export type MetricType = "impressions" | "suitability" | "cpm" | "alignedCpm" | "cpr";

export interface MetricConfig {
  id: MetricType;
  label: string;
  value: string;
  withPreBid: string;
  withoutPreBid: string;
  trend: number; // percentage change
  trendDirection: "up" | "down";
}

export const metricsConfig: MetricConfig[] = [
  { id: "impressions", label: "Measured Impressions", value: "1.10B", withPreBid: "0.7B", withoutPreBid: "0.4B", trend: 12.3, trendDirection: "up" },
  { id: "suitability", label: "Brand Suitability", value: "97%", withPreBid: "98%", withoutPreBid: "92%", trend: 6.0, trendDirection: "up" },
  { id: "cpm", label: "Eligible 1st-party CPM", value: "$7.50", withPreBid: "$7.30", withoutPreBid: "$7.80", trend: 3.2, trendDirection: "down" },
  { id: "alignedCpm", label: "Aligned Media CPM", value: "$7.10", withPreBid: "$7.00", withoutPreBid: "$7.30", trend: 4.1, trendDirection: "down" },
  { id: "cpr", label: "Eligible 1st-party CPR", value: "$0.014", withPreBid: "$0.012", withoutPreBid: "$0.015", trend: 20.0, trendDirection: "down" },
];

export const dailyPerformanceData: Record<MetricType, Array<{ date: string; withPreBid: number; withoutPreBid: number }>> = {
  impressions: [
    { date: "Nov 10", withPreBid: 15000, withoutPreBid: 3000 },
    { date: "Nov 11", withPreBid: 16500, withoutPreBid: 2800 },
    { date: "Nov 12", withPreBid: 15800, withoutPreBid: 3200 },
    { date: "Nov 13", withPreBid: 16200, withoutPreBid: 2900 },
    { date: "Nov 14", withPreBid: 14500, withoutPreBid: 3100 },
    { date: "Nov 15", withPreBid: 9500, withoutPreBid: 2000 },
    { date: "Nov 16", withPreBid: 8200, withoutPreBid: 1800 },
    { date: "Nov 17", withPreBid: 15200, withoutPreBid: 3000 },
    { date: "Nov 18", withPreBid: 16000, withoutPreBid: 2700 },
    { date: "Nov 19", withPreBid: 15500, withoutPreBid: 3100 },
    { date: "Nov 20", withPreBid: 16800, withoutPreBid: 2600 },
    { date: "Nov 21", withPreBid: 15900, withoutPreBid: 2900 },
    { date: "Nov 22", withPreBid: 16100, withoutPreBid: 2800 },
    { date: "Nov 23", withPreBid: 15700, withoutPreBid: 3000 },
  ],
  suitability: [
    { date: "Nov 10", withPreBid: 96, withoutPreBid: 89 },
    { date: "Nov 11", withPreBid: 98, withoutPreBid: 91 },
    { date: "Nov 12", withPreBid: 97, withoutPreBid: 90 },
    { date: "Nov 13", withPreBid: 98, withoutPreBid: 92 },
    { date: "Nov 14", withPreBid: 97, withoutPreBid: 88 },
    { date: "Nov 15", withPreBid: 94, withoutPreBid: 82 },
    { date: "Nov 16", withPreBid: 95, withoutPreBid: 84 },
    { date: "Nov 17", withPreBid: 98, withoutPreBid: 91 },
    { date: "Nov 18", withPreBid: 98, withoutPreBid: 93 },
    { date: "Nov 19", withPreBid: 97, withoutPreBid: 92 },
    { date: "Nov 20", withPreBid: 99, withoutPreBid: 94 },
    { date: "Nov 21", withPreBid: 98, withoutPreBid: 93 },
    { date: "Nov 22", withPreBid: 98, withoutPreBid: 92 },
    { date: "Nov 23", withPreBid: 97, withoutPreBid: 91 },
  ],
  cpm: [
    { date: "Nov 10", withPreBid: 7.2, withoutPreBid: 7.9 },
    { date: "Nov 11", withPreBid: 7.1, withoutPreBid: 7.8 },
    { date: "Nov 12", withPreBid: 7.3, withoutPreBid: 7.7 },
    { date: "Nov 13", withPreBid: 7.2, withoutPreBid: 7.9 },
    { date: "Nov 14", withPreBid: 7.4, withoutPreBid: 8.0 },
    { date: "Nov 15", withPreBid: 7.8, withoutPreBid: 8.5 },
    { date: "Nov 16", withPreBid: 7.6, withoutPreBid: 8.3 },
    { date: "Nov 17", withPreBid: 7.3, withoutPreBid: 7.8 },
    { date: "Nov 18", withPreBid: 7.2, withoutPreBid: 7.7 },
    { date: "Nov 19", withPreBid: 7.3, withoutPreBid: 7.8 },
    { date: "Nov 20", withPreBid: 7.1, withoutPreBid: 7.6 },
    { date: "Nov 21", withPreBid: 7.2, withoutPreBid: 7.7 },
    { date: "Nov 22", withPreBid: 7.3, withoutPreBid: 7.8 },
    { date: "Nov 23", withPreBid: 7.4, withoutPreBid: 7.9 },
  ],
  alignedCpm: [
    { date: "Nov 10", withPreBid: 6.9, withoutPreBid: 7.4 },
    { date: "Nov 11", withPreBid: 6.8, withoutPreBid: 7.3 },
    { date: "Nov 12", withPreBid: 7.0, withoutPreBid: 7.2 },
    { date: "Nov 13", withPreBid: 6.9, withoutPreBid: 7.4 },
    { date: "Nov 14", withPreBid: 7.1, withoutPreBid: 7.5 },
    { date: "Nov 15", withPreBid: 7.5, withoutPreBid: 8.0 },
    { date: "Nov 16", withPreBid: 7.3, withoutPreBid: 7.8 },
    { date: "Nov 17", withPreBid: 7.0, withoutPreBid: 7.3 },
    { date: "Nov 18", withPreBid: 6.9, withoutPreBid: 7.2 },
    { date: "Nov 19", withPreBid: 7.0, withoutPreBid: 7.3 },
    { date: "Nov 20", withPreBid: 6.8, withoutPreBid: 7.1 },
    { date: "Nov 21", withPreBid: 6.9, withoutPreBid: 7.2 },
    { date: "Nov 22", withPreBid: 7.0, withoutPreBid: 7.3 },
    { date: "Nov 23", withPreBid: 7.1, withoutPreBid: 7.4 },
  ],
  cpr: [
    { date: "Nov 10", withPreBid: 0.012, withoutPreBid: 0.016 },
    { date: "Nov 11", withPreBid: 0.011, withoutPreBid: 0.015 },
    { date: "Nov 12", withPreBid: 0.012, withoutPreBid: 0.015 },
    { date: "Nov 13", withPreBid: 0.011, withoutPreBid: 0.016 },
    { date: "Nov 14", withPreBid: 0.013, withoutPreBid: 0.017 },
    { date: "Nov 15", withPreBid: 0.015, withoutPreBid: 0.019 },
    { date: "Nov 16", withPreBid: 0.014, withoutPreBid: 0.018 },
    { date: "Nov 17", withPreBid: 0.012, withoutPreBid: 0.015 },
    { date: "Nov 18", withPreBid: 0.011, withoutPreBid: 0.014 },
    { date: "Nov 19", withPreBid: 0.012, withoutPreBid: 0.015 },
    { date: "Nov 20", withPreBid: 0.010, withoutPreBid: 0.014 },
    { date: "Nov 21", withPreBid: 0.011, withoutPreBid: 0.014 },
    { date: "Nov 22", withPreBid: 0.012, withoutPreBid: 0.015 },
    { date: "Nov 23", withPreBid: 0.013, withoutPreBid: 0.016 },
  ],
};

export const metricInsights: Record<MetricType, Array<{ date: string; type: "info" | "warning" | "activation"; message: string }>> = {
  impressions: [
    { date: "Nov 11", type: "info", message: "Prebid was activated on ad accounts 1, 2 and 3, causing suitability rate to jump +6%." },
    { date: "Nov 15", type: "warning", message: "Major News Event on 11/15/26: Maduro Capture causing a spike in incidents across the following categories: Violence, Death & Injury, and Drugs & Alcohol." },
    { date: "Nov 20", type: "activation", message: "New Activation on 11/20: Campaign XYZ was launched causing an increase in measured impressions." },
  ],
  suitability: [
    { date: "Nov 11", type: "activation", message: "Pre-bid activation improved brand suitability rate by 6% across activated accounts." },
    { date: "Nov 15", type: "warning", message: "News event caused temporary dip in suitability rates due to increased sensitive content." },
  ],
  cpm: [
    { date: "Nov 11", type: "info", message: "CPM optimization achieved through pre-bid filtering, reducing wasted spend." },
    { date: "Nov 15", type: "warning", message: "CPM spike observed due to increased competition during news event." },
  ],
  alignedCpm: [
    { date: "Nov 11", type: "activation", message: "Aligned media CPM improved by 4% with pre-bid activation." },
  ],
  cpr: [
    { date: "Nov 11", type: "activation", message: "Cost per reach improved by 20% with pre-bid filtering enabled." },
    { date: "Nov 15", type: "warning", message: "Temporary CPR increase due to reduced reach during news event." },
  ],
};

export interface CampaignData {
  id: string;
  name: string;
  status: "on-track" | "at-risk" | "needs-attention";
  source: string;
  impressions: number;
  suitabilityRate: number;
  cpm: number;
  mediaCost: number;
  inefficiency: number;
  blockRate: number;
  brandSafetyProfile: string;
}

export const campaignsData: CampaignData[] = [
  { id: "1", name: "Q1 2026 Harbor Brew Zero Brand Awareness - US Market", status: "needs-attention", source: "Meta", impressions: 384923000, suitabilityRate: 91.3, cpm: 8.70, mediaCost: 564363, inefficiency: 8.7, blockRate: 8.7, brandSafetyProfile: "Harbor Brew Zero — US Standard" },
  { id: "2", name: "TechStart - Product Launch", status: "needs-attention", source: "Meta", impressions: 123456700, suitabilityRate: 90.8, cpm: 9.20, mediaCost: 917343, inefficiency: 9.2, blockRate: 9.2, brandSafetyProfile: "Harbor Brew Zero — US Standard" },
  { id: "3", name: "FinServ - Retirement Planning", status: "needs-attention", source: "YouTube", impressions: 234567800, suitabilityRate: 89.9, cpm: 7.80, mediaCost: 173643, inefficiency: 10.1, blockRate: 10.1, brandSafetyProfile: "Global Markets — EMEA Compliance" },
  { id: "4", name: "RetailMax - Spring Sale", status: "at-risk", source: "Meta", impressions: 345678900, suitabilityRate: 92.9, cpm: 6.50, mediaCost: 567453, inefficiency: 7.1, blockRate: 7.1, brandSafetyProfile: "Harbor Brew Zero — US Standard" },
  { id: "5", name: "AutoDrive - EV Launch", status: "at-risk", source: "YouTube", impressions: 456789000, suitabilityRate: 93.1, cpm: 7.20, mediaCost: 927454, inefficiency: 6.9, blockRate: 6.9, brandSafetyProfile: "Harbor Brew — Sports & Entertainment" },
  { id: "6", name: "HealthPlus - Wellness Program", status: "on-track", source: "Meta", impressions: 567890100, suitabilityRate: 94.8, cpm: 5.40, mediaCost: 1928374, inefficiency: 5.2, blockRate: 5.2, brandSafetyProfile: "Harbor Brew Zero — US Standard" },
  { id: "7", name: "FoodCo - New Menu Items", status: "on-track", source: "TikTok", impressions: 678901200, suitabilityRate: 95.2, cpm: 4.80, mediaCost: 2837593, inefficiency: 4.8, blockRate: 4.8, brandSafetyProfile: "Harbor Brew — Sports & Entertainment" },
  { id: "8", name: "TravelEasy - Summer Getaways", status: "on-track", source: "Meta", impressions: 789012300, suitabilityRate: 94.1, cpm: 6.10, mediaCost: 823743, inefficiency: 5.9, blockRate: 5.9, brandSafetyProfile: "Global Markets — EMEA Compliance" },
  { id: "9", name: "EduLearn - Online Courses", status: "on-track", source: "YouTube", impressions: 890123400, suitabilityRate: 96.6, cpm: 5.20, mediaCost: 1234567, inefficiency: 3.4, blockRate: 3.4, brandSafetyProfile: "Global Markets — EMEA Compliance" },
  { id: "10", name: "SportGear - Winter Collection", status: "on-track", source: "Meta", impressions: 901234500, suitabilityRate: 95.9, cpm: 5.80, mediaCost: 2345678, inefficiency: 4.1, blockRate: 4.1, brandSafetyProfile: "Harbor Brew Zero — US Standard" },
  { id: "11", name: "BeautyBrand - Skincare Launch", status: "on-track", source: "TikTok", impressions: 345678000, suitabilityRate: 94.5, cpm: 6.30, mediaCost: 456789, inefficiency: 5.5, blockRate: 5.5, brandSafetyProfile: "Global Markets — EMEA Compliance" },
  { id: "12", name: "GreenEnergy - Solar Awareness", status: "on-track", source: "YouTube", impressions: 234567000, suitabilityRate: 97.2, cpm: 4.90, mediaCost: 345678, inefficiency: 2.8, blockRate: 2.8, brandSafetyProfile: "Global Markets — EMEA Compliance" },
];

export const alignmentData = {
  mediaCost: 2450000,
  savedByPreBid: 320000,
  mediaInefficiency: 50000,
};

export const brandSafetyCategories = [
  { name: "Adult Content", risk: "high" as const, impressions: 12450, percentage: 32 },
  { name: "Violence", risk: "high" as const, impressions: 8230, percentage: 21 },
  { name: "Drugs & Alcohol", risk: "medium" as const, impressions: 6120, percentage: 16 },
  { name: "Hate Speech", risk: "high" as const, impressions: 4890, percentage: 13 },
  { name: "Misinformation", risk: "medium" as const, impressions: 3210, percentage: 8 },
  { name: "Profanity", risk: "low" as const, impressions: 2340, percentage: 6 },
  { name: "Gambling", risk: "low" as const, impressions: 1560, percentage: 4 },
];

export const blockedContentItems = [
  {
    id: "1",
    title: "Iran Water Crisis: Lake Urmia Dries Up Amid Record Drought",
    source: "reuters.com",
    thumbnail: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=400&h=256&fit=crop",
    categories: ["Violence", "Death & Injury"],
    risk: "high" as const,
    impressions: 45200,
    mediaWaste: 3240,
  },
  {
    id: "2",
    title: "Iran Political Unrest: Protests Erupt Across Major Cities",
    source: "bbc.com",
    thumbnail: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=400&h=256&fit=crop",
    categories: ["Dangerous Acts", "Political Content"],
    risk: "high" as const,
    impressions: 38900,
    mediaWaste: 2890,
  },
  {
    id: "3",
    title: "Escalating Tensions: Iran-Israel Conflict Coverage Intensifies",
    source: "aljazeera.com",
    thumbnail: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=400&h=256&fit=crop",
    categories: ["War & Conflict", "Arms & Ammunition"],
    risk: "medium" as const,
    impressions: 28700,
    mediaWaste: 1560,
  },
  {
    id: "4",
    title: "Graphic Footage: Violent Clashes During Iran Border Standoff",
    source: "cnn.com",
    thumbnail: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=400&h=256&fit=crop",
    categories: ["Violence", "Graphic Content"],
    risk: "high" as const,
    impressions: 19300,
    mediaWaste: 890,
  },
];

export const trendingKeywords = [
  { keyword: "election", impressions: 234000, mediaCost: 18720, trend: 45, blocked: true },
  { keyword: "scandal", impressions: 189000, mediaCost: 15120, trend: 32, blocked: true },
  { keyword: "protest", impressions: 156000, mediaCost: 12480, trend: 28, blocked: true },
  { keyword: "violence", impressions: 134000, mediaCost: 10720, trend: -12, blocked: true },
  { keyword: "crisis", impressions: 98000, mediaCost: 7840, trend: 18, blocked: false },
  { keyword: "controversy", impressions: 87000, mediaCost: 6960, trend: 22, blocked: false },
  { keyword: "investigation", impressions: 76000, mediaCost: 6080, trend: -5, blocked: false },
  { keyword: "lawsuit", impressions: 65000, mediaCost: 5200, trend: 15, blocked: true },
];

/** Brand Safety Profiles */
export interface BrandSafetyProfile {
  id: string;
  name: string;
  description: string;
  status: "active" | "draft" | "archived";
  campaignsUsing: number;
  categories: string[];
  riskLevel: "strict" | "moderate" | "permissive";
  projectType: "abs" | "post-bid";
  lastUpdated: string;
  createdBy: string;
  blockRate: number;
  keywordsBlocked: number;
}

export const brandSafetyProfiles: BrandSafetyProfile[] = [
  {
    id: "1",
    name: "Harbor Brew Zero — US Standard",
    description: "Default brand safety profile for US market campaigns.",
    status: "active",
    campaignsUsing: 4,
    categories: ["Violence", "Adult Content", "Death & Injury", "Hate Speech", "Drugs & Alcohol"],
    riskLevel: "strict",
    projectType: "abs",
    lastUpdated: "Jan 28, 2026",
    createdBy: "CJ",
    blockRate: 8.7,
    keywordsBlocked: 42,
  },
  {
    id: "2",
    name: "Harbor Brew — Sports & Entertainment",
    description: "Relaxed profile for sports and entertainment placements.",
    status: "active",
    campaignsUsing: 2,
    categories: ["Violence", "Adult Content", "Gambling"],
    riskLevel: "moderate",
    projectType: "post-bid",
    lastUpdated: "Jan 22, 2026",
    createdBy: "CJ",
    blockRate: 5.2,
    keywordsBlocked: 18,
  },
  {
    id: "3",
    name: "Global Markets — EMEA Compliance",
    description: "Strict compliance profile for EMEA markets with GDPR-aligned restrictions.",
    status: "active",
    campaignsUsing: 6,
    categories: ["Violence", "Adult Content", "Political Content", "Misinformation", "Hate Speech", "Profanity"],
    riskLevel: "strict",
    projectType: "abs",
    lastUpdated: "Jan 15, 2026",
    createdBy: "MK",
    blockRate: 12.1,
    keywordsBlocked: 67,
  },
  {
    id: "4",
    name: "Product Launch — High Visibility",
    description: "Maximum protection for high-visibility product launches.",
    status: "draft",
    campaignsUsing: 0,
    categories: ["Violence", "Adult Content", "Death & Injury", "Hate Speech", "Drugs & Alcohol", "Political Content", "Misinformation", "Profanity", "Gambling"],
    riskLevel: "strict",
    projectType: "post-bid",
    lastUpdated: "Feb 1, 2026",
    createdBy: "CJ",
    blockRate: 0,
    keywordsBlocked: 89,
  },
  {
    id: "5",
    name: "Awareness — Open Reach",
    description: "Permissive profile optimized for maximum reach in awareness campaigns.",
    status: "archived",
    campaignsUsing: 0,
    categories: ["Violence", "Adult Content"],
    riskLevel: "permissive",
    projectType: "post-bid",
    lastUpdated: "Dec 10, 2025",
    createdBy: "MK",
    blockRate: 2.8,
    keywordsBlocked: 8,
  },
  {
    id: "6",
    name: "Harbor Brew Zero — Q1 2026 Brand Awareness",
    description: "Brand awareness profile for Q1 2026 product launch. Created by Vera AI.",
    status: "active",
    campaignsUsing: 1,
    categories: ["Violence", "Adult Content", "Death & Injury", "Drugs & Alcohol", "Hate Speech"],
    riskLevel: "moderate",
    projectType: "abs",
    lastUpdated: "Just now",
    createdBy: "Vera AI",
    blockRate: 0,
    keywordsBlocked: 34,
  },
];

/** Utility formatters */
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

export const formatCurrency = (num: number): string => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num);
};

export const formatCompactCurrency = (num: number): string => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
  return `$${num.toFixed(0)}`;
};
