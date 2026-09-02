import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { JobSearchParams, CompanyStage, ExperienceLevel, EmploymentType } from '../../types/job';
import { getFilterOptions } from '../../lib/jobSearch';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: JobSearchParams;
  onUpdateFilters: (filters: JobSearchParams) => void;
  onResetFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const options = getFilterOptions();

  const handleFieldChange = (key: keyof JobSearchParams, value: any) => {
    onUpdateFilters({
      ...filters,
      [key]: value === '' || value === 'all' ? undefined : value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/70">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-zinc-900">Filter Remote Jobs</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            
            {/* Candidate Country Eligibility */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Candidate Country Eligibility
              </label>
              <select
                value={filters.candidateCountry || ''}
                onChange={(e) => handleFieldChange('candidateCountry', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Any Country (or Worldwide)</option>
                <option value="India">🇮🇳 India Eligible</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Singapore">🇸🇬 Singapore</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="Brazil">🇧🇷 Brazil</option>
              </select>
              <p className="mt-1 text-[11px] text-zinc-400">
                Worldwide remote positions are always included regardless of country selected.
              </p>
            </div>

            {/* Remote Region */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Remote Region
              </label>
              <select
                value={filters.remoteRegion || ''}
                onChange={(e) => handleFieldChange('remoteRegion', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Any Remote Region</option>
                <option value="Worldwide">Worldwide Only</option>
                <option value="APAC">APAC (Asia-Pacific)</option>
                <option value="EMEA">EMEA (Europe, Middle East, Africa)</option>
                <option value="Americas">Americas</option>
                <option value="Europe">Europe Only</option>
              </select>
            </div>

            {/* Minimum Salary */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Minimum Annual Salary (USD)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 40000, 60000, 80000, 100000, 120000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleFieldChange('minimumSalary', amount === 0 ? undefined : amount)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                      (filters.minimumSalary || 0) === amount
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {amount === 0 ? 'Any' : `$${amount / 1000}k+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Stage */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Company Stage
              </label>
              <select
                value={filters.companyStage || ''}
                onChange={(e) => handleFieldChange('companyStage', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Stages</option>
                {options.companyStages.map((stg) => (
                  <option key={stg} value={stg}>{stg}</option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Experience Level
              </label>
              <select
                value={filters.experienceLevel || ''}
                onChange={(e) => handleFieldChange('experienceLevel', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Experience Levels</option>
                {options.experienceLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Employment Type
              </label>
              <select
                value={filters.employmentType || ''}
                onChange={(e) => handleFieldChange('employmentType', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Types</option>
                {options.employmentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Industry
              </label>
              <select
                value={filters.industry || ''}
                onChange={(e) => handleFieldChange('industry', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Industries</option>
                {options.industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Recency / Posted Within Days */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                Date Posted
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Any time', days: undefined },
                  { label: 'Past 24 hours', days: 1 },
                  { label: 'Past 7 days', days: 7 },
                  { label: 'Past 14 days', days: 14 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleFieldChange('postedWithinDays', item.days)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                      filters.postedWithinDays === item.days
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Buttons */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3">
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Apply Filters
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
