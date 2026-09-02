import { WebMCPToolDefinition } from '../../types/webmcp';
import { getSavedJobs } from '../../lib/savedJobs';
import { formatJobSummary } from '../../lib/jobSearch';

export const getSavedJobsTool: WebMCPToolDefinition = {
  name: 'get_saved_jobs',
  description: 'Retrieve the list of all remote jobs currently saved in the user\'s Saved Jobs collection on TrueRemoteJobs. Returns total count and compact structured details for each saved position.',
  readOnlyHint: true,
  inputSchema: {
    type: 'object',
    properties: {},
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
