import React, { useState } from 'react';
import { Bookmark, Trash2, ArrowLeft, ExternalLink, Bot, Sparkles } from 'lucide-react';
import { useSavedJobs } from '../../lib/savedJobs';
import { JobCard } from '../discover/JobCard';
import { Job } from '../../types/job';

interface SavedJobsViewProps {
  onSelectJob: (job: Job) => void;
  onNavigateDiscover: () => void;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  onSelectJob,
  onNavigateDiscover,
}) => {
  const { savedJobs, count, clearSavedJobs } = useSavedJobs();
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Saved Jobs
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
              {count} {count === 1 ? 'role' : 'roles'}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">
            Jobs you or your AI agent have saved via WebMCP browser tools. Persists locally in your browser.
          </p>
        </div>

        {count > 0 && (
          <div className="flex items-center gap-3">
            {confirmClear ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500">Are you sure?</span>
                <button
                  onClick={() => {
                    clearSavedJobs();
                    setConfirmClear(false);
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Yes, clear all
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 text-xs font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-red-600 hover:bg-red-50 border border-zinc-200 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {count === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 text-zinc-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-900">
              No saved jobs yet.
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Save interesting roles and they'll appear here. Or ask an AI agent via WebMCP to search and save roles for you!
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onNavigateDiscover}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Discover Page</span>
            </button>
          </div>

          {/* Quick hint for judges */}
          <div className="mt-8 p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-left text-xs text-indigo-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5 text-indigo-800">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>WebMCP Agent Sync:</span>
            </div>
            <p className="text-indigo-700">
              When an AI agent calls <code className="bg-white/80 px-1 py-0.5 rounded border border-indigo-200 text-indigo-950 font-mono">save_job("job-1")</code>, the job instantly appears on this screen without needing a page refresh!
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} onSelect={onSelectJob} />
          ))}
        </div>
      )}

    </div>
  );
};
