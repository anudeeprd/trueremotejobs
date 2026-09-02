import { WebMCPToolDefinition } from '../../types/webmcp';
import { compareJobs } from '../../lib/jobSearch';

export const compareJobsTool: WebMCPToolDefinition = {
  name: 'compare_jobs',
  description: 'Compare 2 to 5 remote jobs side-by-side using their jobIds (e.g. ["job-1", "job-2", "job-3"]). Returns a structured comparison matrix of salary, remote eligibility, tech stack, required & preferred skills, company stage, benefits, and experience level. When the user refers to ordinal search results (e.g. "compare the first three", "compare the best three"), use the jobIds corresponding to resultNumber 1, 2, 3, etc. from the most recent search_jobs results.',
  annotations: {
    readOnlyHint: true,
  },
  readOnlyHint: true,
  inputSchema: {
    type: 'object',
    properties: {
      jobIds: {
        type: 'array',
        items: { type: 'string' },
        minItems: 2,
        maxItems: 5,
        description: 'An array of 2 to 5 job IDs to compare (e.g., ["job-1", "job-2", "job-3"]).',
      },
    },
    required: ['jobIds'],
    additionalProperties: false,
  },
  execute: async (input: { jobIds?: string[] }) => {
    if (!input || !Array.isArray(input.jobIds) || input.jobIds.length === 0) {
      return {
        error: true,
        message: 'An array of job IDs is required under "jobIds" (e.g., ["job-1", "job-2"]).',
      };
    }

    if (input.jobIds.length > 5) {
      input.jobIds = input.jobIds.slice(0, 5);
    }

    const comparison = compareJobs(input.jobIds);
    return {
      success: true,
      comparisonCount: comparison.count,
      matrix: comparison.jobs,
    };
  },
};
