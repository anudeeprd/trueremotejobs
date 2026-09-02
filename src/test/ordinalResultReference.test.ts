import { describe, it, expect } from 'vitest';
import { searchJobs } from '../lib/jobSearch';
import { searchJobsTool } from '../webmcp/tools/searchJobs';
import { getJobDetailsTool } from '../webmcp/tools/getJobDetails';

describe('WebMCP Ordinal Result Reference Regression Test', () => {
  it('proves search response contains stable ordered resultNumber 1, 2, 3 and matching jobIds', async () => {
    // 1. Execute search through WebMCP tool
    const searchResponse = await searchJobsTool.execute({
      query: 'React Native',
      candidateCountry: 'India',
      minimumSalary: 60000,
    });

    // 2. Verify top-level resultReferenceNote metadata exists
    expect(searchResponse.resultReferenceNote).toBeDefined();
    expect(searchResponse.resultReferenceNote).toContain('resultNumber');
    expect(searchResponse.resultReferenceNote).toContain('jobId');

    // 3. Verify total and results alias
    expect(searchResponse.total).toBe(searchResponse.totalMatches);
    expect(searchResponse.results).toBeDefined();
    expect(Array.isArray(searchResponse.results)).toBe(true);
    expect(searchResponse.results.length).toBeGreaterThanOrEqual(3);

    // 4. Verify explicit ordered references for first three results
    const r1 = searchResponse.results[0];
    const r2 = searchResponse.results[1];
    const r3 = searchResponse.results[2];

    expect(r1.resultNumber).toBe(1);
    expect(r2.resultNumber).toBe(2);
    expect(r3.resultNumber).toBe(3);

    // Verify each result has explicit jobId matching canonical id
    expect(r1.jobId).toBeTruthy();
    expect(r1.jobId).toBe(r1.id);
    expect(r2.jobId).toBeTruthy();
    expect(r2.jobId).toBe(r2.id);
    expect(r3.jobId).toBeTruthy();
    expect(r3.jobId).toBe(r3.id);

    // Verify all 3 jobIds are distinct unique jobs
    const uniqueIds = new Set([r1.jobId, r2.jobId, r3.jobId]);
    expect(uniqueIds.size).toBe(3);

    // 5. Verify follow-up ordinal lookup: "show details for the first result" uses r1.jobId
    const firstResultDetails = await getJobDetailsTool.execute({ jobId: r1.jobId });
    expect(firstResultDetails.success).toBe(true);
    expect(firstResultDetails.job.id).toBe(r1.jobId);
    expect(firstResultDetails.job.title).toBe(r1.title);
    expect(firstResultDetails.job.company.name).toBe(r1.company.name);

    // 6. Verify same stability in direct jobSearch library function
    const directSearch = searchJobs({
      query: 'React Native',
      candidateCountry: 'India',
      minimumSalary: 60000,
    });

    expect(directSearch.results[0].resultNumber).toBe(1);
    expect(directSearch.results[0].jobId).toBe(r1.jobId);
    expect(directSearch.results[1].resultNumber).toBe(2);
    expect(directSearch.results[1].jobId).toBe(r2.jobId);
    expect(directSearch.results[2].resultNumber).toBe(3);
    expect(directSearch.results[2].jobId).toBe(r3.jobId);
  });
});
