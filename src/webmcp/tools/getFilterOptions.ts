import { WebMCPToolDefinition } from '../../types/webmcp';
import { getFilterOptions } from '../../lib/jobSearch';

export const getFilterOptionsTool: WebMCPToolDefinition = {
  name: 'get_filter_options',
  description: 'Discover available search facets and valid filter criteria across the TrueRemoteJobs catalog, including valid industries, company stages, experience levels, employment types, countries, regions, and popular skills.',
  readOnlyHint: true,
  inputSchema: {
    type: 'object',
    properties: {},
  },
  execute: async () => {
    return {
      success: true,
      options: getFilterOptions(),
    };
  },
};
