import React from 'react';
import { Globe2, Bookmark, Compass, HelpCircle, Bot } from 'lucide-react';
import { useSavedJobs } from '../../lib/savedJobs';

export type NavTab = 'discover' | 'saved' | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const { count: savedCount } = useSavedJobs();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('discover')}
              className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 -m-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-zinc-900">
                    TrueRemote<span className="text-indigo-600">Jobs</span>
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-medium -mt-0.5 hidden sm:block">
                  Remote jobs you can actually apply for.
                </p>
              </div>
            </button>

            {/* WebMCP Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5 text-indigo-600" />
              <span>WebMCP Demo</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onSelectTab('discover')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'discover'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Compass className="w-4 h-4 text-zinc-500" />
              <span>Discover</span>
            </button>

            <button
              onClick={() => onSelectTab('saved')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                currentTab === 'saved'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${currentTab === 'saved' ? 'text-indigo-600 fill-indigo-600' : 'text-zinc-500'}`} />
              <span>Saved Jobs</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-semibold leading-none animate-in fade-in zoom-in duration-200">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectTab('about')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'about'
                  ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-zinc-500" />
              <span>About Demo</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
