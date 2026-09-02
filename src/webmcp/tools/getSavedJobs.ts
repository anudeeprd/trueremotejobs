import { WebMCPToolDefinition } from '../../types/webmcp';
import { getSavedJobs } from '../../lib/savedJobs';
import { formatJobSummary } from '../../lib/jobSearch';

export const getSavedJobsTool: WebMCPToolDefinition = {
  name: 'get_saved_jobs',
  description: 'Retrieve the list of all remote jobs currently saved in the user\'s Saved Jobs collection on TrueRemoteJobs. Returns total count, saved IDs, and compact structured details for each saved position.',
  annotations: {
    readOnlyHint: true,
  },
  readOnlyHint: true,
  inputSchema: {
    type: 'object',
    properties: {},
    additionalProperties: false,
  },
  execute: async () => {
    const jobs = getSavedJobs();
    return {
      totalSaved: jobs.length,
      savedJobIds: jobs.map(j => j.id),
      jobs: jobs.map(formatJobSummary),
    };
  },
};
