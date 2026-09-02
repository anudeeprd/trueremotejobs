import { describe, it, expect, beforeEach } from 'vitest';
import { saveJob, unsaveJob, getSavedJobs, isJobSaved, clearSavedJobs } from '../lib/savedJobs';

describe('Saved Jobs Reactive Store', () => {
  beforeEach(() => {
    clearSavedJobs();
  });

  it('starts with empty saved jobs', () => {
    expect(getSavedJobs()).toEqual([]);
  });

  it('saves a job and checks persistence', () => {
    const res = saveJob('job-1');
    expect(res.success).toBe(true);
    expect(res.jobId).toBe('job-1');
    expect(res.alreadySaved).toBe(false);
    expect(res.totalSaved).toBe(1);

    expect(isJobSaved('job-1')).toBe(true);
    const saved = getSavedJobs();
    expect(saved.length).toBe(1);
    expect(saved[0].id).toBe('job-1');
  });

  it('handles saving an already-saved job gracefully', () => {
    saveJob('job-1');
    const res2 = saveJob('job-1');
    expect(res2.success).toBe(true);
    expect(res2.alreadySaved).toBe(true);
    expect(getSavedJobs().length).toBe(1);
  });

  it('unsaves a job', () => {
    saveJob('job-1');
    saveJob('job-2');
    expect(getSavedJobs().length).toBe(2);

    const unsaveRes = unsaveJob('job-1');
    expect(unsaveRes.success).toBe(true);
    expect(unsaveRes.totalSaved).toBe(1);
    expect(isJobSaved('job-1')).toBe(false);
    expect(isJobSaved('job-2')).toBe(true);
  });

  it('clears all saved jobs', () => {
    saveJob('job-1');
    saveJob('job-2');
    saveJob('job-3');
    expect(getSavedJobs().length).toBe(3);

    const clearRes = clearSavedJobs();
    expect(clearRes.success).toBe(true);
    expect(clearRes.count).toBe(3);
    expect(getSavedJobs().length).toBe(0);
  });
});
