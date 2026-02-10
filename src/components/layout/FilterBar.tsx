import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  program: string;
  source: string;
  onProgramChange: (value: string) => void;
  onSourceChange: (value: string) => void;
}

export function FilterBar({ program, source, onProgramChange, onSourceChange }: FilterBarProps) {
  return (
    <div className="h-12 px-6 flex items-center gap-4 bg-neutral-25 border-b border-neutral-100">
      <div className="flex items-center gap-2">
        <span className="text-label text-cool-600">Program</span>
        <Select value={program} onValueChange={onProgramChange}>
          <SelectTrigger className="w-[180px] h-8 text-body3 bg-white border-neutral-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="program-1">Harbor Brew Zero</SelectItem>
            <SelectItem value="program-2">TechStart</SelectItem>
            <SelectItem value="program-3">FinServ</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-px h-6 bg-neutral-200" />

      <div className="flex items-center gap-2">
        <span className="text-label text-cool-600">Source</span>
        <Select value={source} onValueChange={onSourceChange}>
          <SelectTrigger className="w-[140px] h-8 text-body3 bg-white border-neutral-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="meta">Meta</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
