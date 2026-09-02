import { describe, it, expect } from 'vitest';
import { searchJobs, getJobById, compareJobs, getFilterOptions } from '../lib/jobSearch';
import { JOBS } from '../data/jobs';

describe('Job Search Engine', () => {
  it('loads approximately 200 deterministic jobs', () => {
    expect(JOBS.length).toBeGreaterThanOrEqual(150);
    expect(JOBS.length).toBeLessThanOrEqual(250);
  });

  it('retrieves a job by ID', () => {
    const job = getJobById('job-1');
    expect(job).toBeDefined();
    expect(job?.title).toContain('React Native');
    expect(job?.company.name).toBe('NovaStack');
  });

  it('returns null for non-existent job ID', () => {
    const job = getJobById('job-9999');
    expect(job).toBeNull();
  });

  it('Scenario 1: Find React Native jobs open to India paying at least $60,000', () => {
    const results = searchJobs({
      query: 'React Native',
      candidateCountry: 'India',
      minimumSalary: 60000,
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(3);
    results.jobs.forEach(job => {
      expect(job.title.toLowerCase()).toContain('react native');
      expect(job.salary.min).toBeGreaterThanOrEqual(60000);
      const isWorldwideOrIndia = job.remoteEligibility.worldwide || job.remoteEligibility.allowedCountries.includes('India');
      expect(isWorldwideOrIndia).toBe(true);
    });
  });

  it('Scenario 2: Find remote frontend jobs paying at least $60K', () => {
    const results = searchJobs({
      query: 'Frontend',
      minimumSalary: 60000,
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(1);
    results.jobs.forEach(job => {
      expect(job.salary.min).toBeGreaterThanOrEqual(60000);
    });
  });

  it('Scenario 3: Find senior engineering positions at Series A startups', () => {
    const results = searchJobs({
      experienceLevel: 'Senior',
      companyStage: 'Series A',
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(1);
    results.jobs.forEach(job => {
      expect(job.experienceLevel).toBe('Senior');
      expect(job.company.stage).toBe('Series A');
    });
  });

  it('Scenario 4: Find product designer jobs open worldwide', () => {
    const results = searchJobs({
      query: 'Product Designer',
      remoteRegion: 'Worldwide',
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(1);
    results.jobs.forEach(job => {
      expect(job.remoteEligibility.worldwide).toBe(true);
    });
  });

  it('Scenario 5: Find AI engineering jobs posted during the last 7 days', () => {
    const results = searchJobs({
      query: 'AI',
      postedWithinDays: 7,
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(1);
  });

  it('Scenario 6: Find entry-level remote jobs open to candidates in India', () => {
    const results = searchJobs({
      experienceLevel: 'Entry Level',
      candidateCountry: 'India',
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(1);
    results.jobs.forEach(job => {
      expect(job.experienceLevel).toBe('Entry Level');
    });
  });

  it('Scenario 7: Find remote product manager jobs at Seed or Series A startups', () => {
    const resultsSeed = searchJobs({ query: 'Product Manager', companyStage: 'Seed' });
    const resultsSeriesA = searchJobs({ query: 'Product Manager', companyStage: 'Series A' });
    expect(resultsSeed.totalMatches + resultsSeriesA.totalMatches).toBeGreaterThanOrEqual(1);
  });

  it('Scenario 8: Find TypeScript engineering jobs paying above $100K', () => {
    const results = searchJobs({
      query: 'TypeScript',
      minimumSalary: 100000,
    });
    expect(results.totalMatches).toBeGreaterThanOrEqual(1);
    results.jobs.forEach(job => {
      expect(job.salary.usdEquivalent).toBeGreaterThanOrEqual(100000);
    });
  });

  it('compares jobs correctly side-by-side', () => {
    const comparison = compareJobs(['job-1', 'job-2', 'job-3']);
    expect(comparison.count).toBe(3);
    expect(comparison.jobs[0].id).toBe('job-1');
    expect(comparison.jobs[1].id).toBe('job-2');
    expect(comparison.jobs[2].id).toBe('job-3');
    expect(comparison.jobs[0].requiredSkills.length).toBeGreaterThan(0);
  });

  it('returns comprehensive filter options', () => {
    const options = getFilterOptions();
    expect(options.companyStages).toContain('Series A');
    expect(options.countries).toContain('India');
    expect(options.skills).toContain('React Native');
    expect(options.experienceLevels).toContain('Senior');
  });
});
