import React, { useState, useMemo } from 'react';
import { Sparkles, SearchX, RotateCcw } from 'lucide-react';
import { Job, JobSearchParams } from '../../types/job';
import { searchJobs, getJobById } from '../../lib/jobSearch';
import { JobCard } from './JobCard';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { ActiveFilters } from './ActiveFilters';

interface DiscoverViewProps {
  onSelectJob: (job: Job) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({ onSelectJob }) => {
  const [filters, setFilters] = useState<JobSearchParams>({
    limit: 40,
    sortBy: 'newest',
  });

  const searchResults = useMemo(() => {
    return searchJobs(filters);
  }, [filters]);

  // Convert search results to full Job objects for cards
  const displayedJobs = useMemo(() => {
    return searchResults.jobs
      .map(item => getJobById(item.id))
      .filter((j): j is Job => j !== null);
  }, [searchResults]);

  const handleQueryChange = (val: string) => {
    setFilters(prev => ({
      ...prev,
      query: val.trim() ? val : undefined,
    }));
  };

  const handleQuickSearch = (query: string, extras?: Record<string, any>) => {
    setFilters(prev => ({
      ...prev,
      query: query || prev.query,
      ...(extras || {}),
    }));
  };

  const handleRemoveFilter = (key: keyof JobSearchParams) => {
    setFilters(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      limit: 40,
      sortBy: 'newest',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4 sm:pt-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          Find remote work <span className="text-indigo-600 underline decoration-indigo-200 decoration-wavy underline-offset-8">without the noise.</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          Search remote opportunities by role, candidate country eligibility, salary, skills, timezone, and company stage. Powered by structured WebMCP browser discovery.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-3xl mx-auto">
        <SearchBar
          value={filters.query || ''}
          onChange={handleQueryChange}
          onQuickSearch={handleQuickSearch}
        />
      </div>

      {/* Filter Bar & Active Filter Chips */}
      <div className="space-y-3 bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-2xs">
        <FilterBar
          filters={filters}
          onUpdateFilters={setFilters}
          onResetFilters={handleResetFilters}
          totalResults={searchResults.totalMatches}
        />
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleResetFilters}
        />
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
        <div>
          Showing <strong className="text-zinc-900 font-semibold">{displayedJobs.length}</strong> of{' '}
          <strong className="text-zinc-900 font-semibold">{searchResults.totalMatches}</strong> remote roles
        </div>
        <div className="hidden sm:block text-zinc-400">
          Click any card for comprehensive job details & requirements
        </div>
      </div>

      {/* Jobs Grid or Empty State */}
      {displayedJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
            <SearchX className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900">
              No remote jobs match those filters.
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Try widening your location, salary, or experience filters.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedJobs.map((job) => (
            <JobCard key={job.id} job={job} onSelect={onSelectJob} />
          ))}
        </div>
      )}

    </div>
  );
};
