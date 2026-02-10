import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { brandSafetyProfiles, type BrandSafetyProfile } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useVeraContext } from "@/components/layout/AppLayout";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Plus,
  MoreHorizontal,
  Users,
  Hash,
  Clock,
  ChevronRight,
  ChevronDown,
  Sparkles,
  PenLine,
  Check,
} from "lucide-react";

const riskConfig = {
  strict: { label: "Strict", icon: ShieldCheck, color: "text-grass-700", bg: "bg-grass-50", border: "border-grass-200" },
  moderate: { label: "Moderate", icon: ShieldAlert, color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  permissive: { label: "Permissive", icon: ShieldOff, color: "text-tomato-700", bg: "bg-tomato-50", border: "border-tomato-200" },
};

const statusConfig = {
  active: { label: "Active", dot: "bg-grass-500" },
  draft: { label: "Draft", dot: "bg-cool-400" },
  archived: { label: "Archived", dot: "bg-neutral-400" },
};

const projectTypeConfig = {
  "abs": { label: "ABS" },
  "post-bid": { label: "Post-Bid" },
};

type FilterTab = "all" | "active" | "draft" | "archived";

function ProfileCard({ profile, isNew }: { profile: BrandSafetyProfile; isNew?: boolean }) {
  const risk = riskConfig[profile.riskLevel];
  const status = statusConfig[profile.status];
  const RiskIcon = risk.icon;

  return (
    <Card className={cn(
      "cursor-pointer transition-all duration-200 hover:shadow-elevation-hover group",
      profile.status === "archived" && "opacity-60",
      isNew && "border-grass-300 ring-1 ring-grass-100"
    )}>
      <CardContent className="p-5 relative">
        <button className="absolute top-4 right-4 p-1 text-cool-400 hover:text-cool-700 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {/* New profile banner */}
        {isNew && (
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-grass-100">
            <div className="w-5 h-5 rounded-full bg-grass-500 flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span className="text-body3 font-medium text-grass-700">Just created by Vera AI</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium border", risk.bg, risk.color, risk.border)}>
              <RiskIcon className="h-3 w-3" />
              {risk.label}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] leading-[16px] font-medium text-cool-600">
              <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
              {status.label}
            </span>
          </div>
          <span className="text-[12px] leading-[16px] font-medium text-cool-500 py-0.5">
            Project type: {projectTypeConfig[profile.projectType].label}
          </span>
        </div>

        {/* Name + Description */}
        <h3 className="text-body3 font-semibold text-cool-900 mb-1">{profile.name}</h3>
        <p className="text-body3 text-cool-600 line-clamp-1 mb-4">{profile.description}</p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.categories.slice(0, 4).map((cat) => (
            <span key={cat} className="px-2 py-0.5 rounded text-label bg-neutral-50 text-cool-600 border border-neutral-100">
              {cat}
            </span>
          ))}
          {profile.categories.length > 4 && (
            <span className="px-2 py-0.5 rounded text-label bg-neutral-50 text-cool-500">
              +{profile.categories.length - 4} more
            </span>
          )}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-body3 text-cool-600 pt-3 border-t border-neutral-100">
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            {profile.campaignsUsing} campaign{profile.campaignsUsing !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5" />
            {profile.keywordsBlocked} keywords
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <Clock className="h-3.5 w-3.5" />
            {profile.lastUpdated}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function SplitNewProfileButton({ onCreateWithVera }: { onCreateWithVera: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="inline-flex items-stretch rounded-lg overflow-hidden shadow-sm">
        <Button variant="plum" className="gap-2 rounded-none rounded-l-lg">
          <Plus className="h-4 w-4" />
          New Profile
        </Button>
        <div className="w-px bg-plum-400" />
        <Button
          variant="plum"
          size="icon"
          className="rounded-none rounded-r-lg w-9"
          onClick={() => setOpen(!open)}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full right-0 mt-1 z-20 bg-white rounded-lg border border-neutral-200 shadow-lg py-1 min-w-[180px]">
            <button
              onClick={() => setOpen(false)}
              className="w-full text-left px-3 py-2 text-body3 text-cool-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
            >
              <PenLine className="h-4 w-4 text-cool-500" />
              Create Manually
            </button>
            <button
              onClick={() => { setOpen(false); onCreateWithVera(); }}
              className="w-full text-left px-3 py-2 text-body3 text-cool-700 hover:bg-neutral-50 transition-colors flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-plum-500" />
              Create with Vera
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function BrandSafetyProfilesPage() {
  const { openVeraWithContext, profileCreated } = useVeraContext();
  const [filter, setFilter] = useState<FilterTab>("all");

  // Only include the new profile (id "6") if the wizard has completed
  const profiles = useMemo(() => {
    if (profileCreated) return brandSafetyProfiles;
    return brandSafetyProfiles.filter((p) => p.id !== "6");
  }, [profileCreated]);

  const filtered = filter === "all"
    ? profiles
    : profiles.filter((p) => p.status === filter);

  const counts = {
    all: profiles.length,
    active: profiles.filter((p) => p.status === "active").length,
    draft: profiles.filter((p) => p.status === "draft").length,
    archived: profiles.filter((p) => p.status === "archived").length,
  };

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: `All (${counts.all})` },
    { id: "active", label: `Active (${counts.active})` },
    { id: "draft", label: `Drafts (${counts.draft})` },
    { id: "archived", label: `Archived (${counts.archived})` },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-8 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-h5 text-cool-900">Brand Safety</h1>
            <p className="text-body3 text-cool-600 mt-1">
              Create and manage profiles to protect your campaigns from unsafe content.
            </p>
          </div>
          <SplitNewProfileButton onCreateWithVera={() => openVeraWithContext("brand-safety-create")} />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b border-neutral-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "px-4 py-2.5 text-body3 font-medium transition-colors relative",
                filter === tab.id
                  ? "text-plum-700"
                  : "text-cool-600 hover:text-cool-900"
              )}
            >
              {tab.label}
              {filter === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-plum-500" />
              )}
            </button>
          ))}
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filtered
            .slice()
            .sort((a, b) => (a.id === "6" ? -1 : b.id === "6" ? 1 : 0))
            .map((profile) => (
            <ProfileCard key={profile.id} profile={profile} isNew={profile.id === "6"} />
          ))}

          {/* Create New Card */}
          <div className="rounded-xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-plum-300 hover:bg-plum-25 transition-colors duration-200 min-h-[220px]">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
              <Plus className="h-5 w-5 text-cool-500" />
            </div>
            <p className="text-body3 font-medium text-cool-700">Create New Profile</p>
            <p className="text-caption text-cool-500 mt-1">Set up content filters and keyword blocklists</p>
          </div>
        </div>
      </div>
    </div>
  );
}
