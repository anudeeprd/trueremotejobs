import { Job } from '../types/job';
import { generateDeterministicJobs } from './generator';

// Canonical dataset of 200 high-quality fictional remote jobs
export const JOBS: Job[] = generateDeterministicJobs();

// Pre-indexed map by ID for O(1) fast lookup
export const JOBS_BY_ID: Map<string, Job> = new Map(
  JOBS.map(job => [job.id, job])
);

export function getRawJobById(id: string): Job | undefined {
  return JOBS_BY_ID.get(id);
}
