import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function InsightsBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-neutral-200 shadow-sm">
      <div className="w-8 h-8 rounded-full bg-plum-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Sparkles className="h-4 w-4 text-plum-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body3 font-medium text-cool-900">
          3 campaigns need attention
        </p>
        <p className="text-body3 text-cool-600 mt-0.5">
          <Link to="/campaign/1" className="text-plum-600 hover:text-plum-700 underline underline-offset-2">Harbor Brew Zero</Link>, <Link to="/campaign/2" className="text-plum-600 hover:text-plum-700 underline underline-offset-2">TechStart</Link>, and <Link to="/campaign/3" className="text-plum-600 hover:text-plum-700 underline underline-offset-2">FinServ</Link> have block rates above 8%. Consider reviewing keyword lists or adjusting brand safety profiles.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 p-1 text-cool-600 hover:text-cool-700 transition-colors duration-200 rounded"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
