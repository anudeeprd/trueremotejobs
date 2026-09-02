import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 flex items-center justify-center gap-2">
      <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
      <span className="font-medium">Demo dataset · Fictional job listings</span>
      <span className="text-amber-700 hidden sm:inline">—</span>
      <span className="text-amber-800 hidden sm:inline">
        Positions shown are fictional and created for this WebMCP agent prototype.
      </span>
      <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded bg-amber-100/90 text-amber-900 text-[10px] font-semibold tracking-wide uppercase border border-amber-300/60">
        <Sparkles className="w-2.5 h-2.5 text-amber-700" />
        Hackathon Prototype
      </span>
    </div>
  );
};
