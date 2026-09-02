import { WebMCPToolDefinition } from '../../types/webmcp';
import { saveJob } from '../../lib/savedJobs';

export const saveJobTool: WebMCPToolDefinition = {
  name: 'save_job',
  description: 'Save a remote job to the user\'s Saved Jobs list by its jobId (e.g., "job-1"). Persists the job in localStorage and immediately updates the website\'s visible Saved Jobs count and view without requiring a page reload.',
  annotations: {
    readOnlyHint: false,
  },
  readOnlyHint: false,
  inputSchema: {
    type: 'object',
    properties: {
      jobId: {
        type: 'string',
        description: 'The unique identifier of the job to save (e.g., "job-1").',
      },
    },
    required: ['jobId'],
    additionalProperties: false,
  },
  execute: async (input: { jobId?: string }) => {
    if (!input || !input.jobId) {
      return {
        success: false,
        error: true,
        message: 'A valid "jobId" parameter is required (e.g., "job-1").',
      };
    }

    const result = saveJob(input.jobId);
    if (!result.success) {
      return {
        success: false,
        jobId: input.jobId,
        message: `Job with ID "${input.jobId}" could not be found to save.`,
      };
    }

    return {
      success: true,
      jobId: result.jobId,
      jobTitle: result.jobTitle,
      company: result.company,
      alreadySaved: result.alreadySaved,
      totalSaved: result.totalSaved,
      savedState: 'saved',
      message: result.alreadySaved 
        ? `Job "${result.jobTitle}" at ${result.company} is already in your saved list.`
        : `Successfully saved "${result.jobTitle}" at ${result.company}. Total saved jobs: ${result.totalSaved}.`,
    };
  },
};
