import { useState, useRef, useEffect } from "react";
import { X, Sparkles, Send, Upload, Globe, FileText, Loader2, ShieldCheck, Maximize2, Minimize2, Check, ChevronDown, ChevronRight, ExternalLink, Ban, Plus, Unlink, Eye, BarChart3, Star, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VeraContext, useVeraContext } from "@/components/layout/AppLayout";

interface Message {
  id: string;
  role: "user" | "vera";
  content: string;
  type?: "text" | "attachment" | "brand-report";
}

const quickQuestions = [
  "Why is my block rate increasing?",
  "Which campaigns need attention?",
  "How can I reduce media inefficiency?",
  "Compare my performance to benchmarks",
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "vera",
    content: "Hi! I'm Vera, your AI assistant. I can help you understand your campaign performance, brand safety metrics, and optimization opportunities. What would you like to know?",
  },
];

const brandSafetyInitialMessages: Message[] = [
  {
    id: "bs-1",
    role: "vera",
    content: "I'll help you create a new Brand Safety Profile. To get started, I need to understand your brand. You can either upload a campaign brief or I can crawl your website:",
  },
];

const analyzeInitialMessages: Message[] = [
  {
    id: "bsa-1",
    role: "vera",
    content: "Analyzing campaign data...",
  },
];

// ─── Analyze flow data ───────────────────────────────────────────────
const analyzeTopicBreakdown = [
  { topic: "Iran — Water Crisis", inventoryBlocked: "3.2%", industryBlocking: "12%", impact: "high" as const },
  { topic: "Iran — Politics", inventoryBlocked: "1.8%", industryBlocking: "34%", impact: "medium" as const },
  { topic: "Iran — War", inventoryBlocked: "1.1%", industryBlocking: "45%", impact: "medium" as const },
];

const analyzeBlockedUrls = [
  {
    topic: "Iran — Water Crisis", impactColor: "tomato" as const, inventoryBlocked: "3.2%", urlsToday: 12,
    urls: [
      { domain: "reuters.com", path: "/world/middle-east/iran-water-shortage-levels", blockedAgo: "2 hours ago", attribution: "8.4/10",
        thumbnail: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=240&h=160&fit=crop",
        title: "Iran faces worst water shortage in decades as reservoirs dry up",
        classification: { risk: "Medium Risk", category: "Death & Injury (D&I)",
          explanation: "The Death & Injury, Medium Risk category refers to pages that primarily discuss real-world serious injuries or medical harm and their consequences, without graphic depictions.",
          pageContext: "This page is a Reuters news article reporting on Iran's escalating water crisis, documenting displacement of farming communities and citing health officials warning of waterborne disease outbreaks.",
          indicators: ["\"drought has displaced over 200,000 farming families\" — describes large-scale humanitarian displacement", "\"waterborne diseases are on the rise in southern provinces\" — discusses health consequences", "\"agricultural collapse threatens food security\" — details real-world harm and systemic consequences", "\"children are the most vulnerable to dehydration\" — references harm to vulnerable populations"] } },
      { domain: "aljazeera.com", path: "/news/2024/iran-drought-agriculture", blockedAgo: "4 hours ago", attribution: "7.9/10",
        thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=240&h=160&fit=crop",
        title: "Iran's drought threatens agricultural backbone of rural economy",
        classification: { risk: "Medium Risk", category: "Death & Injury (D&I)",
          explanation: "This content discusses real-world humanitarian consequences without graphic depictions.",
          pageContext: "This page is an Al Jazeera feature on how prolonged drought has devastated Iran's agricultural sector.",
          indicators: ["\"crop failures have led to widespread poverty\" — details economic harm", "\"farmer suicides linked to drought\" — references death as consequence", "\"wells are drying up across central Iran\" — environmental crisis context"] } },
    ], lostImpressions: "45,200",
  },
  {
    topic: "Iran — Politics", impactColor: "orange" as const, inventoryBlocked: "1.8%", urlsToday: 8,
    urls: [
      { domain: "bbc.com", path: "/news/world-middle-east/iran-economic-reforms", blockedAgo: "5 hours ago", attribution: "8.7/10",
        thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=240&h=160&fit=crop",
        title: "Iran unveils new economic reform package amid international tensions",
        classification: { risk: "Low Risk", category: "Politics",
          explanation: "Political content that discusses policy and governance without extremism or violence.",
          pageContext: "This BBC article covers Iran's new economic reform legislation.",
          indicators: ["\"new trade agreements signed with regional partners\" — standard political coverage", "\"parliament debates economic reforms\" — discusses governance processes"] } },
      { domain: "economist.com", path: "/middle-east/iran-policy-analysis", blockedAgo: "8 hours ago", attribution: "9.3/10",
        thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=240&h=160&fit=crop",
        title: "Analysing Iran's shifting foreign policy landscape in 2026",
        classification: { risk: "Low Risk", category: "Politics",
          explanation: "Analytical political coverage focused on policy rather than conflict.",
          pageContext: "The Economist's in-depth analysis of Iran's diplomatic strategies.",
          indicators: ["\"diplomatic channels remain open\" — standard geopolitical reporting", "\"economic sanctions continue to shape policy\" — factual analysis"] } },
    ], lostImpressions: "28,400",
  },
  {
    topic: "Iran — War", impactColor: "orange" as const, inventoryBlocked: "1.1%", urlsToday: 5,
    urls: [
      { domain: "apnews.com", path: "/entertainment/iran-iraq-war-documentary", blockedAgo: "1 day ago", attribution: "7.6/10",
        thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=240&h=160&fit=crop",
        title: "New documentary explores legacy of Iran-Iraq war through survivor stories",
        classification: { risk: "Low Risk", category: "Conflict & War",
          explanation: "Historical content discussing past conflicts in educational/documentary context.",
          pageContext: "An AP News article about a new documentary film exploring the Iran-Iraq war.",
          indicators: ["\"documentary focuses on healing and reconciliation\" — retrospective, not active conflict", "\"survivors share stories of resilience\" — human interest angle", "\"film aims to educate younger generations\" — educational framing"] } },
      { domain: "smithsonianmag.com", path: "/history/iran-iraq-war-legacy", blockedAgo: "1 day ago", attribution: "8.9/10",
        thumbnail: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=240&h=160&fit=crop",
        title: "The lasting legacy of the Iran-Iraq war on Middle Eastern geopolitics",
        classification: { risk: "Low Risk", category: "Conflict & War",
          explanation: "Historical and academic analysis of past conflict.",
          pageContext: "A Smithsonian Magazine long-form article examining how the Iran-Iraq war shaped modern Middle Eastern politics.",
          indicators: ["\"scholars argue the war reshaped regional alliances\" — academic perspective", "\"impact on UN security framework\" — institutional analysis"] } },
    ], lostImpressions: "18,700",
  },
];

