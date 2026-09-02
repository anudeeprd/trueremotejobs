import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onQuickSearch: (query: string, extras?: Record<string, any>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onQuickSearch,
}) => {
  const quickTags = [
    { label: 'React Native', query: 'React Native' },
    { label: '🇮🇳 India Eligible', query: '', extras: { candidateCountry: 'India' } },
    { label: 'AI & LLMs', query: 'AI' },
    { label: 'Frontend', query: 'Frontend' },
    { label: 'Series A', query: '', extras: { companyStage: 'Series A' } },
    { label: '$100K+ USD', query: '', extras: { minimumSalary: 100000 } },
    { label: 'TypeScript', query: 'TypeScript' },
    { label: 'Product Designer', query: 'Product Designer' },
  ];

  return (
    <div className="w-full">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-zinc-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search roles, skills, or companies (e.g. React Native, TypeScript, AI, NovaStack)..."
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />

        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3.5 p-1 text-zinc-400 hover:text-zinc-600 rounded-md focus:outline-none"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Quick Search Chips */}
      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-xs text-zinc-500">
        <span className="font-medium text-zinc-400 mr-1">Popular:</span>
        {quickTags.map((tag) => (
          <button
            key={tag.label}
            onClick={() => onQuickSearch(tag.query, tag.extras)}
            className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 text-zinc-600 font-medium transition-colors shadow-2xs"
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};
