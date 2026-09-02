import { WebMCPToolDefinition } from '../../types/webmcp';
import { unsaveJob } from '../../lib/savedJobs';

export const unsaveJobTool: WebMCPToolDefinition = {
  name: 'unsave_job',
  description: 'Remove a remote job from the user\'s Saved Jobs list by its jobId (e.g. "job-1"). When the user refers to an ordinal job (such as "remove the first saved job" or "unsave the second one"), use the jobId of that saved job from get_saved_jobs. Immediately removes the job from localStorage and visibly updates the website without a page reload.',
  annotations: {
    readOnlyHint: false,
  },
  readOnlyHint: false,
  inputSchema: {
    type: 'object',
    properties: {
      jobId: {
        type: 'string',
        description: 'The unique identifier of the job to unsave (e.g., "job-1").',
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

    const result = unsaveJob(input.jobId);
    return {
      success: true,
      jobId: result.jobId,
      savedState: 'unsaved',
      totalSaved: result.totalSaved,
      message: `Job ${result.jobId} removed from saved jobs. Remaining saved jobs: ${result.totalSaved}.`,
    };
  },
};
