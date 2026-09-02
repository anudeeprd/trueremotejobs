import { WebMCPToolDefinition } from '../../types/webmcp';
import { searchJobs } from '../../lib/jobSearch';
import { JobSearchParams } from '../../types/job';

export const searchJobsTool: WebMCPToolDefinition = {
  name: 'search_jobs',
  description: 'Search and filter the TrueRemoteJobs demo catalog for remote job opportunities. Supports filtering by query keywords, job title, skills, candidate-country eligibility (e.g. "India"), remote region (e.g. "APAC", "Worldwide"), employment type, experience level, minimum salary, company stage, industry, timezone, and posting recency (postedWithinDays). Returns an ordered array of matching jobs with explicit "resultNumber" (1, 2, 3...) and "jobId" fields. When users make follow-up requests such as "the first result", "the second one", "compare the first three", or "save the first and third", use the jobId associated with that resultNumber from the returned results array.',
  annotations: {
    readOnlyHint: true,
  },
  readOnlyHint: true,
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Free-text keyword search across role title, company name, description, required skills, and tech stack (e.g., "React Native", "AI Engineer", "Fintech").',
      },
      jobTitle: {
        type: 'string',
        description: 'Specific job title to match (e.g., "React Native", "Frontend Engineer", "Product Manager").',
      },
      skills: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of required or preferred skills to filter by (e.g., ["React Native", "TypeScript"]).',
      },
      candidateCountry: {
        type: 'string',
        description: 'Filter jobs allowing applicants from a specific country (e.g., "India", "United States", "Germany"). Note that worldwide jobs are automatically included.',
      },
      remoteRegion: {
        type: 'string',
        description: 'Filter jobs by allowed remote geographic region (e.g., "Worldwide", "APAC", "EMEA", "Americas", "Europe").',
      },
      employmentType: {
        type: 'string',
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        description: 'Employment type filter.',
      },
      experienceLevel: {
        type: 'string',
        enum: ['Intern', 'Entry Level', 'Junior', 'Mid Level', 'Senior', 'Staff', 'Lead', 'Manager', 'Director'],
        description: 'Target experience level.',
      },
      minimumSalary: {
        type: 'number',
        minimum: 0,
        description: 'Minimum acceptable annual salary in USD (e.g., 60000).',
      },
      companyStage: {
        type: 'string',
        enum: ['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Public'],
        description: 'Startup or company funding stage.',
      },
      industry: {
        type: 'string',
        description: 'Company industry (e.g., "AI", "Developer Tools", "Fintech", "Cybersecurity", "Productivity").',
      },
      postedWithinDays: {
        type: 'number',
        minimum: 1,
        description: 'Only return jobs posted within the specified number of days (e.g., 7 for the last week).',
      },
      timezone: {
        type: 'string',
        description: 'Filter by timezone requirements or overlap (e.g., "UTC", "flexible").',
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 50,
        description: 'Maximum number of jobs to return in this search batch (default 10).',
      },
      sortBy: {
        type: 'string',
        enum: ['newest', 'salary_desc', 'salary_asc', 'relevance'],
        description: 'Sorting criterion for results.',
      }
    },
    additionalProperties: false,
  },
  execute: async (input: JobSearchParams = {}) => {
    // Default limit to 10 for AI agent consumption unless requested otherwise
    const limit = input.limit && input.limit > 0 ? input.limit : 10;
    const results = searchJobs({ ...input, limit });
    return results;
  },
};
