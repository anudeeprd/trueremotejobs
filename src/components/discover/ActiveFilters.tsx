import React from 'react';
import { X } from 'lucide-react';
import { JobSearchParams } from '../../types/job';

interface ActiveFiltersProps {
  filters: JobSearchParams;
  onRemoveFilter: (key: keyof JobSearchParams) => void;
  onClearAll: () => void;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
}) => {
  const activeChips: { key: keyof JobSearchParams; label: string }[] = [];

  if (filters.query) {
    activeChips.push({ key: 'query', label: `Search: "${filters.query}"` });
  }
  if (filters.candidateCountry) {
    activeChips.push({ key: 'candidateCountry', label: `Eligible: ${filters.candidateCountry}` });
  }
  if (filters.remoteRegion) {
    activeChips.push({ key: 'remoteRegion', label: `Region: ${filters.remoteRegion}` });
  }
  if (filters.minimumSalary) {
    activeChips.push({ key: 'minimumSalary', label: `Min: $${filters.minimumSalary / 1000}k` });
  }
  if (filters.companyStage) {
    activeChips.push({ key: 'companyStage', label: `Stage: ${filters.companyStage}` });
  }
  if (filters.experienceLevel) {
    activeChips.push({ key: 'experienceLevel', label: `Level: ${filters.experienceLevel}` });
  }
  if (filters.employmentType) {
    activeChips.push({ key: 'employmentType', label: `Type: ${filters.employmentType}` });
  }
  if (filters.industry) {
    activeChips.push({ key: 'industry', label: `Industry: ${filters.industry}` });
  }
  if (filters.postedWithinDays) {
    activeChips.push({ key: 'postedWithinDays', label: `Posted: Last ${filters.postedWithinDays}d` });
  }

  if (activeChips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
      <span className="text-zinc-400 font-medium">Applied filters:</span>
      {activeChips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium border border-indigo-200/80"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip.key)}
            className="p-0.5 rounded hover:bg-indigo-200/60 text-indigo-500 hover:text-indigo-800 transition-colors"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs text-zinc-500 hover:text-zinc-800 underline font-medium ml-1"
      >
        Clear all
      </button>
    </div>
  );
};
