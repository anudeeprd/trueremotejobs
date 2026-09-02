import { describe, it, expect, beforeEach } from 'vitest';
import { ALL_WEBMCP_TOOLS, registerAllWebMCPTools, getWebMCPRegistrationStatus } from '../webmcp/registry';
import { searchJobsTool } from '../webmcp/tools/searchJobs';
import { getJobDetailsTool } from '../webmcp/tools/getJobDetails';
import { compareJobsTool } from '../webmcp/tools/compareJobs';
import { saveJobTool } from '../webmcp/tools/saveJob';
import { unsaveJobTool } from '../webmcp/tools/unsaveJob';
import { getSavedJobsTool } from '../webmcp/tools/getSavedJobs';
import { getFilterOptionsTool } from '../webmcp/tools/getFilterOptions';
import { clearSavedJobs } from '../lib/savedJobs';

describe('WebMCP Tools & Registration', () => {
  beforeEach(() => {
    clearSavedJobs();
  });

  it('exposes exactly 7 WebMCP tools', () => {
    expect(ALL_WEBMCP_TOOLS.length).toBe(7);
    const names = ALL_WEBMCP_TOOLS.map(t => t.name);
    expect(names).toEqual([
      'search_jobs',
      'get_job_details',
      'compare_jobs',
      'save_job',
      'unsave_job',
      'get_saved_jobs',
      'get_filter_options',
    ]);
  });

  it('has comprehensive descriptions and schemas for all tools', () => {
    for (const tool of ALL_WEBMCP_TOOLS) {
      expect(tool.name).toBeTruthy();
      expect(tool.description.length).toBeGreaterThan(20);
      expect(tool.inputSchema.type).toBe('object');
      expect(typeof tool.execute).toBe('function');
    }
  });

  it('executes search_jobs tool for React Native + India + $60k', async () => {
    const result = await searchJobsTool.execute({
      query: 'React Native',
      candidateCountry: 'India',
      minimumSalary: 60000,
    });
    expect(result.totalMatches).toBeGreaterThanOrEqual(1);
    expect(result.jobs.length).toBeGreaterThanOrEqual(1);
    expect(result.jobs[0].title).toContain('React Native');
  });

  it('executes get_job_details tool', async () => {
    const resSuccess = await getJobDetailsTool.execute({ jobId: 'job-1' });
    expect(resSuccess.success).toBe(true);
    expect(resSuccess.job.id).toBe('job-1');
    expect(resSuccess.job.title).toContain('React Native');

    const resError = await getJobDetailsTool.execute({ jobId: 'invalid-id' });
    expect(resError.error).toBe(true);
  });

  it('executes compare_jobs tool', async () => {
    const result = await compareJobsTool.execute({ jobIds: ['job-1', 'job-2', 'job-3'] });
    expect(result.success).toBe(true);
    expect(result.comparisonCount).toBe(3);
    expect(result.matrix[0].id).toBe('job-1');
  });

  it('executes save_job, get_saved_jobs, and unsave_job in sequence', async () => {
    // 1. Initial saved jobs
    const initial = await getSavedJobsTool.execute({});
    expect(initial.totalSaved).toBe(0);

    // 2. Save job-1 and job-3
    const save1 = await saveJobTool.execute({ jobId: 'job-1' });
    expect(save1.success).toBe(true);
    expect(save1.totalSaved).toBe(1);

    const save3 = await saveJobTool.execute({ jobId: 'job-3' });
    expect(save3.success).toBe(true);
    expect(save3.totalSaved).toBe(2);

    // 3. get_saved_jobs
    const savedAfter = await getSavedJobsTool.execute({});
    expect(savedAfter.totalSaved).toBe(2);
    expect(savedAfter.savedJobIds).toContain('job-1');
    expect(savedAfter.savedJobIds).toContain('job-3');

    // 4. Unsave job-1
    const unsave1 = await unsaveJobTool.execute({ jobId: 'job-1' });
    expect(unsave1.success).toBe(true);
    expect(unsave1.totalSaved).toBe(1);

    // 5. Check remaining
    const finalSaved = await getSavedJobsTool.execute({});
    expect(finalSaved.totalSaved).toBe(1);
    expect(finalSaved.savedJobIds).toEqual(['job-3']);
  });

  it('executes get_filter_options tool', async () => {
    const result = await getFilterOptionsTool.execute({});
    expect(result.success).toBe(true);
    expect(result.options.countries).toContain('India');
  });

  it('registers all tools with document.modelContext when present', async () => {
    const registeredTools: any[] = [];
    (document as any).modelContext = {
      registerTool: async (tool: any) => {
        registeredTools.push(tool);
      },
    };

    const status = await registerAllWebMCPTools();
    expect(status.isSupported).toBe(true);
    expect(status.target).toBe('document.modelContext');
    expect(status.toolCount).toBe(7);
    expect(registeredTools.length).toBe(7);

    // Clean up
    delete (document as any).modelContext;
  });
});
