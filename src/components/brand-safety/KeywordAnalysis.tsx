import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ShieldOff, ShieldCheck, X } from "lucide-react";
import { trendingKeywords, formatNumber, formatCurrency } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function KeywordAnalysis() {
  return (
    <Card>
      <CardContent className="p-5">
        <h3 className="text-h6 text-cool-900 mb-4">Keyword Analysis</h3>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-neutral-100">
              <TableHead className="text-label text-cool-600 font-medium">Keyword</TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">Impressions</TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">Media Cost</TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">Trend</TableHead>
              <TableHead className="text-label text-cool-600 font-medium">Status</TableHead>
              <TableHead className="text-label text-cool-600 font-medium text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendingKeywords.map((kw) => (
              <TableRow key={kw.keyword} className="border-neutral-100 hover:bg-neutral-25 transition-colors duration-200">
                <TableCell className="text-body3 font-medium text-cool-900">{kw.keyword}</TableCell>
                <TableCell className="text-body3 text-cool-800 text-right">{formatNumber(kw.impressions)}</TableCell>
                <TableCell className="text-body3 text-cool-800 text-right">{formatCurrency(kw.mediaCost)}</TableCell>
                <TableCell className="text-right">
                  <span className={cn("inline-flex items-center gap-0.5 text-caption font-medium", kw.trend > 0 ? "text-tomato-700" : "text-grass-700")}>
                    {kw.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(kw.trend)}%
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] leading-[16px] font-medium", kw.blocked ? "bg-tomato-50 text-tomato-700" : "bg-neutral-50 text-cool-600")}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", kw.blocked ? "bg-tomato-500" : "bg-cool-400")} />
                    {kw.blocked ? "Blocked" : "Allowed"}
                    <button className={cn("ml-0.5 rounded-full hover:bg-black/10 transition-colors", kw.blocked ? "text-tomato-500" : "text-cool-400")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="h-7 text-caption">
                    {kw.blocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
