import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Clock, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Layers, 
  AlertCircle 
} from 'lucide-react';
import { Job } from '../../types/job';
import { useSavedJobs } from '../../lib/savedJobs';
import { getRelativeTime, formatSalary } from '../../lib/dateUtils';

interface JobDetailDrawerProps {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({ job, onClose }) => {
  const { isSaved, saveJob, unsaveJob } = useSavedJobs();
  const [showDemoApplyModal, setShowDemoApplyModal] = useState(false);

  if (!job) return null;

  const saved = isSaved(job.id);

  const handleSaveToggle = () => {
    if (saved) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-16">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col h-full">
          
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="px-2 py-0.5 rounded bg-zinc-100 font-medium text-zinc-700">
                ID: {job.id}
              </span>
              {job.verifiedDemoCompany && (
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-sans font-medium text-[11px] border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Demo Role
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToggle}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  saved
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                <span>{saved ? 'Saved' : 'Save Job'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8">
            
            {/* Title & Company Header */}
            <div>
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: job.company.badgeBg || '#4F46E5' }}
                >
                  {job.company.logo || job.company.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight">
                      {job.title}
                    </h1>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-600 flex-wrap">
                    <span className="font-semibold text-zinc-900">{job.company.name}</span>
                    <span className="text-zinc-300">·</span>
                    <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium text-xs">
                      {job.company.companyStage}
                    </span>
                    <span className="text-zinc-300">·</span>
                    <span className="text-zinc-500 text-xs">{job.company.industry}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fictional disclaimer badge */}
            <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Demo job data</p>
                <p className="text-amber-800 mt-0.5">
                  Positions shown are fictional and created for this WebMCP prototype. No real application will be submitted.
                </p>
              </div>
            </div>

            {/* Primary Snapshot Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              {/* Salary */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Salary Range</span>
                </div>
                <div className="font-bold text-zinc-900 text-sm sm:text-base">
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                </div>
                <div className="text-[11px] text-zinc-400">USD per year</div>
              </div>

              {/* Remote Policy */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                  <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Location</span>
                </div>
                <div className="font-bold text-zinc-900 text-sm sm:text-base truncate">
                  {job.remote.worldwide ? 'Worldwide' : job.remote.allowedRegions.join(', ')}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium truncate">
                  {job.remote.worldwide || job.remote.allowedCountries.includes('India') ? '🇮🇳 India Eligible' : 'Regional Match'}
                </div>
              </div>

              {/* Experience */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Role Level</span>
                </div>
                <div className="font-bold text-zinc-900 text-sm sm:text-base">
                  {job.experienceLevel}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {job.minimumYearsExperience}+ years exp
                </div>
              </div>

            </div>

            {/* Remote Eligibility Details Banner */}
            <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                Remote Geographic Eligibility & Timezone
              </h3>
              <div className="text-xs text-zinc-700 space-y-1.5">
                <p>
                  <strong className="text-zinc-900">Allowed Countries:</strong>{' '}
                  {job.remote.worldwide ? (
                    <span className="text-emerald-700 font-medium">Any country worldwide (Fully Global)</span>
                  ) : (
                    job.remote.allowedCountries.join(', ')
                  )}
                </p>
                <p>
                  <strong className="text-zinc-900">Allowed Regions:</strong> {job.remote.allowedRegions.join(', ')}
                </p>
                <p>
                  <strong className="text-zinc-900">Timezone Policy:</strong> {job.remote.timezone} ({job.remote.timezoneOverlapHours}h daily team overlap required)
                </p>
                {job.visaSponsorship && (
                  <p className="text-indigo-700 font-medium">✓ Visa sponsorship available</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider text-zinc-500">
                About the Role
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                Required Qualifications
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 flex-shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                  Nice to Have
                </h3>
                <ul className="space-y-2">
                  {job.niceToHave.map((nice, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 flex-shrink-0 mt-2" />
                      <span>{nice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack & Skills */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.required.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-medium"
                  >
                    {skill} (Required)
                  </span>
                ))}
                {job.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                Perks & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                {job.benefits.map((benefit, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/60 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About Company */}
            <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2 text-xs text-zinc-600">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-zinc-900 text-sm flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-zinc-500" />
                  About {job.company.name}
                </h4>
                <span className="text-zinc-400">Headquarters: {job.company.headquarters}</span>
              </div>
              <p className="text-zinc-600 leading-relaxed">
                {job.company.description}
              </p>
              <div className="flex items-center gap-4 pt-1 font-medium text-zinc-700">
                <span>Stage: {job.company.companyStage}</span>
                <span>Team: {job.company.employeeCount}</span>
                {job.company.fundingRaised && (
                  <span>Funding: {job.company.fundingRaised}</span>
                )}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-2 text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Posted: {getRelativeTime(job.postedDate)} ({new Date(job.postedDate).toLocaleDateString()})</span>
              <span>Deadline: {job.applicationDeadline || 'Rolling'}</span>
            </div>

          </div>

          {/* Drawer Footer Action Buttons */}
          <div className="p-4 sm:p-5 border-t border-zinc-200 bg-white flex items-center justify-between gap-4 sticky bottom-0 z-10 shadow-lg">
            <button
              onClick={handleSaveToggle}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:bg-zinc-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-indigo-600 text-indigo-600' : ''}`} />
              <span>{saved ? 'Saved in Collection' : 'Save Job'}</span>
            </button>

            <button
              onClick={() => setShowDemoApplyModal(true)}
              className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Apply on Company Site</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Demo Apply Warning Notice Modal */}
      {showDemoApplyModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-zinc-900">
                Demonstration Job Listing
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                This is demonstration data. No real application will be submitted.
              </p>
              <p className="text-xs text-zinc-400">
                TrueRemoteJobs positions are high-quality fictional records created specifically to showcase browser WebMCP AI agent tool integration.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setShowDemoApplyModal(false)}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Got it, close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
