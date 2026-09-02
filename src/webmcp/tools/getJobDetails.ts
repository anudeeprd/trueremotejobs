import { WebMCPToolDefinition } from '../../types/webmcp';
import { getJobById } from '../../lib/jobSearch';

export const getJobDetailsTool: WebMCPToolDefinition = {
  name: 'get_job_details',
  description: 'Retrieve comprehensive details for a specific remote job listing by its unique jobId (e.g. "job-1", "job-2"). Returns full company background, salary, equity, remote policy, required & preferred qualifications, responsibilities, tech stack, and benefits.',
  readOnlyHint: true,
  inputSchema: {
    type: 'object',
    properties: {
      jobId: {
        type: 'string',
        description: 'The unique identifier of the job (e.g., "job-1").',
      },
    },
    required: ['jobId'],
  },
  execute: async (input: { jobId?: string }) => {
    if (!input || !input.jobId) {
      return {
        error: true,
        message: 'A valid "jobId" parameter is required (e.g., "job-1").',
      };
    }

    const job = getJobById(input.jobId);
    if (!job) {
      return {
        error: true,
        message: `Job with ID "${input.jobId}" was not found. Please verify the ID using search_jobs.`,
      };
    }

    return {
      success: true,
      job,
    };
  },
};
