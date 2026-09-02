import React from 'react';
import { Bookmark, MapPin, DollarSign, Briefcase, Clock, Sparkles } from 'lucide-react';
import { Job } from '../../types/job';
import { useSavedJobs } from '../../lib/savedJobs';
import { getRelativeTime, formatSalary } from '../../lib/dateUtils';

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelect }) => {
  const { isSaved, saveJob, unsaveJob } = useSavedJobs();
  const saved = isSaved(job.id);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const isIndiaEligible = job.remote.worldwide || job.remote.allowedCountries.includes('India');

  return (
    <div
      onClick={() => onSelect(job)}
      className={`group relative bg-white rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        saved
          ? 'border-indigo-200/90 shadow-sm bg-gradient-to-b from-indigo-50/20 to-white'
          : 'border-zinc-200/80 hover:border-zinc-300 hover:shadow-card-hover'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        
        {/* Left: Avatar + Title info */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          {/* Company Logo Avatar */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm transition-transform group-hover:scale-105"
            style={{ backgroundColor: job.company.badgeBg || '#4F46E5' }}
          >
            {job.company.logo || job.company.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-base text-zinc-900 group-hover:text-indigo-600 transition-colors truncate">
                {job.title}
              </h3>
              {job.featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                  Featured
                </span>
              )}
            </div>

            {/* Company name & stage */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 flex-wrap">
              <span className="font-medium text-zinc-900">{job.company.name}</span>
              <span className="text-zinc-300">·</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium text-[11px]">
                {job.company.companyStage}
              </span>
              <span className="text-zinc-300">·</span>
              <span>{job.company.employeeCount} employees</span>
            </div>
          </div>
        </div>

        {/* Right: Save Bookmark Button */}
        <button
          onClick={handleBookmarkToggle}
          title={saved ? 'Remove from saved jobs' : 'Save job'}
          aria-label={saved ? `Unsave ${job.title}` : `Save ${job.title}`}
          className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            saved
              ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-indigo-600 text-indigo-600' : ''}`} />
        </button>
      </div>

      {/* Middle Tags & Meta Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-zinc-600 border-t border-zinc-100 pt-3.5">
        
        {/* Remote & Location Eligibility */}
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          <span className="truncate">
            {job.remote.worldwide ? (
              <span className="font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                Remote Worldwide
              </span>
            ) : (
              <span className="font-medium text-zinc-700">
                Remote ({job.remote.allowedRegions.join(', ')})
              </span>
            )}
          </span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          <span className="font-semibold text-zinc-900">
            {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          </span>
          <span className="text-zinc-400">/ yr</span>
        </div>

        {/* Experience & Type */}
        <div className="flex items-center gap-1.5 sm:col-span-2 lg:col-span-1">
          <Briefcase className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
          <span className="text-zinc-700">
            {job.experienceLevel} · {job.employmentType}
          </span>
        </div>
      </div>

      {/* Skills pills & India eligibility badge */}
      <div className="mt-3.5 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {job.skills.required.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700 text-xs font-medium transition-colors"
            >
              {skill}
            </span>
          ))}
          {job.skills.required.length > 3 && (
            <span className="text-[11px] text-zinc-400 font-medium">
              +{job.skills.required.length - 3} more
            </span>
          )}

          {isIndiaEligible && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
              🇮🇳 India eligible
            </span>
          )}
        </div>

        {/* Relative date */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
          <Clock className="w-3 h-3" />
          <span>{getRelativeTime(job.postedDate)}</span>
        </div>
      </div>
    </div>
  );
};