/** Brand Intelligence Report card for Harbor Brew Zero */
function BrandIntelligenceReport({ expanded, onApprove }: { expanded: boolean; onApprove?: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 bg-gradient-to-r from-plum-50 to-white border-b border-neutral-100">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4.5 w-4.5 text-plum-600" />
          <span className="text-body3 font-semibold text-cool-900">Brand Intelligence Report</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-amber-100 flex items-center justify-center text-lg font-bold text-amber-800">
            HB
          </div>
          <div>
            <span className="text-body3 font-semibold text-cool-900">Harbor Brew Zero</span>
            <p className="text-caption text-cool-500 mt-0.5">harborbrewzero.com · Founded 2019 · Portland, Oregon</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-caption font-semibold text-cool-500 uppercase tracking-wider mb-2.5">Products & Services</p>
        <div className={cn("grid gap-2", expanded ? "grid-cols-4" : "grid-cols-2")}>
          {[
            { name: "Zero-Alcohol Craft Beer", sub: "Flagship Product Line" },
            { name: "Seasonal Brews", sub: "Limited Edition Releases" },
            { name: "Variety Packs", sub: "Retail & DTC" },
            { name: "Merchandise & Events", sub: "Brand Experiences" },
          ].map((p) => (
            <div key={p.name} className="px-3 py-2 rounded-lg border border-neutral-100 bg-neutral-25">
              <p className="text-body3 font-medium text-cool-800">{p.name}</p>
              <p className="text-caption text-cool-500 mt-0.5">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-caption font-semibold text-cool-500 uppercase tracking-wider mb-2.5">Target Audiences</p>
        <div className={cn("grid gap-2", expanded ? "grid-cols-4" : "grid-cols-2")}>
          {[
            { name: "Health-Conscious Adults", sub: "Ages 25-45, active lifestyle" },
            { name: "Sober-Curious Consumers", sub: "Exploring alcohol-free options" },
            { name: "Craft Beer Enthusiasts", sub: "Quality-driven, flavor-focused" },
            { name: "Social Drinkers", sub: "Looking for NA alternatives" },
          ].map((a) => (
            <div key={a.name} className="px-3 py-2 rounded-lg border border-neutral-100 bg-neutral-25">
              <p className="text-body3 font-medium text-cool-800">{a.name}</p>
              <p className="text-caption text-cool-500 mt-0.5">{a.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 border-b border-neutral-100">
        <p className="text-caption font-semibold text-cool-500 uppercase tracking-wider mb-2.5">Brand Values</p>
        <div className="flex flex-wrap gap-2">
          {["Wellness", "Authenticity", "Inclusivity", "Craftsmanship"].map((v) => (
            <span key={v} className="px-2.5 py-1 rounded-full text-body3 font-medium bg-turquoise-25 text-turquoise-700 border border-turquoise-100">
              {v}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 py-4 bg-amber-50">
        <p className="text-caption font-semibold text-amber-800 uppercase tracking-wider mb-2.5">Content Context to Consider</p>
        <ul className="space-y-1.5">
          {[
            "Alcohol-related content (avoid association with alcoholic beverages)",
            "Content promoting binge drinking or underage drinking",
            "Competitive NA beer brands in editorial context",
            "Health misinformation about non-alcoholic beverages",
          ].map((item, i) => (
            <li key={i} className="text-body3 text-cool-700 flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      {onApprove && (
        <div className="bg-neutral-50 px-4 py-2.5 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-body3 text-cool-500">Does this look correct?</span>
          <button
            onClick={onApprove}
            className="px-3 py-1.5 bg-plum-600 text-white text-body3 font-medium rounded-lg hover:bg-plum-700 transition-colors"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
}

/** Avoidance Topics data */
interface SubTopic {
  name: string;
  blocked: boolean;
  exampleUrls?: string[];
}

interface AvoidanceTopic {
  category: string;
  industryStandard: boolean;
  blocked: boolean;
  subTopics: SubTopic[];
}

const defaultAvoidanceTopics: AvoidanceTopic[] = [
  {
    category: "Adult & Sexual Content",
    industryStandard: true,
    blocked: true,
    subTopics: [
      { name: "Swimsuits & Lingerie", blocked: true, exampleUrls: ["si.com/swimsuit", "victoriassecret.com/collections"] },
      { name: "Sexual Health & Education", blocked: true, exampleUrls: ["plannedparenthood.org/learn", "healthline.com/sexual-health"] },
      { name: "Explicit Content", blocked: true, exampleUrls: [] },
      { name: "Dating & Matchmaking", blocked: true, exampleUrls: ["match.com/advice", "eharmony.com/blog"] },
    ],
  },
  {
    category: "Alcohol",
    industryStandard: true,
    blocked: true,
    subTopics: [
      { name: "Scientific & Educational Content", blocked: true, exampleUrls: ["webmd.com/alcohol-abuse", "niaaa.nih.gov/publications"] },
      { name: "Alcohol Law & Regulations", blocked: true, exampleUrls: ["ttb.gov/alcohol", "nabca.org/resources"] },
      { name: "Alcohol Brand Promotion", blocked: true, exampleUrls: ["budweiser.com", "heineken.com/us"] },
      { name: "Cocktail Recipes & Reviews", blocked: true, exampleUrls: ["liquor.com/recipes", "punchdrink.com"] },
    ],
  },
  {
    category: "Politics",
    industryStandard: false,
    blocked: true,
    subTopics: [
      { name: "Public Healthcare Policy", blocked: true, exampleUrls: ["kff.org/health-policy", "cms.gov/newsroom"] },
      { name: "Election & Campaign Content", blocked: true, exampleUrls: ["ballotpedia.org", "fivethirtyeight.com"] },
      { name: "Political Opinion & Commentary", blocked: true, exampleUrls: [] },
      { name: "Government News & Updates", blocked: true, exampleUrls: ["whitehouse.gov/briefing-room", "congress.gov"] },
    ],
  },
  {
    category: "Financial Services",
    industryStandard: false,
    blocked: false,
    subTopics: [
      { name: "Investment Advice & Trading", blocked: false, exampleUrls: ["investopedia.com", "fool.com/investing"] },
      { name: "Cryptocurrency & NFTs", blocked: false, exampleUrls: ["coindesk.com", "decrypt.co"] },
      { name: "Banking & Personal Finance", blocked: false, exampleUrls: ["nerdwallet.com", "bankrate.com"] },
      { name: "Insurance", blocked: false, exampleUrls: ["policygenius.com", "naic.org"] },
    ],
  },
  {
    category: "Drugs & Tobacco",
    industryStandard: true,
    blocked: true,
    subTopics: [
      { name: "Prescription Medications", blocked: true, exampleUrls: ["drugs.com", "rxlist.com"] },
      { name: "Recreational Drug Content", blocked: true, exampleUrls: [] },
      { name: "Tobacco & Vaping", blocked: true, exampleUrls: [] },
      { name: "Drug Education & Prevention", blocked: true, exampleUrls: ["drugabuse.gov", "samhsa.gov"] },
    ],
  },
  {
    category: "Sensitive Social Topics",
    industryStandard: false,
    blocked: false,
    subTopics: [
      { name: "Diversity & Inclusion", blocked: false, exampleUrls: ["hrc.org", "diversity.com"] },
      { name: "Mental Health", blocked: false, exampleUrls: ["nami.org", "nimh.nih.gov"] },
      { name: "Religious Content", blocked: false, exampleUrls: ["beliefnet.com", "patheos.com"] },
      { name: "Controversial Social Issues", blocked: false, exampleUrls: [] },
    ],
  },
];

/** Checkbox component */
function Checkbox({ checked, onChange, className }: { checked: boolean; onChange: () => void; className?: string }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
        checked
          ? "bg-plum-600 border-plum-600"
          : "bg-white border-neutral-300 hover:border-plum-400",
        className
      )}
    >
      {checked && <Check className="h-2.5 w-2.5 text-white" />}
    </button>
  );
}

/* ========== SECTION CARD WRAPPER (Approve/Edit footer pattern) ========== */

type ApprovalState = "pending" | "approved";

function SectionCard({
  icon,
  title,
  badge,
  onApprove,
  footerLeftText,
  confirmLabel = "Approve",
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onApprove: () => void;
  footerLeftText?: string;
  confirmLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-body3 font-semibold text-cool-900">{title}</span>
          </div>
          {badge && (
            <span className="text-[12px] leading-[16px] font-medium text-plum-600 bg-plum-50 px-2 py-0.5 rounded inline-flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div>{children}</div>

      {/* Footer — approve only (edit is implicit while panel is open) */}
      <div className="bg-neutral-50 px-4 py-2.5 border-t border-neutral-100 flex items-center justify-between">
        <span className="text-body3 text-cool-500">{footerLeftText || "Does this look correct?"}</span>
        <button
          onClick={onApprove}
          className="px-3 py-1.5 bg-plum-600 text-white text-body3 font-medium rounded-lg hover:bg-plum-700 transition-colors"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

/* ========== COLLAPSED SECTION SUMMARY (approved state) ========== */

function CollapsedSectionSummary({
  icon,
  title,
  subtitle,
  onEdit,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onEdit?: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-body3 font-semibold text-cool-900">{title}</span>
        </div>
        <p className="text-body3 text-cool-600 mb-2">{subtitle}</p>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-grass-600" />
          <span className="text-body3 text-grass-700 font-medium">Approved</span>
          {onEdit && (
            <button onClick={onEdit} className="text-body3 text-plum-600 hover:text-plum-700 font-medium ml-auto">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========== AVOIDANCE TOPICS CONTENT (body only, no header/footer) ========== */

function AvoidanceTopicsContent({
  topics,
  onToggleTopic,
  onToggleSubTopic,
}: {
  topics: AvoidanceTopic[];
  onToggleTopic: (idx: number) => void;
  onToggleSubTopic: (topicIdx: number, subIdx: number) => void;
}) {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0, 1]));
  const [showUrlsFor, setShowUrlsFor] = useState<string | null>(null);

  const toggleExpanded = (idx: number) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const blockedCount = topics.filter((t) => t.blocked).length;
  const totalSubBlocked = topics.reduce((acc, t) => acc + t.subTopics.filter((s) => s.blocked).length, 0);

  return (
    <div>
      <div className="px-4 py-2.5 border-b border-neutral-100">
        <p className="text-body3 text-cool-500">
          {blockedCount} categories · {totalSubBlocked} sub-topics blocked. Check categories to block. Expand to configure sub-topics.
        </p>
      </div>
      <div className="divide-y divide-neutral-100">
        {topics.map((topic, tIdx) => {
          const isExpanded = expandedTopics.has(tIdx);
          const subBlocked = topic.subTopics.filter((s) => s.blocked).length;
          return (
            <div key={topic.category}>
              <div
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-neutral-25 transition-colors"
                onClick={() => toggleExpanded(tIdx)}
              >
                <Checkbox
                  checked={topic.blocked}
                  onChange={() => onToggleTopic(tIdx)}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-body3 font-medium text-cool-900 block">{topic.category}</span>
                  <p className="text-body3 text-cool-500 mt-0.5">{subBlocked}/{topic.subTopics.length} sub-topics blocked</p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-cool-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-cool-400 flex-shrink-0" />
                )}
              </div>
              {isExpanded && (
                <div className="pl-11 pr-4 pb-2 space-y-0.5">
                  {topic.subTopics.map((sub, sIdx) => (
                    <div key={sub.name}>
                      <div className="flex items-center gap-2.5 py-1.5 group">
                        <Checkbox
                          checked={sub.blocked}
                          onChange={() => onToggleSubTopic(tIdx, sIdx)}
                        />
                        <span className={cn("text-body3 flex-1", sub.blocked ? "text-cool-800" : "text-cool-500")}>{sub.name}</span>
                        {sub.exampleUrls && sub.exampleUrls.length > 0 && (
                          <button
                            onClick={() => setShowUrlsFor(showUrlsFor === `${tIdx}-${sIdx}` ? null : `${tIdx}-${sIdx}`)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-cool-400 hover:text-plum-600"
                            title="View example URLs"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                      {showUrlsFor === `${tIdx}-${sIdx}` && sub.exampleUrls && sub.exampleUrls.length > 0 && (
                        <div className="ml-6 mb-1.5 px-2.5 py-2 rounded-lg bg-neutral-50 border border-neutral-100">
                          <p className="text-caption font-medium text-cool-500 uppercase tracking-wider mb-1">Example URLs</p>
                          {sub.exampleUrls.map((url) => (
                            <div key={url} className="flex items-center gap-1.5 py-0.5">
                              <ExternalLink className="h-3 w-3 text-cool-400 flex-shrink-0" />
                              <span className="text-body3 text-plum-600 truncate">{url}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ========== KEYWORDS CONTENT (body only) ========== */

interface KeywordGroup {
  category: string;
  keywords: string[];
}

const defaultKeywordGroups: KeywordGroup[] = [
  {
    category: "Alcohol & Drinking",
    keywords: ["beer", "lager", "ale", "stout", "IPA", "brewery", "brew pub", "craft beer", "happy hour", "bar crawl", "drunk", "binge drinking", "hangover", "alcoholic", "booze"],
  },
  {
    category: "Competitor Brands",
    keywords: ["Athletic Brewing", "Heineken 0.0", "Clausthaler", "Brooklyn Special Effects", "Partake Brewing", "Bravus", "WellBeing Brewing", "Gruvi"],
  },
  {
    category: "Health Misinformation",
    keywords: ["fake health claims", "miracle cure", "detox scam", "snake oil", "unproven remedy"],
  },
  {
    category: "Negative Sentiment",
    keywords: ["non-alcoholic is pointless", "fake beer", "NA beer tastes bad", "why bother", "buzz-free waste"],
  },
];

function KeywordsContent({
  keywordGroups,
  onRemoveKeyword,
  onAddKeyword,
}: {
  keywordGroups: KeywordGroup[];
  onRemoveKeyword: (groupIdx: number, kwIdx: number) => void;
  onAddKeyword: (groupIdx: number, keyword: string) => void;
}) {
  const [addingTo, setAddingTo] = useState<number | null>(null);
  const [newKeyword, setNewKeyword] = useState("");

  const totalKeywords = keywordGroups.reduce((acc, g) => acc + g.keywords.length, 0);

  const handleAdd = (groupIdx: number) => {
    if (newKeyword.trim()) {
      onAddKeyword(groupIdx, newKeyword.trim());
      setNewKeyword("");
      setAddingTo(null);
    }
  };

  return (
    <div>
      <div className="px-4 py-2.5 border-b border-neutral-100">
        <p className="text-body3 text-cool-500">{totalKeywords} keywords will block ad placement on matching content. Click x to remove.</p>
      </div>
      <div className="px-4 py-3 space-y-4">
        {keywordGroups.map((group, gIdx) => (
          <div key={group.category}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-body3 font-semibold text-cool-600 uppercase tracking-wider">{group.category}</span>
              <button
                onClick={() => setAddingTo(addingTo === gIdx ? null : gIdx)}
                className="text-body3 text-plum-600 hover:text-plum-700 font-medium flex items-center gap-0.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.keywords.map((kw, kIdx) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-body3 bg-neutral-50 text-cool-700 border border-neutral-200 group/kw hover:border-tomato-200 hover:bg-tomato-25 transition-colors"
                >
                  {kw}
                  <button
                    onClick={() => onRemoveKeyword(gIdx, kIdx)}
                    className="text-cool-400 hover:text-tomato-500 opacity-0 group-hover/kw:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {addingTo === gIdx && (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdd(gIdx)}
                  placeholder="Type keyword..."
                  className="flex-1 h-8 px-3 text-body3 bg-neutral-50 border border-neutral-200 rounded-md outline-none focus:border-plum-300 focus:ring-1 focus:ring-plum-100"
                  autoFocus
                />
                <button onClick={() => handleAdd(gIdx)} className="text-body3 text-plum-600 font-medium hover:text-plum-700">Add</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== SITE EXCLUSION CONTENT (body only) ========== */

const defaultSiteExclusions: string[] = [
  "reddit.com/r/alcohol",
  "reddit.com/r/beer",
  "4chan.org",
  "breitbart.com",
  "liquor.com",
  "vinepair.com",
];

function SiteExclusionContent({
  sites,
  onRemoveSite,
  onAddSite,
}: {
  sites: string[];
  onRemoveSite: (idx: number) => void;
  onAddSite: (domain: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  const handleAdd = () => {
    if (newDomain.trim()) {
      onAddSite(newDomain.trim());
      setNewDomain("");
      setAdding(false);
    }
  };

  return (
    <div>
      <div className="px-4 py-2.5 border-b border-neutral-100">
        <p className="text-body3 text-cool-500">{sites.length} excluded domains. These sites will never serve your ads.</p>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-body3 font-semibold text-tomato-600 uppercase tracking-wider flex items-center gap-1">
            <Unlink className="h-3.5 w-3.5" />
            Excluded Sites
          </span>
          <button
            onClick={() => setAdding(!adding)}
            className="text-body3 text-plum-600 hover:text-plum-700 font-medium flex items-center gap-0.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
        <div className="space-y-1">
          {sites.map((domain, idx) => (
            <div key={domain} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-tomato-25 border border-tomato-100 group">
              <Unlink className="h-3.5 w-3.5 text-tomato-400 flex-shrink-0" />
              <span className="text-body3 text-cool-800 flex-1 truncate">{domain}</span>
              <button
                onClick={() => onRemoveSite(idx)}
                className="text-cool-400 hover:text-tomato-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        {adding && (
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              placeholder="e.g. example.com"
              className="flex-1 h-8 px-3 text-body3 bg-neutral-50 border border-neutral-200 rounded-md outline-none focus:border-plum-300 focus:ring-1 focus:ring-plum-100"
              autoFocus
            />
            <button onClick={handleAdd} className="text-body3 text-plum-600 font-medium hover:text-plum-700">Add</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========== MEASUREMENT MODE CONTENT ========== */

function MeasurementModeContent({
  mode,
  onModeChange,
}: {
  mode: "measurement-only" | "measurement-abs";
  onModeChange: (mode: "measurement-only" | "measurement-abs") => void;
}) {
  return (
    <div className="p-4 space-y-3">
      {/* Measurement Only */}
      <label className="block cursor-pointer">
        <div className={cn(
          "flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all",
          mode === "measurement-only"
            ? "border-plum-300 bg-plum-25"
            : "border-neutral-200 hover:border-neutral-300"
        )}>
          <input
            type="radio"
            name="measurementMode"
            checked={mode === "measurement-only"}
            onChange={() => onModeChange("measurement-only")}
            className="mt-0.5 w-4 h-4 text-plum-600 border-neutral-300 focus:ring-plum-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-body3 font-medium text-cool-900">Measurement Only</span>
              <span className="text-label text-plum-700 bg-plum-50 px-2 py-0.5 rounded border border-plum-200">Recommended</span>
            </div>
            <p className="text-body3 text-cool-500">Monitor and report on brand safety without blocking. Recommended for new campaigns.</p>
          </div>
        </div>
      </label>

      {/* Measurement + ABS */}
      <label className="block cursor-pointer">
        <div className={cn(
          "flex items-start gap-3 p-3.5 rounded-xl border-2 transition-all",
          mode === "measurement-abs"
            ? "border-plum-300 bg-plum-25"
            : "border-neutral-200 hover:border-neutral-300"
        )}>
          <input
            type="radio"
            name="measurementMode"
            checked={mode === "measurement-abs"}
            onChange={() => onModeChange("measurement-abs")}
            className="mt-0.5 w-4 h-4 text-plum-600 border-neutral-300 focus:ring-plum-500"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-body3 font-medium text-cool-900">Measurement + ABS (Active Blocking)</span>
              <span className="text-label text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">Requires Upgrade</span>
            </div>
            <p className="text-body3 text-cool-500 mb-2.5">Full protection with real-time blocking based on your profile settings.</p>
            <div className="space-y-1.5 pl-0.5">
              {[
                "Leverage 100+ brand safety and suitability categories",
                "Create custom brand categories tailored to your specific needs",
                "Apply specialized mobile and CTV app controls, inclusion/exclusion lists, and keyword avoidance",
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-plum-600 flex-shrink-0 mt-0.5" />
                  <span className="text-body3 text-cool-600">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}

/* ========== CREATE PROFILE CARD (simplified) ========== */

function CreateProfileCard({
  profileName,
  onProfileNameChange,
  onCreateProfile,
}: {
  profileName: string;
  onProfileNameChange: (name: string) => void;
  onCreateProfile: () => void;
}) {
  const canCreate = profileName.trim().length > 0;

  return (
    <div className="rounded-xl border overflow-hidden bg-white border-plum-200 shadow-sm">
      <div className="p-4">
        <label className="block text-caption text-cool-400 uppercase tracking-wider mb-1.5">Profile Name</label>
        <input
          type="text"
          value={profileName}
          onChange={(e) => onProfileNameChange(e.target.value)}
          placeholder="Enter a name for this profile..."
          className="w-full px-3 py-2 text-body3 border border-neutral-200 rounded-lg outline-none focus:border-plum-300 focus:ring-1 focus:ring-plum-100"
        />
      </div>

      <div className="px-4 py-3 border-t bg-white border-neutral-100 flex items-center justify-end">
        <button
          onClick={onCreateProfile}
          disabled={!canCreate}
          className={cn(
            "px-4 py-2 text-body3 font-medium rounded-lg transition-colors",
            canCreate
              ? "bg-plum-600 text-white hover:bg-plum-700 cursor-pointer"
              : "bg-neutral-300 text-cool-500 cursor-not-allowed"
          )}
        >
          Create Profile
        </button>
      </div>
    </div>
  );
}

/* ========== MAIN VERA PANEL ========== */

type WizardPhase = "choose" | "uploading" | "analyzing" | "report" | "review" | "creating" | "complete";

// Section order for sequential flow
const sectionOrder = ["avoidance", "keywords", "sites", "measurement"] as const;
type SectionKey = typeof sectionOrder[number];

interface SectionApprovals {
  avoidance: ApprovalState;
  keywords: ApprovalState;
  sites: ApprovalState;
  measurement: ApprovalState;
}

// ─── Analyze flow panel components ───────────────────────────────────
type AnalyzePhase = "thinking" | "insights" | "ask-examples" | "examples" | "complete";

function AnalyzeUrlCard({ url }: { url: typeof analyzeBlockedUrls[0]["urls"][0] }) {
  const [open, setOpen] = useState(false);
  const riskStyle = url.classification.risk === "Medium Risk"
    ? { chipBg: "bg-orange-50", chipText: "text-orange-700", dot: "bg-orange-500", badgeBg: "bg-orange-50", badgeText: "text-orange-700" }
    : { chipBg: "bg-grass-50", chipText: "text-grass-700", dot: "bg-grass-500", badgeBg: "bg-grass-50", badgeText: "text-grass-700" };
  return (
    <div className="rounded-lg border border-neutral-100 overflow-hidden hover:shadow-elevation-hover transition-shadow duration-200">
      {/* Full-width thumbnail */}
      <div className="h-28 bg-neutral-100 relative overflow-hidden">
        <img src={url.thumbnail} alt="" className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", riskStyle.chipBg, riskStyle.chipText)}>
            <span className={cn("w-1.5 h-1.5 rounded-full", riskStyle.dot)} />
            {url.classification.risk === "Medium Risk" ? "Medium" : "Low"}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-3">
        <p className="text-body3 font-medium text-cool-900 line-clamp-2 mb-0.5">{url.title}</p>
        <p className="text-caption text-cool-500 truncate mb-2">{url.domain}{url.path}</p>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-900 text-amber-50 text-[12px] leading-[16px] font-semibold">
            <Star className="w-3 h-3 fill-current" />
            Rockerbox
          </span>
          <span className="text-body3 text-cool-700">
            Attribution: <span className="font-semibold">{url.attribution}</span>
          </span>
        </div>
        {/* Expand/collapse classification */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-body3 font-medium text-plum-600 hover:text-plum-700 transition-colors"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          {open ? "Hide classification" : "View classification"}
        </button>
      </div>
      {open && (
        <div className="border-t border-neutral-100 px-3 py-3 space-y-2.5 bg-white">
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium",
              riskStyle.chipBg, riskStyle.chipText
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", riskStyle.dot)} />
              {url.classification.risk}
            </span>
            <span className="text-body3 font-medium text-cool-900">{url.classification.category}</span>
          </div>
          <p className="text-body3 text-cool-700">{url.classification.explanation}</p>
          <p className="text-body3 text-cool-700">{url.classification.pageContext}</p>
          <div>
            <p className="text-body3 font-semibold text-plum-700 mb-1.5">Key content indicators:</p>
            <ul className="space-y-1">
              {url.classification.indicators.map((ind, i) => (
                <li key={i} className="flex items-start gap-1.5 text-body3 text-cool-700">
                  <span className="text-plum-400 mt-0.5">•</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Scibids campaign data
const scibidsCampaigns = [
  {
    name: "Q1 2026 Harbor Brew Zero",
    description: "Brand awareness for new product launch",
    cost: "$14,040",
    imp: "5.2M impressions",
    primary: "Low CPM (Target: <$2.70)",
    secondary: "Maximum Reach",
    detail: {
      avgCpm: "$2.65",
      cpmTarget: "<$2.70",
      cpmMet: true,
      scibidsStatus: "Active, optimizing 3x daily across 1,200+ placements",
      viewability: "78%",
      viewabilityBenchmark: "72%",
      avoidedDomains: 3,
      avoidedCpmRange: "$1.80-$2.20",
      potentialCpm: "$2.40",
      reachGain: "19%",
    },
  },
];

function ScibidsCampaignDetail({ campaign }: { campaign: typeof scibidsCampaigns[0] }) {
  const d = campaign.detail;
  return (
    <div className="space-y-3">
      {/* Current State */}
      <div className="rounded-lg border border-turquoise-100 bg-turquoise-25 p-3.5">
        <p className="text-[11px] font-semibold text-turquoise-700 uppercase tracking-wider mb-2.5">Current State</p>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-body3 text-cool-700">
            <Check className="h-3.5 w-3.5 text-turquoise-500 flex-shrink-0 mt-0.5" />
            <span>Average CPM: <strong className="text-cool-900">{d.avgCpm}</strong> (meeting your {d.cpmTarget} target)</span>
          </div>
          <div className="flex items-start gap-2 text-body3 text-cool-700">
            <Check className="h-3.5 w-3.5 text-turquoise-500 flex-shrink-0 mt-0.5" />
            <span>Scibids AI: {d.scibidsStatus}</span>
          </div>
          <div className="flex items-start gap-2 text-body3 text-cool-700">
            <Check className="h-3.5 w-3.5 text-turquoise-500 flex-shrink-0 mt-0.5" />
            <span>Viewability: {d.viewability} (above category benchmark of {d.viewabilityBenchmark})</span>
          </div>
        </div>
      </div>
      {/* Optimization Opportunity */}
      <div className="rounded-lg border-l-4 border-l-turquoise-500 border border-neutral-200 bg-white p-3.5">
        <p className="text-[11px] font-semibold text-turquoise-700 uppercase tracking-wider mb-2">Optimization Opportunity</p>
        <p className="text-body3 text-cool-700 mb-2">
          I found <strong>{d.avoidedDomains} avoided domains</strong> with CPM of <strong className="text-turquoise-700">{d.avoidedCpmRange}</strong> (below your average). They're brand-safe according to DV.
        </p>
        <div className="rounded-lg bg-turquoise-25 border border-turquoise-100 px-3 py-2 mb-2">
          <p className="text-body3 text-cool-800">
            <strong className="text-turquoise-700">Allowing them</strong> = Lower average CPM ({d.potentialCpm}) + {d.reachGain} more reach
          </p>
        </div>
        <p className="text-body3 text-turquoise-500 italic">You're doing well — here's how to do even better.</p>
      </div>
    </div>
  );
}

const domainRecommendations = [
  { domain: "healthline.com", category: "Health & Wellness", cpm: "$1.80", viewability: "82%", weeklyImps: "420K" },
  { domain: "mindbodygreen.com", category: "Wellness & Lifestyle", cpm: "$2.10", viewability: "76%", weeklyImps: "380K" },
  { domain: "eatingwell.com", category: "Food & Nutrition", cpm: "$2.05", viewability: "75%", weeklyImps: "330K" },
];

function DomainRecommendations({ campaign }: { campaign: typeof scibidsCampaigns[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) next.delete(domain);
      else next.add(domain);
      return next;
    });
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-100">
        <div className="flex items-center gap-2 mb-1.5">
          <Globe className="h-4 w-4 text-turquoise-500" />
          <span className="text-body3 font-semibold text-cool-900">Domain Recommendations</span>
        </div>
        <p className="text-body3 text-cool-600">
          These {campaign.detail.avoidedDomains} domains are currently in your exclusion list, but according to DV analysis they meet your campaign values and offer better CPM than your current average.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-2 px-4 py-3 border-b border-neutral-100">
        <div className="rounded-lg bg-grass-50 border border-grass-100 px-3 py-2 text-center">
          <p className="text-h6 font-bold text-grass-700">$1.98</p>
          <p className="text-caption text-grass-600">Avg CPM</p>
        </div>
        <div className="rounded-lg bg-grass-50 border border-grass-100 px-3 py-2 text-center">
          <p className="text-h6 font-bold text-grass-700">78%</p>
          <p className="text-caption text-grass-600">Avg Viewability</p>
        </div>
        <div className="rounded-lg bg-plum-50 border border-plum-200 px-3 py-2 text-center">
          <p className="text-h6 font-bold text-plum-700">1.13M</p>
          <p className="text-caption text-plum-600">Weekly Imps</p>
        </div>
      </div>

      {/* Allow all button */}
      <div className="px-4 py-3 border-b border-neutral-100">
        <button className="w-full py-2.5 bg-grass-600 text-white text-body3 font-medium rounded-lg hover:bg-grass-700 transition-colors flex items-center justify-center gap-2">
          <Check className="h-4 w-4" />
          Allow All {campaign.detail.avoidedDomains} Domains
        </button>
      </div>

      {/* Or select specific domains */}
      <div className="px-4 py-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-body3 text-cool-600 hover:text-cool-800 transition-colors"
        >
          <span>Or select specific domains</span>
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {domainRecommendations.map((d) => (
              <label
                key={d.domain}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                  selectedDomains.has(d.domain)
                    ? "border-turquoise-300 bg-turquoise-25"
                    : "border-neutral-100 hover:bg-neutral-25"
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedDomains.has(d.domain)}
                  onChange={() => toggleDomain(d.domain)}
                  className="h-4 w-4 rounded border-neutral-300 text-turquoise-500 focus:ring-turquoise-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-body3 font-medium text-cool-900">{d.domain}</p>
                  <p className="text-caption text-cool-500">{d.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-body3 font-semibold text-cool-900">{d.cpm} CPM</p>
                  <p className="text-caption text-cool-500">{d.viewability} · {d.weeklyImps}</p>
                </div>
              </label>
            ))}
            {selectedDomains.size > 0 && (
              <button className="w-full py-2 bg-turquoise-700 text-white text-body3 font-medium rounded-lg hover:bg-turquoise-500 transition-colors mt-2">
                Allow {selectedDomains.size} Selected Domain{selectedDomains.size !== 1 ? "s" : ""}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AnalyzeFlowContent({ phase, onShowExamples, onDismissExamples, cardWidth }: {
  phase: AnalyzePhase;
  onShowExamples: () => void;
  onDismissExamples: () => void;
  cardWidth: string;
}) {
  const [selectedScibids, setSelectedScibids] = useState<typeof scibidsCampaigns[0] | null>(null);
  const [scibidsThinking, setScibidsThinking] = useState(false);
  const [showDomains, setShowDomains] = useState(false);
  const [unblockedTopics, setUnblockedTopics] = useState<Set<string>>(new Set());
  const scibidsDetailRef = useRef<HTMLDivElement>(null);

  const impactChipStyles = {
    high: { bg: "bg-tomato-50", text: "text-tomato-700", dot: "bg-tomato-500" },
    medium: { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  };
  const colorMap = {
    tomato: { headerBg: "bg-tomato-25", headerBorder: "border-tomato-200", titleColor: "text-tomato-800" },
    orange: { headerBg: "bg-orange-25", headerBorder: "border-orange-200", titleColor: "text-orange-800" },
  };

  if (phase === "thinking") return null;

  return (
    <div className={cn("self-start space-y-4", cardWidth)}>
      {/* Intro */}
      <div className="px-4 py-3 rounded-xl text-body3 bg-neutral-50 text-cool-800 border border-neutral-100 rounded-bl-sm">
        I've analyzed the brand safety performance for <strong>Q1 2026 Harbor Brew Zero Brand Awareness - US Market</strong>. Here's what I found:
      </div>

      {/* Key Insight */}
      <div className="rounded-xl border border-tomato-200 bg-tomato-25 p-4">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-3.5 w-3.5 text-tomato-600" />
          </div>
          <div>
            <p className="text-body3 font-semibold text-tomato-800 mb-0.5">Key Insight: Topic Concentration</p>
            <p className="text-body3 text-cool-700"><strong>70% of your campaign blocks</strong> are due to three specific topics related to <strong>Iran</strong>: Water Crisis, Politics, and War.</p>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <p className="text-body3 font-semibold text-cool-900 mb-3">Topic Breakdown</p>
        <div className="space-y-2">
          {analyzeTopicBreakdown.map((t) => {
            const chip = impactChipStyles[t.impact];
            return (
              <div key={t.topic} className="bg-neutral-25 rounded-lg p-3 border border-neutral-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-body3 font-medium text-cool-900">{t.topic}</span>
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", chip.bg, chip.text)}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", chip.dot)} />
                    {t.impact === "high" ? "High" : "Medium"} Impact
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-body3">
                  <div><span className="text-cool-500">Inventory blocked:</span> <span className="font-semibold text-cool-900">{t.inventoryBlocked}</span></div>
                  <div><span className="text-cool-500">Industry blocking:</span> <span className="font-semibold text-cool-900">{t.industryBlocking}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ask about examples */}
      {phase === "insights" && (
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-body3 text-cool-700 mb-3">Would you like to see examples of the blocked content with call-to-action URLs?</p>
          <div className="flex items-center gap-2">
            <button onClick={onShowExamples} className="px-3 py-1.5 bg-plum-600 text-white text-body3 font-medium rounded-lg hover:bg-plum-700 transition-colors">Yes, show examples</button>
            <button onClick={onDismissExamples} className="px-3 py-1.5 bg-white border border-neutral-200 text-cool-700 text-body3 font-medium rounded-lg hover:bg-neutral-50 transition-colors">No thanks</button>
          </div>
        </div>
      )}

      {/* Blocked examples */}
      {(phase === "examples" || phase === "complete") && (
        <div className="space-y-4">
          <div className="px-4 py-3 rounded-xl text-body3 bg-neutral-50 text-cool-800 border border-neutral-100 rounded-bl-sm">
            Here are examples of recently blocked content for each topic:
          </div>
          {analyzeBlockedUrls.map((group) => {
            const c = colorMap[group.impactColor];
            return (
              <div key={group.topic} className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
                <div className={cn("px-3 py-2.5 border-b flex items-center justify-between", c.headerBg, c.headerBorder)}>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-body3 font-semibold", c.titleColor)}>{group.topic}</span>
                    <span className="text-body3 text-cool-500">{group.inventoryBlocked}</span>
                  </div>
                  <span className="text-body3 text-cool-400">{group.urlsToday} URLs today</span>
                </div>
                <div className="p-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    {group.urls.map((url) => (
                      <AnalyzeUrlCard key={url.domain + url.path} url={url} />
                    ))}
                  </div>
                  {/* Blurred upsell — two URL previews */}
                  <div className="relative rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 gap-2 blur-sm select-none pointer-events-none">
                      <div className="rounded-lg border border-neutral-100 overflow-hidden">
                        <div className="h-28 bg-neutral-200" />
                        <div className="p-3">
                          <div className="text-body3 font-medium text-cool-900 mb-0.5">nytimes.com/2024/world/middle-east/...</div>
                          <div className="text-caption text-cool-500 mb-2">nytimes.com/2024/world/middle-east</div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-200 text-cool-500 text-[12px] leading-[16px] font-semibold">Rockerbox</span>
                            <span className="text-body3 text-cool-500">Attribution: 9.1/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-neutral-100 overflow-hidden">
                        <div className="h-28 bg-neutral-200" />
                        <div className="p-3">
                          <div className="text-body3 font-medium text-cool-900 mb-0.5">washingtonpost.com/world/2024/...</div>
                          <div className="text-caption text-cool-500 mb-2">washingtonpost.com/world/2024</div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-200 text-cool-500 text-[12px] leading-[16px] font-semibold">Rockerbox</span>
                            <span className="text-body3 text-cool-500">Attribution: 8.7/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-amber-900 text-amber-50 text-body3 font-semibold rounded-lg hover:bg-amber-800 transition-colors shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-current" /> Upgrade to Rockerbox
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-body3">
                    <span className="text-cool-500">Blocked from serving</span>
                    <span className="text-tomato-700 font-medium">Est. lost: {group.lostImpressions}</span>
                  </div>
                </div>
                {/* Footer — Unblock topic prompt */}
                <div className="border-t border-neutral-200 px-3 py-3 bg-neutral-25">
                  {unblockedTopics.has(group.topic) ? (
                    <div className="flex items-center justify-end gap-2 text-body3 text-grass-700">
                      <Check className="h-4 w-4" />
                      <span className="font-medium">Topic unblocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <p className="text-body3 text-cool-700 flex-1 min-w-0">Would you like to unblock this topic?</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setUnblockedTopics((prev) => new Set(prev).add(group.topic))}
                          className="px-3 py-1.5 rounded-lg bg-grass-500 text-white text-[12px] leading-[16px] font-medium hover:bg-grass-600 transition-colors whitespace-nowrap"
                        >
                          Yes, Unblock
                        </button>
                        <button
                          className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-cool-700 text-[12px] leading-[16px] font-medium hover:bg-neutral-50 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scibids upsell card */}
      {(phase === "examples" || phase === "complete") && (
        <div className="rounded-xl border border-turquoise-100 bg-gradient-to-br from-turquoise-25 to-turquoise-100 p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Zap className="h-4 w-4 text-turquoise-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-body3 font-semibold text-cool-900">Activate Scibids AI Optimization</p>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium text-turquoise-700 bg-turquoise-25 border border-turquoise-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-turquoise-500" />
                  Premium
                </span>
              </div>
              <p className="text-body3 text-cool-600 mb-3">Get personalized recommendations powered by Scibids AI.</p>
              <div className="bg-white rounded-lg border border-neutral-100 divide-y divide-neutral-100">
                {scibidsCampaigns.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      if (selectedScibids?.name === c.name) {
                        setSelectedScibids(null);
                        setScibidsThinking(false);
                        setShowDomains(false);
                      } else {
                        setSelectedScibids(c);
                        setScibidsThinking(true);
                        setShowDomains(false);
                        setTimeout(() => {
                          setScibidsThinking(false);
                          setTimeout(() => {
                            scibidsDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 100);
                        }, 2000);
                      }
                    }}
                    className={cn(
                      "w-full text-left px-3.5 py-3 hover:bg-turquoise-25 transition-colors group",
                      selectedScibids?.name === c.name && "bg-turquoise-25"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-body3 font-medium text-cool-900">{c.name}</span>
                        </div>
                        <p className="text-body3 text-cool-500">{c.description}</p>
                        <p className="text-caption text-cool-400 mt-0.5">Primary: {c.primary} · Secondary: {c.secondary}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <div className="text-body3 font-semibold text-cool-900">{c.cost}</div>
                        <div className="text-caption text-cool-500">{c.imp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-turquoise-700 text-body3 font-medium">
                      Analyze with Scibids AI
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scibids thinking spinner */}
      {selectedScibids && scibidsThinking && (
        <div className="flex items-center gap-2 self-start px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 rounded-bl-sm">
          <Loader2 className="h-4 w-4 text-turquoise-500 animate-spin" />
          <span className="text-body3 text-cool-600">Analyzing {selectedScibids.name}...</span>
        </div>
      )}

      {/* Scibids detail — rendered as a separate agent response card */}
      {selectedScibids && !scibidsThinking && (
        <div ref={scibidsDetailRef} className="px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 rounded-bl-sm space-y-3">
          <p className="text-body3 text-cool-800">
            Here's the Scibids AI analysis for <strong>{selectedScibids.name}</strong>:
          </p>
          <ScibidsCampaignDetail campaign={selectedScibids} />
          {/* Show domains CTA */}
          {!showDomains && (
            <button
              onClick={() => {
                setShowDomains(true);
                setTimeout(() => {
                  scibidsDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                }, 100);
              }}
              className="w-full py-2.5 bg-turquoise-700 text-white text-body3 font-medium rounded-lg hover:bg-turquoise-500 transition-colors flex items-center justify-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Show domains
            </button>
          )}
          {/* Domain Recommendations */}
          {showDomains && (
            <DomainRecommendations campaign={selectedScibids} />
          )}
        </div>
      )}
    </div>
  );
}

interface VeraPanelProps {
  open: boolean;
  onClose: () => void;
  context?: VeraContext;
}

export function VeraPanel({ open, onClose, context = "general" }: VeraPanelProps) {
  const { setProfileCreated } = useVeraContext();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [wizardPhase, setWizardPhase] = useState<WizardPhase>("choose");
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Wizard data state
  const [avoidanceTopics, setAvoidanceTopics] = useState<AvoidanceTopic[]>(defaultAvoidanceTopics);
  const [keywordGroups, setKeywordGroups] = useState<KeywordGroup[]>(defaultKeywordGroups);
  const [siteExclusions, setSiteExclusions] = useState<string[]>(defaultSiteExclusions);

  // Section approvals + sequential index
  const [sectionApprovals, setSectionApprovals] = useState<SectionApprovals>({
    avoidance: "pending",
    keywords: "pending",
    sites: "pending",
    measurement: "pending",
  });
  const [activeSection, setActiveSection] = useState(0);
  const [showActiveSection, setShowActiveSection] = useState(true);
  const [showCreateProfile, setShowCreateProfile] = useState(false);

  const [measurementMode, setMeasurementMode] = useState<"measurement-only" | "measurement-abs">("measurement-only");
  const [profileName, setProfileName] = useState("Harbor Brew Zero — Q1 2026 Brand Awareness");

  const allApproved = Object.values(sectionApprovals).every((s) => s === "approved");

  // Analyze flow state
  const [analyzePhase, setAnalyzePhase] = useState<AnalyzePhase>("thinking");

  // Reset when context changes
  useEffect(() => {
    if (context === "brand-safety-create") {
      setMessages(brandSafetyInitialMessages);
      setWizardPhase("choose");
      setAvoidanceTopics(defaultAvoidanceTopics);
      setKeywordGroups(defaultKeywordGroups);
      setSiteExclusions(defaultSiteExclusions);
      setSectionApprovals({ avoidance: "pending", keywords: "pending", sites: "pending", measurement: "pending" });
      setActiveSection(0);
      setShowActiveSection(true);
      setShowCreateProfile(false);
      setMeasurementMode("measurement-only");
      setProfileName("Harbor Brew Zero — Q1 2026 Brand Awareness");
    } else if (context === "brand-safety-analyze") {
      setMessages(analyzeInitialMessages);
      setAnalyzePhase("thinking");
      // Simulate analysis delay then show insights
      setTimeout(() => setAnalyzePhase("insights"), 2500);
    } else {
      setMessages(initialMessages);
    }
  }, [context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, wizardPhase, activeSection, showActiveSection, showCreateProfile]);

  // --- Handlers ---

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const veraMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "vera",
        content: "I'm analyzing your data now. Based on the current trends, I can see several areas where we can optimize. Let me pull together the relevant insights for you.",
      };
      setMessages((prev) => [...prev, veraMsg]);
    }, 800);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleUploadPdf = () => {
    setWizardPhase("uploading");
    const attachMsg: Message = {
      id: "bs-upload",
      role: "user",
      content: "Harbor_Brew_Zero_Campaign_Brief_Q1_2026.pdf",
      type: "attachment",
    };
    setMessages((prev) => [...prev, attachMsg]);

    setTimeout(() => {
      setWizardPhase("analyzing");

      setTimeout(() => {
        setWizardPhase("report");
        const introMsg: Message = {
          id: "bs-report-intro",
          role: "vera",
          content: "I've analyzed your campaign brief and generated a Brand Intelligence Report for Harbor Brew Zero. Approve it to start building your profile.",
        };
        const reportMsg: Message = {
          id: "bs-report",
          role: "vera",
          content: "",
          type: "brand-report",
        };
        setMessages((prev) => [...prev, introMsg, reportMsg]);
      }, 2000);
    }, 1200);
  };

  const handleCrawlUrl = () => {
    setWizardPhase("analyzing");
    const urlMsg: Message = {
      id: "bs-url",
      role: "user",
      content: "Crawl harborbrewzero.com",
    };
    setMessages((prev) => [...prev, urlMsg]);

    setTimeout(() => {
      setWizardPhase("report");
      const introMsg: Message = {
        id: "bs-report-intro",
        role: "vera",
        content: "I've analyzed harborbrewzero.com and generated a Brand Intelligence Report for Harbor Brew Zero. Approve it to start building your profile.",
      };
      const reportMsg: Message = {
        id: "bs-report",
        role: "vera",
        content: "",
        type: "brand-report",
      };
      setMessages((prev) => [...prev, introMsg, reportMsg]);
    }, 2500);
  };

  // Approve BIR → enter review phase, show first section
  const handleApproveReport = () => {
    setWizardPhase("review");
    setActiveSection(0);
    setShowActiveSection(false);
    setShowCreateProfile(false);

    // Animate first section in
    setTimeout(() => {
      setShowActiveSection(true);
    }, 300);
  };

  const handleStartOver = () => {
    setMessages(brandSafetyInitialMessages);
    setWizardPhase("choose");
    setAvoidanceTopics(defaultAvoidanceTopics);
    setKeywordGroups(defaultKeywordGroups);
    setSiteExclusions(defaultSiteExclusions);
    setSectionApprovals({ avoidance: "pending", keywords: "pending", sites: "pending", measurement: "pending" });
    setActiveSection(0);
    setShowActiveSection(true);
    setShowCreateProfile(false);
    setMeasurementMode("measurement-only");
    setProfileName("Harbor Brew Zero — Q1 2026 Brand Awareness");
  };

  // Section approve → collapse → show next
  const handleApproveSection = (section: SectionKey) => {
    setSectionApprovals((prev) => ({ ...prev, [section]: "approved" }));

    const currentIdx = sectionOrder.indexOf(section);
    if (currentIdx < sectionOrder.length - 1) {
      // More sections remaining — animate next section in
      setShowActiveSection(false);
      setTimeout(() => {
        setActiveSection(currentIdx + 1);
        setShowActiveSection(true);
      }, 300);
    } else {
      // Last section approved — show create profile card
      setShowActiveSection(false);
      setTimeout(() => {
        setShowCreateProfile(true);
      }, 300);
    }
  };

  // Edit collapsed section → re-expand it, hide everything after
  const handleEditSection = (section: SectionKey) => {
    const idx = sectionOrder.indexOf(section);
    // Reset this and all later sections to pending
    const updated = { ...sectionApprovals };
    for (let i = idx; i < sectionOrder.length; i++) {
      updated[sectionOrder[i]] = "pending";
    }
    setSectionApprovals(updated);
    setShowCreateProfile(false);
    setShowActiveSection(false);
    // Return to review phase if we were in creating/complete
    if (wizardPhase !== "review") {
      setWizardPhase("review");
    }
    setTimeout(() => {
      setActiveSection(idx);
      setShowActiveSection(true);
    }, 200);
  };

  // Create profile
  const handleCreateProfile = () => {
    setWizardPhase("creating");

    setTimeout(() => {
      setWizardPhase("complete");
      setProfileCreated(true);
    }, 2500);
  };

  // Topic toggle handlers
  const handleToggleTopic = (idx: number) => {
    setAvoidanceTopics((prev) =>
      prev.map((t, i) => i === idx ? { ...t, blocked: !t.blocked, subTopics: t.subTopics.map((s) => ({ ...s, blocked: !t.blocked })) } : t)
    );
  };

  const handleToggleSubTopic = (topicIdx: number, subIdx: number) => {
    setAvoidanceTopics((prev) =>
      prev.map((t, tI) =>
        tI === topicIdx
          ? {
              ...t,
              subTopics: t.subTopics.map((s, sI) => (sI === subIdx ? { ...s, blocked: !s.blocked } : s)),
              blocked: tI === topicIdx
                ? t.subTopics.map((s, sI) => (sI === subIdx ? !s.blocked : s.blocked)).some(Boolean)
                : t.blocked,
            }
          : t
      )
    );
  };

  // Keyword handlers
  const handleRemoveKeyword = (groupIdx: number, kwIdx: number) => {
    setKeywordGroups((prev) =>
      prev.map((g, i) => i === groupIdx ? { ...g, keywords: g.keywords.filter((_, j) => j !== kwIdx) } : g)
    );
  };

  const handleAddKeyword = (groupIdx: number, keyword: string) => {
    setKeywordGroups((prev) =>
      prev.map((g, i) => i === groupIdx ? { ...g, keywords: [...g.keywords, keyword] } : g)
    );
  };

  // Site exclusion handlers
  const handleRemoveSite = (idx: number) => {
    setSiteExclusions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSite = (domain: string) => {
    setSiteExclusions((prev) => [...prev, domain]);
  };

  const isBrandSafety = context === "brand-safety-create";
  const isAnalyze = context === "brand-safety-analyze";
  const panelWidth = expanded ? "flex-1" : "w-[420px]";
  const minWidth = expanded ? "min-w-0" : "min-w-[420px]";
  const cardWidth = cn("self-start w-full", expanded ? "max-w-[70%]" : "max-w-[92%]");

  // Derive stats
  const totalKw = keywordGroups.reduce((acc, g) => acc + g.keywords.length, 0);
  const blockedCategories = avoidanceTopics.filter((t) => t.blocked).length;
  const totalSubBlocked = avoidanceTopics.reduce((acc, t) => acc + t.subTopics.filter((s) => s.blocked).length, 0);

  // Helper to get collapsed summary metadata for each section
  const getSectionSummary = (key: SectionKey): { icon: React.ReactNode; title: string; subtitle: string } => {
    switch (key) {
      case "avoidance":
        return {
          icon: <Ban className="h-4 w-4 text-cool-500" />,
          title: "Avoidance Topics",
          subtitle: `${blockedCategories} categories · ${totalSubBlocked} sub-topics blocked`,
        };
      case "keywords":
        return {
          icon: <Ban className="h-4 w-4 text-cool-500" />,
          title: "Keywords",
          subtitle: `${totalKw} keywords across ${keywordGroups.length} categories`,
        };
      case "sites":
        return {
          icon: <Globe className="h-4 w-4 text-cool-500" />,
          title: "Site Exclusion",
          subtitle: `${siteExclusions.length} excluded domains`,
        };
      case "measurement":
        return {
          icon: <BarChart3 className="h-4 w-4 text-cool-500" />,
          title: "Measurement Mode",
          subtitle: measurementMode === "measurement-only" ? "Measurement Only" : "Measurement + ABS (Active Blocking)",
        };
    }
  };

  // Render the active section's full card
  const renderSectionCard = (key: SectionKey) => {
    switch (key) {
      case "avoidance":
        return (
          <SectionCard
            icon={<Ban className="h-4 w-4 text-cool-500" />}
            title="Avoidance Topics"
            badge="Industry Standard"
            onApprove={() => handleApproveSection("avoidance")}

            footerLeftText="Review the topic selections above"
          >
            <AvoidanceTopicsContent
              topics={avoidanceTopics}
              onToggleTopic={handleToggleTopic}
              onToggleSubTopic={handleToggleSubTopic}
            />
          </SectionCard>
        );
      case "keywords":
        return (
          <SectionCard
            icon={<Ban className="h-4 w-4 text-cool-500" />}
            title="Keywords"
            badge="Industry Standard"
            onApprove={() => handleApproveSection("keywords")}

            footerLeftText={`${totalKw} keywords will be blocked`}
          >
            <KeywordsContent
              keywordGroups={keywordGroups}
              onRemoveKeyword={handleRemoveKeyword}
              onAddKeyword={handleAddKeyword}
            />
          </SectionCard>
        );
      case "sites":
        return (
          <SectionCard
            icon={<Globe className="h-4 w-4 text-cool-500" />}
            title="Site Exclusion"
            badge="Industry Standard"
            onApprove={() => handleApproveSection("sites")}

            footerLeftText={`${siteExclusions.length} excluded domains`}
          >
            <SiteExclusionContent
              sites={siteExclusions}
              onRemoveSite={handleRemoveSite}
              onAddSite={handleAddSite}
            />
          </SectionCard>
        );
      case "measurement":
        return (
          <SectionCard
            icon={<BarChart3 className="h-4 w-4 text-cool-500" />}
            title="Measurement Mode"
            onApprove={() => handleApproveSection("measurement")}

            footerLeftText="Select your measurement mode"
            confirmLabel="Confirm"
          >
            <MeasurementModeContent
              mode={measurementMode}
              onModeChange={setMeasurementMode}
            />
          </SectionCard>
        );
    }
  };

  return (
    <div
      className={cn(
        "bg-white border-l border-neutral-100 flex flex-col transition-all duration-300 ease-out overflow-hidden",
        open ? cn(panelWidth, expanded ? "min-w-0" : "flex-shrink-0") : "w-0 border-l-0"
      )}
    >
      {/* Header */}
      <div className={cn("h-14 px-5 flex items-center justify-between border-b border-neutral-100 flex-shrink-0", minWidth)}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-cool-500 hover:text-cool-900"
            onClick={() => setExpanded((prev) => !prev)}
            title={expanded ? "Collapse panel" : "Expand panel"}
          >
            {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
          <div className="w-7 h-7 rounded-full bg-plum-100 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-plum-600" />
          </div>
          <span className="text-h6 text-cool-900">Vera</span>
          {(isBrandSafety || isAnalyze) && (
            <span className="px-2 py-0.5 rounded-full text-label bg-plum-50 text-plum-600 border border-plum-100">
              {isAnalyze ? "Analysis" : "Brand Safety"}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-cool-600 hover:text-cool-900"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages + Wizard Content */}
      <div className={cn("flex-1 overflow-y-auto overflow-x-hidden px-5 py-4 flex flex-col gap-4", minWidth)}>
        {/* Chat messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "min-w-0",
              msg.role === "user"
                ? cn("self-end", expanded ? "max-w-[50%]" : "max-w-[80%]")
                : cn("self-start", expanded ? "max-w-[70%]" : "max-w-[92%]")
            )}
          >
            {msg.type === "attachment" ? (
              <div className="bg-plum-600 text-white rounded-xl rounded-br-sm px-4 py-3 overflow-hidden">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body3 font-medium truncate">{msg.content}</p>
                    <p className="text-caption text-white/70">PDF · 2.4 MB</p>
                  </div>
                </div>
              </div>
            ) : msg.type === "brand-report" ? (
              <BrandIntelligenceReport expanded={expanded} onApprove={wizardPhase === "report" ? handleApproveReport : undefined} />
            ) : (
              <div
                className={cn(
                  "px-4 py-3 rounded-xl text-body3",
                  msg.role === "user"
                    ? "bg-plum-600 text-white rounded-br-sm"
                    : "bg-neutral-50 text-cool-800 border border-neutral-100 rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {/* ===== ANALYZE FLOW ===== */}
        {isAnalyze && analyzePhase === "thinking" && (
          <div className={cn("flex items-center gap-2 self-start px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 rounded-bl-sm", cardWidth)}>
            <Loader2 className="h-4 w-4 text-plum-500 animate-spin" />
            <span className="text-body3 text-cool-600">Analyzing campaign data...</span>
          </div>
        )}

        {isAnalyze && analyzePhase !== "thinking" && (
          <AnalyzeFlowContent
            phase={analyzePhase}
            onShowExamples={() => {
              setAnalyzePhase("examples");
              setTimeout(() => setAnalyzePhase("complete"), 300);
            }}
            onDismissExamples={() => setAnalyzePhase("complete")}
            cardWidth={cardWidth}
          />
        )}

        {/* ===== WIZARD UI ===== */}

        {/* Choose source */}
        {isBrandSafety && wizardPhase === "choose" && (
          <div className={cn("space-y-3 self-start", expanded ? "max-w-[70%]" : "max-w-[92%]")}>
            <button
              onClick={handleUploadPdf}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-neutral-200 bg-white hover:border-plum-300 hover:bg-plum-25 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-plum-50 flex items-center justify-center group-hover:bg-plum-100 transition-colors">
                <Upload className="h-4.5 w-4.5 text-plum-600" />
              </div>
              <div>
                <p className="text-body3 font-medium text-cool-900">Upload PDF Campaign Brief</p>
                <p className="text-body3 text-cool-500">Extract brand info from a document</p>
              </div>
            </button>

            <div className="flex items-center gap-3 px-2">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-body3 text-cool-400">or</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <button
              onClick={handleCrawlUrl}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-neutral-200 bg-white hover:border-plum-300 hover:bg-plum-25 transition-colors text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-plum-50 flex items-center justify-center group-hover:bg-plum-100 transition-colors">
                <Globe className="h-4.5 w-4.5 text-plum-600" />
              </div>
              <div>
                <p className="text-body3 font-medium text-cool-900">Crawl Website</p>
                <p className="text-body3 text-cool-500">harborbrewzero.com</p>
              </div>
            </button>
          </div>
        )}

        {/* Analyzing spinner */}
        {isBrandSafety && wizardPhase === "analyzing" && (
          <div className={cn("flex items-center gap-2 self-start px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100 rounded-bl-sm", cardWidth)}>
            <Loader2 className="h-4 w-4 text-plum-500 animate-spin" />
            <span className="text-body3 text-cool-600">Analyzing...</span>
          </div>
        )}

        {/* Action buttons after report — approve is now inside the BIR card */}

        {/* Creating profile spinner — handled inline in review section below */}

        {/* ===== REVIEW PHASE: Sequential sections ===== */}
        {isBrandSafety && (wizardPhase === "review" || wizardPhase === "creating" || wizardPhase === "complete") && (
          <>
            {/* Collapsed BIR summary */}
            <div className={cardWidth}>
              <CollapsedSectionSummary
                icon={<ShieldCheck className="h-4 w-4 text-plum-600" />}
                title="Brand Intelligence Report"
                subtitle="Harbor Brew Zero · 4 products · 4 audiences"
                onEdit={wizardPhase === "complete" ? undefined : () => setWizardPhase("report")}
              />
            </div>

            {/* Instructional text below BIR */}
            <div className={cn("px-4 py-3 rounded-xl text-body3 bg-neutral-50 text-cool-800 border border-neutral-100 rounded-bl-sm", cardWidth)}>
              Review each section below and approve when you're satisfied. Once all sections are approved, you'll be able to name and create your profile.
            </div>

            {/* Approved sections (collapsed) + active section (expanded) */}
            {sectionOrder.map((key, idx) => {
              const summary = getSectionSummary(key);

              // Already approved — show collapsed summary
              if (sectionApprovals[key] === "approved" && idx < activeSection) {
                return (
                  <div key={key} className={cardWidth}>
                    <CollapsedSectionSummary
                      icon={summary.icon}
                      title={summary.title}
                      subtitle={summary.subtitle}
                      onEdit={wizardPhase === "complete" ? undefined : () => handleEditSection(key)}
                    />
                  </div>
                );
              }

              // Also show collapsed for the last approved section when showing create profile or complete
              if (sectionApprovals[key] === "approved" && allApproved) {
                return (
                  <div key={key} className={cardWidth}>
                    <CollapsedSectionSummary
                      icon={summary.icon}
                      title={summary.title}
                      subtitle={summary.subtitle}
                      onEdit={wizardPhase === "complete" ? undefined : () => handleEditSection(key)}
                    />
                  </div>
                );
              }

              // Active section — show full card with animation
              if (idx === activeSection && sectionApprovals[key] === "pending") {
                return (
                  <div
                    key={key}
                    className={cn(
                      cardWidth,
                      "transition-all duration-500",
                      showActiveSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    )}
                  >
                    {renderSectionCard(key)}
                  </div>
                );
              }

              // Future sections — don't render
              return null;
            })}

            {/* Create Profile card — after all sections approved, before creation */}
            {allApproved && showCreateProfile && wizardPhase === "review" && (
              <div className={cn(
                cardWidth,
                "transition-all duration-500",
                showCreateProfile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}>
                <CreateProfileCard
                  profileName={profileName}
                  onProfileNameChange={setProfileName}
                  onCreateProfile={handleCreateProfile}
                />
              </div>
            )}

            {/* Creating profile spinner — inline in the flow */}
            {wizardPhase === "creating" && (
              <div className={cn("flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100", cardWidth)}>
                <Loader2 className="h-4 w-4 text-plum-500 animate-spin" />
                <span className="text-body3 text-cool-600">Creating profile...</span>
              </div>
            )}

            {/* Profile created — collapsed summary (no edit) */}
            {wizardPhase === "complete" && (
              <div className={cardWidth}>
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="h-4 w-4 text-grass-600" />
                      <span className="text-body3 font-semibold text-cool-900">{profileName}</span>
                    </div>
                    <p className="text-body3 text-cool-600 mb-2">
                      {blockedCategories} avoidance categories · {totalKw} keywords · {siteExclusions.length} excluded sites · {measurementMode === "measurement-only" ? "Measurement Only" : "Measurement + ABS"}
                    </p>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-grass-600" />
                      <span className="text-body3 text-grass-700 font-medium">Profile Created</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Profile created: success card + follow-up CTAs */}
        {isBrandSafety && wizardPhase === "complete" && (
          <div className={cn("self-start space-y-3", cardWidth)}>
            {/* Success card */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-grass-100 bg-grass-50">
              <div className="w-8 h-8 rounded-full bg-grass-100 flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-grass-700" />
              </div>
              <div>
                <p className="text-body3 font-medium text-grass-700">Profile Created Successfully</p>
                <p className="text-body3 text-cool-600 mt-0.5">{profileName} is now active with {measurementMode === "measurement-only" ? "measurement-only" : "measurement + active blocking"} mode.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { window.location.href = "/?profile=" + encodeURIComponent("Harbor Brew Zero — US Standard"); }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-plum-200 bg-white text-plum-700 text-body3 font-medium hover:bg-plum-25 transition-colors"
              >
                Go to Campaigns
              </button>
              <button
                onClick={handleStartOver}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-cool-700 text-body3 font-medium hover:bg-neutral-50 transition-colors"
              >
                Create another profile
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions (general only) */}
      {!isBrandSafety && !isAnalyze && messages.length <= 1 && (
        <div className={cn("px-5 pb-3 flex flex-wrap gap-2", minWidth)}>
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleQuickQuestion(q)}
              className="px-3 py-1.5 text-body3 font-medium text-plum-600 bg-plum-50 border border-plum-100 rounded-full hover:bg-plum-100 transition-colors duration-200"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={cn("p-4 border-t border-neutral-100 flex-shrink-0", minWidth)}>
        <div className={cn("flex items-center gap-2", expanded && "max-w-2xl mx-auto")}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={isBrandSafety ? "Ask about brand safety..." : isAnalyze ? "Ask about this analysis..." : "Ask Vera anything..."}
            className="flex-1 h-10 px-4 text-body3 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-plum-300 focus:ring-2 focus:ring-plum-100 transition-all duration-200"
          />
          <Button
            variant="plum"
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-10 w-10 p-0 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:opacity-100"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-caption text-cool-600 text-center mt-2">Vera is AI and can make mistakes</p>
      </div>
    </div>
  );
}
