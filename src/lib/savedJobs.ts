import { useState, useEffect } from 'react';
import { getRawJobById } from '../data/jobs';
import { Job } from '../types/job';

const STORAGE_KEY = 'trueremotejobs_saved_job_ids_v1';
const EVENT_KEY = 'trueremotejobs:saved-updated';

/**
 * Returns array of saved job IDs from localStorage
 */
export function getSavedJobIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse saved jobs from localStorage', e);
    return [];
  }
}

/**
 * Returns full Job objects for all currently saved IDs
 */
export function getSavedJobs(): Job[] {
  const ids = getSavedJobIds();
  const jobs: Job[] = [];
  for (const id of ids) {
    const job = getRawJobById(id);
    if (job) {
      jobs.push(job);
    }
  }
  return jobs;
}

/**
 * Checks if a job ID is currently saved
 */
export function isJobSaved(jobId: string): boolean {
  const ids = getSavedJobIds();
  return ids.includes(jobId);
}

/**
 * Dispatches an event to notify all React components of state changes
 */
function notifyUpdate(updatedIds: string[]) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: { ids: updatedIds } }));
  }
}

/**
 * Saves a job by ID.
 * Synchronously writes to localStorage and triggers real-time UI notification.
 */
export function saveJob(jobId: string): {
  success: boolean;
  jobId: string;
  jobTitle?: string;
  company?: string;
  alreadySaved: boolean;
  totalSaved: number;
} {
  const job = getRawJobById(jobId);
  if (!job) {
    return {
      success: false,
      jobId,
      alreadySaved: false,
      totalSaved: getSavedJobIds().length,
    };
  }

  const current = getSavedJobIds();
  if (current.includes(jobId)) {
    return {
      success: true,
      jobId,
      jobTitle: job.title,
      company: job.company.name,
      alreadySaved: true,
      totalSaved: current.length,
    };
  }

  const updated = [jobId, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to write to localStorage', e);
  }

  notifyUpdate(updated);

  return {
    success: true,
    jobId,
    jobTitle: job.title,
    company: job.company.name,
    alreadySaved: false,
    totalSaved: updated.length,
  };
}

/**
 * Removes a job from saved jobs.
 */
export function unsaveJob(jobId: string): {
  success: boolean;
  jobId: string;
  totalSaved: number;
} {
  const current = getSavedJobIds();
  const updated = current.filter(id => id !== jobId);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update localStorage', e);
  }

  notifyUpdate(updated);

  return {
    success: true,
    jobId,
    totalSaved: updated.length,
  };
}

/**
 * Clears all saved jobs
 */
export function clearSavedJobs(): { success: boolean; count: number } {
  const count = getSavedJobIds().length;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear localStorage', e);
  }
  notifyUpdate([]);
  return { success: true, count };
}

/**
 * Subscribes to saved jobs changes
 */
export function subscribeToSavedJobs(callback: (ids: string[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail && Array.isArray(detail.ids)) {
      callback(detail.ids);
    } else {
      callback(getSavedJobIds());
    }
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getSavedJobIds());
    }
  };

  window.addEventListener(EVENT_KEY, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(EVENT_KEY, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
}

/**
 * React hook to reactively track saved jobs in any component
 */
export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>(() => getSavedJobIds());

  useEffect(() => {
    // Initial sync
    setSavedIds(getSavedJobIds());

    const unsubscribe = subscribeToSavedJobs((newIds) => {
      setSavedIds(newIds);
    });

    return unsubscribe;
  }, []);

  const savedJobs = savedIds
    .map(id => getRawJobById(id))
    .filter((j): j is Job => j !== undefined);

  return {
    savedIds,
    savedJobs,
    count: savedIds.length,
    isSaved: (id: string) => savedIds.includes(id),
    saveJob,
    unsaveJob,
    clearSavedJobs,
  };
}
