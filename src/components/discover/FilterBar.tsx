import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ArrowUpDown } from 'lucide-react';
import { JobSearchParams } from '../../types/job';
import { FilterDrawer } from './FilterDrawer';

interface FilterBarProps {
  filters: JobSearchParams;
  onUpdateFilters: (newFilters: JobSearchParams) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  totalResults,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Count active filters (excluding query, limit, sortBy)
  const activeCount = Object.entries(filters).filter(([key, val]) => {
    if (['query', 'limit', 'offset', 'sortBy'].includes(key)) return false;
    return val !== undefined && val !== '' && val !== 'all';
  }).length;

  const handleQuickCountry = (country: string) => {
    onUpdateFilters({
      ...filters,
      candidateCountry: filters.candidateCountry === country ? undefined : country,
    });
  };

  const handleQuickSalary = (min: number) => {
    onUpdateFilters({
      ...filters,
      minimumSalary: filters.minimumSalary === min ? undefined : min,
    });
  };

  const handleQuickStage = (stage: string) => {
    onUpdateFilters({
      ...filters,
      companyStage: filters.companyStage === stage ? undefined : stage,
    });
  };

  const handleQuickExp = (exp: string) => {
    onUpdateFilters({
      ...filters,
      experienceLevel: filters.experienceLevel === exp ? undefined : exp,
    });
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        
        {/* Quick Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          
          {/* All Filters Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
              activeCount > 0
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>All Filters</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center -mr-1">
                {activeCount}
              </span>
            )}
          </button>

          {/* Quick Country: India */}
          <button
            onClick={() => handleQuickCountry('India')}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              filters.candidateCountry === 'India'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold shadow-2xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
          >
            🇮🇳 India Eligible
          </button>

          {/* Quick Salary: $60K+ */}
          <button
            onClick={() => handleQuickSalary(60000)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              filters.minimumSalary === 60000
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold shadow-2xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
          >
            $60K+ USD
          </button>

          {/* Quick Salary: $100K+ */}
          <button
            onClick={() => handleQuickSalary(100000)}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              filters.minimumSalary === 100000
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold shadow-2xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
          >
            $100K+ USD
          </button>

          {/* Quick Stage: Series A */}
          <button
            onClick={() => handleQuickStage('Series A')}
            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              filters.companyStage === 'Series A'
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold shadow-2xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
          >
            Series A
          </button>

          {/* Quick Experience: Senior */}
          <button
            onClick={() => handleQuickExp('Senior')}
            className={`hidden sm:inline-flex px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
              filters.experienceLevel === 'Senior'
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-semibold shadow-2xs'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
          >
            Senior Level
          </button>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs text-zinc-600 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline font-medium">Sort:</span>
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => onUpdateFilters({ ...filters, sortBy: e.target.value as any })}
            className="px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest posted</option>
            <option value="salary_desc">Salary: High to Low</option>
            <option value="salary_asc">Salary: Low to High</option>
            <option value="relevance">Featured & Relevant</option>
          </select>
        </div>

      </div>

      {/* Drawer */}
      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        onResetFilters={onResetFilters}
      />
    </div>
  );
};
