import { describe, it, expect, beforeEach } from 'vitest';
import { searchJobsTool } from '../webmcp/tools/searchJobs';
import { getJobDetailsTool } from '../webmcp/tools/getJobDetails';
import { compareJobsTool } from '../webmcp/tools/compareJobs';
import { saveJobTool } from '../webmcp/tools/saveJob';
import { unsaveJobTool } from '../webmcp/tools/unsaveJob';
import { getSavedJobsTool } from '../webmcp/tools/getSavedJobs';
import { clearSavedJobs, isJobSaved, getSavedJobIds, subscribeToSavedJobs } from '../lib/savedJobs';

describe('Hackathon Judge End-to-End Demonstration Sequence', () => {
  beforeEach(() => {
    clearSavedJobs();
  });

  it('executes the full judge demonstration script flawlessly', async () => {
    // 0. Verify starts with NO saved jobs and setup subscriber to track UI reactivity
    expect(getSavedJobIds()).toEqual([]);
    const observedCounts: number[] = [0];
    const unsubscribe = subscribeToSavedJobs((ids) => {
      observedCounts.push(ids.length);
    });

    // 1. Agent asks: "Find remote React Native jobs open to candidates from India paying at least $60,000."
    const searchResult = await searchJobsTool.execute({
      query: 'React Native',
      candidateCountry: 'India',
      minimumSalary: 60000,
    });

    expect(searchResult.totalMatches).toBeGreaterThanOrEqual(3);
    const firstJob = searchResult.jobs[0];
    const secondJob = searchResult.jobs[1];
    const thirdJob = searchResult.jobs[2];

    expect(firstJob).toBeDefined();
    expect(secondJob).toBeDefined();
    expect(thirdJob).toBeDefined();
    expect(firstJob.title).toContain('React Native');
    expect(firstJob.salary.min).toBeGreaterThanOrEqual(60000);

    // 2. Agent asks: "Show me full details for the first one."
    const detailsResult = await getJobDetailsTool.execute({ jobId: firstJob.id });
    expect(detailsResult.success).toBe(true);
    expect(detailsResult.job.id).toBe(firstJob.id);
    expect(detailsResult.job.title).toBe(firstJob.title);
    expect(detailsResult.job.responsibilities.length).toBeGreaterThan(0);
    expect(detailsResult.job.requirements.length).toBeGreaterThan(0);

    // 3. Agent asks: "Compare the best three."
    const compareResult = await compareJobsTool.execute({
      jobIds: [firstJob.id, secondJob.id, thirdJob.id],
    });
    expect(compareResult.success).toBe(true);
    expect(compareResult.comparisonCount).toBe(3);
    expect(compareResult.matrix.length).toBe(3);
    expect(compareResult.matrix[0].id).toBe(firstJob.id);
    expect(compareResult.matrix[1].id).toBe(secondJob.id);
    expect(compareResult.matrix[2].id).toBe(thirdJob.id);

    // 4. Agent asks: "Save the first and third."
    const saveFirstResult = await saveJobTool.execute({ jobId: firstJob.id });
    expect(saveFirstResult.success).toBe(true);
    expect(saveFirstResult.totalSaved).toBe(1);
    expect(isJobSaved(firstJob.id)).toBe(true);

    const saveThirdResult = await saveJobTool.execute({ jobId: thirdJob.id });
    expect(saveThirdResult.success).toBe(true);
    expect(saveThirdResult.totalSaved).toBe(2);
    expect(isJobSaved(thirdJob.id)).toBe(true);

    // 5. Agent asks: "What jobs have I saved?"
    const savedJobsResult = await getSavedJobsTool.execute({});
    expect(savedJobsResult.totalSaved).toBe(2);
    expect(savedJobsResult.savedJobIds).toEqual([thirdJob.id, firstJob.id]);
    expect(savedJobsResult.jobs.length).toBe(2);

    // 6. Agent asks: "Remove the first saved job."
    const unsaveResult = await unsaveJobTool.execute({ jobId: firstJob.id });
    expect(unsaveResult.success).toBe(true);
    expect(unsaveResult.totalSaved).toBe(1);
    expect(isJobSaved(firstJob.id)).toBe(false);
    expect(isJobSaved(thirdJob.id)).toBe(true);

    // 7. Verify final saved count is 1
    const finalSavedCheck = await getSavedJobsTool.execute({});
    expect(finalSavedCheck.totalSaved).toBe(1);
    expect(finalSavedCheck.savedJobIds).toEqual([thirdJob.id]);

    // 8. Verify the React UI observed the state mutations immediately (0 -> 1 -> 2 -> 1)
    expect(observedCounts).toEqual([0, 1, 2, 1]);
    unsubscribe();
  });
});
