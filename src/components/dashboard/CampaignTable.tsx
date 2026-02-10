import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowUpDown, ChevronDown, X } from "lucide-react";
import { campaignsData, formatNumber, formatCurrency, type CampaignData } from "@/data/mockData";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;

type SortKey = keyof CampaignData;
type SortDir = "asc" | "desc";

const statusConfig = {
  "on-track": { label: "On Track", dotColor: "bg-grass-500" },
  "at-risk": { label: "At Risk", dotColor: "bg-orange-500" },
  "needs-attention": { label: "Needs Attention", dotColor: "bg-tomato-500" },
};

interface CampaignTableProps {
  sourceFilter: string;
}

/** Truncate text with ellipsis after maxLen characters */
function truncate(text: string, maxLen: number) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + "…";
}

/** Get unique brand safety profiles from campaigns */
function getUniqueBrandSafetyProfiles(): string[] {
  const profiles = new Set(campaignsData.map((c) => c.brandSafetyProfile));
  return Array.from(profiles).sort();
}

/** Get unique sources from campaigns */
function getUniqueSources(): string[] {
  const sources = new Set(campaignsData.map((c) => c.source));
  return Array.from(sources).sort();
}

/** Get unique statuses from campaigns */
function getUniqueStatuses(): Array<"on-track" | "at-risk" | "needs-attention"> {
  return ["needs-attention", "at-risk", "on-track"];
}

type FilterDropdownProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body3 font-medium transition-colors duration-200 border",
          value !== "all"
            ? "bg-plum-50 text-plum-700 border-plum-200"
            : "bg-white text-cool-600 border-neutral-200 hover:border-neutral-300"
        )}
      >
        {value !== "all" ? (
          <>
            {label}: {truncate(value, 16)}
            <button
              onClick={(e) => { e.stopPropagation(); onChange("all"); setOpen(false); }}
              className="ml-0.5 p-0.5 rounded hover:bg-plum-100"
            >
              <X className="h-3 w-3" />
            </button>
          </>
        ) : (
          <>
            {label}
            <ChevronDown className="h-3 w-3" />
          </>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-20 bg-white rounded-lg border border-neutral-200 shadow-lg py-1 min-w-[200px] max-h-[240px] overflow-auto">
            <button
              onClick={() => { onChange("all"); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-2 text-body3 hover:bg-neutral-50 transition-colors",
                value === "all" && "text-plum-700 font-medium bg-plum-25"
              )}
            >
              All
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={cn(
                  "w-full text-left px-3 py-2 text-body3 hover:bg-neutral-50 transition-colors",
                  value === opt && "text-plum-700 font-medium bg-plum-25"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function CampaignTable({ sourceFilter }: CampaignTableProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Filters — read initial profile from URL params
  const [profileFilter, setProfileFilter] = useState(() => {
    const urlProfile = searchParams.get("profile");
    return urlProfile || "all";
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [localSourceFilter, setLocalSourceFilter] = useState("all");

  // Scroll to table when arriving with a profile filter from URL
  useEffect(() => {
    if (searchParams.get("profile") && tableRef.current) {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [searchParams]);

  const uniqueProfiles = useMemo(() => getUniqueBrandSafetyProfiles(), []);
  const uniqueSources = useMemo(() => getUniqueSources(), []);
  const uniqueStatuses = useMemo(() => getUniqueStatuses(), []);

  const filtered = campaignsData.filter((c) => {
    if (sourceFilter !== "all" && c.source.toLowerCase() !== sourceFilter) return false;
    if (profileFilter !== "all" && c.brandSafetyProfile !== profileFilter) return false;
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (localSourceFilter !== "all" && c.source !== localSourceFilter) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    const statusOrder = { "needs-attention": 0, "at-risk": 1, "on-track": 2 };
    if (sortKey === "status") {
      const diff = statusOrder[a.status] - statusOrder[b.status];
      return sortDir === "asc" ? diff : -diff;
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortDir === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const activeFilterCount = [profileFilter, statusFilter, localSourceFilter].filter((f) => f !== "all").length;

  const clearAllFilters = () => {
    setProfileFilter("all");
    setStatusFilter("all");
    setLocalSourceFilter("all");
    setPage(1);
  };

  const SortHeader = ({ label, sortKeyProp }: { label: string; sortKeyProp: SortKey }) => (
    <button
      onClick={() => handleSort(sortKeyProp)}
      className="inline-flex items-center gap-1 hover:text-cool-900 transition-colors duration-200"
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <Card ref={tableRef}>
      <CardContent className="p-0">
        {/* Header + Filters (right-aligned) */}
        <div className="flex items-center justify-between p-5 pb-3">
          <h3 className="text-h6 text-cool-900">All Campaigns</h3>
          <div className="flex items-center gap-2">
            <FilterDropdown
              label="Brand Safety Profile"
              value={profileFilter}
              options={uniqueProfiles}
              onChange={(v) => { setProfileFilter(v); setPage(1); }}
            />
            <FilterDropdown
              label="Status"
              value={statusFilter}
              options={uniqueStatuses.map((s) => s)}
              onChange={(v) => { setStatusFilter(v); setPage(1); }}
            />
            <FilterDropdown
              label="Source"
              value={localSourceFilter}
              options={uniqueSources}
              onChange={(v) => { setLocalSourceFilter(v); setPage(1); }}
            />
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-caption text-plum-600 hover:text-plum-700 font-medium ml-1"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-neutral-100">
              <TableHead className="text-label text-cool-600 font-medium pl-5">
                <SortHeader label="Campaign" sortKeyProp="name" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium">
                <SortHeader label="Brand Safety" sortKeyProp="brandSafetyProfile" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">
                <SortHeader label="Block Rate" sortKeyProp="blockRate" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">
                <SortHeader label="Impressions" sortKeyProp="impressions" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">
                <SortHeader label="Suitability" sortKeyProp="suitabilityRate" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">
                <SortHeader label="CPM" sortKeyProp="cpm" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">
                <SortHeader label="Media Cost" sortKeyProp="mediaCost" />
              </TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">
                <SortHeader label="Inefficiency" sortKeyProp="inefficiency" />
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <TableRow
                  key={campaign.id}
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                  className="cursor-pointer hover:bg-neutral-50 transition-colors duration-200 border-neutral-100"
                >
                  <TableCell className="text-body3 font-medium text-cool-900 pl-5" title={campaign.name}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={cn("w-2 h-2 rounded-full flex-shrink-0", status.dotColor)}
                        title={status.label}
                      />
                      <span className="truncate max-w-[150px]">{truncate(campaign.name, 18)}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-body3 text-cool-700" title={campaign.brandSafetyProfile}>
                    <span className="block truncate">{truncate(campaign.brandSafetyProfile, 18)}</span>
                  </TableCell>
                  <TableCell className={cn("text-body3 text-right font-medium", campaign.blockRate > 8 ? "text-tomato-700" : campaign.blockRate > 6 ? "text-orange-700" : "text-cool-800")}>
                    {campaign.blockRate}%
                  </TableCell>
                  <TableCell className="text-body3 text-cool-800 text-right">
                    {formatNumber(campaign.impressions)}
                  </TableCell>
                  <TableCell className="text-body3 text-cool-800 text-right">
                    {campaign.suitabilityRate}%
                  </TableCell>
                  <TableCell className="text-body3 text-cool-800 text-right">
                    ${campaign.cpm.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-body3 text-cool-800 text-right">
                    {formatCurrency(campaign.mediaCost)}
                  </TableCell>
                  <TableCell className={cn("text-body3 text-right font-medium", campaign.inefficiency > 8 ? "text-tomato-700" : campaign.inefficiency > 6 ? "text-orange-700" : "text-cool-800")}>
                    {campaign.inefficiency}%
                  </TableCell>
                  <TableCell className="pr-5">
                    <ArrowRight className="h-4 w-4 text-cool-600" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Legend + Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-neutral-100">
          <div className="flex items-center gap-5">
            {/* Status Legend */}
            <span className="text-caption font-medium text-cool-700">Status:</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-caption text-cool-600">
                <span className="w-2 h-2 rounded-full bg-tomato-500" />
                Needs Attention
              </span>
              <span className="flex items-center gap-1.5 text-caption text-cool-600">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                At Risk
              </span>
              <span className="flex items-center gap-1.5 text-caption text-cool-600">
                <span className="w-2 h-2 rounded-full bg-grass-500" />
                On Track
              </span>
            </div>
            <span className="text-neutral-300">|</span>
            <span className="text-caption text-cool-600">
              Showing {sorted.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(page * ITEMS_PER_PAGE, sorted.length)} of {sorted.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "plum" : "ghost"}
                size="icon"
                className="h-8 w-8 text-caption"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
