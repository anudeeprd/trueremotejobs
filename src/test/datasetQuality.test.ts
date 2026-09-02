import { describe, it, expect } from 'vitest';
import { searchJobs } from '../lib/jobSearch';

describe('Dataset Quality Verification for Core Hackathon Demo Scenarios', () => {
  it('measures and asserts multiple credible results for each scenario', () => {
    // Scenario 1: React Native + India + $60K+
    const s1 = searchJobs({
      query: 'React Native',
      candidateCountry: 'India',
      minimumSalary: 60000,
    });

    // Scenario 2: Frontend + $60K+
    const s2 = searchJobs({
      query: 'Frontend',
      minimumSalary: 60000,
    });

    // Scenario 3: Senior Engineering + Series A
    const s3 = searchJobs({
      query: 'Engineer',
      experienceLevel: 'Senior',
      companyStage: 'Series A',
    });

    // Scenario 4: Product Designer + Worldwide
    const s4 = searchJobs({
      query: 'Product Designer',
      remoteRegion: 'Worldwide',
    });

    // Scenario 5: AI Engineer + last 7 days
    const s5 = searchJobs({
      query: 'AI',
      postedWithinDays: 7,
    });

    // Scenario 6: Entry Level + India
    const s6 = searchJobs({
      experienceLevel: 'Entry Level',
      candidateCountry: 'India',
    });

    // Scenario 7: Product Manager + Seed or Series A
    const s7Seed = searchJobs({ query: 'Product Manager', companyStage: 'Seed' });
    const s7SeriesA = searchJobs({ query: 'Product Manager', companyStage: 'Series A' });
    const s7Total = s7Seed.totalMatches + s7SeriesA.totalMatches;

    // Scenario 8: TypeScript + $100K+
    const s8 = searchJobs({
      query: 'TypeScript',
      minimumSalary: 100000,
    });

    console.log('--- DEMO SCENARIO RESULT COUNTS ---');
    console.log(`1. React Native + India + $60K+: ${s1.totalMatches} results`);
    console.log(`2. Frontend + $60K+: ${s2.totalMatches} results`);
    console.log(`3. Senior Engineering + Series A: ${s3.totalMatches} results`);
    console.log(`4. Product Designer + Worldwide: ${s4.totalMatches} results`);
    console.log(`5. AI Engineer + last 7 days: ${s5.totalMatches} results`);
    console.log(`6. Entry Level + India: ${s6.totalMatches} results`);
    console.log(`7. Product Manager + Seed or Series A: ${s7Total} results (Seed: ${s7Seed.totalMatches}, Series A: ${s7SeriesA.totalMatches})`);
    console.log(`8. TypeScript + $100K+: ${s8.totalMatches} results`);
    console.log('-----------------------------------');

    expect(s1.totalMatches).toBeGreaterThanOrEqual(2);
    expect(s2.totalMatches).toBeGreaterThanOrEqual(2);
    expect(s3.totalMatches).toBeGreaterThanOrEqual(2);
    expect(s4.totalMatches).toBeGreaterThanOrEqual(2);
    expect(s5.totalMatches).toBeGreaterThanOrEqual(2);
    expect(s6.totalMatches).toBeGreaterThanOrEqual(2);
    expect(s7Total).toBeGreaterThanOrEqual(2);
    expect(s8.totalMatches).toBeGreaterThanOrEqual(2);
  });
});
