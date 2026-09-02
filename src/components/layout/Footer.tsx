import React from 'react';
import { Globe2, Bot, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white py-12 text-sm text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-zinc-800 text-sm">TrueRemoteJobs</p>
              <p className="text-xs text-zinc-500">Remote jobs you can actually apply for.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>WebMCP Integration via <code className="text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">document.modelContext</code></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Deterministic Fictional Dataset</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            Built for Hackathon Demo · Not a production marketplace.
          </p>
        </div>
      </div>
    </footer>
  );
};
