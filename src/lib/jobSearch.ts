import { JOBS, getRawJobById } from '../data/jobs';
import { 
  Job, 
  JobSearchParams, 
  JobSearchResponse, 
  JobSearchResultItem, 
  JobComparisonItem, 
  FilterOptions,
  CompanyStage,
  ExperienceLevel,
  EmploymentType
} from '../types/job';
import { getRelativeTime, formatSalary } from './dateUtils';

/**
 * Transforms full Job into compact agent/search-friendly item
 */
export function formatJobSummary(job: Job): JobSearchResultItem {
  return {
    id: job.id,
    title: job.title,
    company: {
      name: job.company.name,
      stage: job.company.companyStage,
      industry: job.company.industry,
      headquarters: job.company.headquarters,
      employeeCount: job.company.employeeCount,
    },
    salary: {
      min: job.salary.min,
      max: job.salary.max,
      currency: job.salary.currency,
      display: formatSalary(job.salary.min, job.salary.max, job.salary.currency),
      usdEquivalent: job.salary.salaryUsdEquivalent,
    },
    remoteEligibility: {
      worldwide: job.remote.worldwide,
      allowedCountries: job.remote.allowedCountries,
      allowedRegions: job.remote.allowedRegions,
      timezone: job.remote.timezone,
    },
    experienceLevel: job.experienceLevel,
    employmentType: job.employmentType,
    topSkills: job.skills.required.slice(0, 4),
    postedDate: job.postedDate,
    relativePostedDate: getRelativeTime(job.postedDate),
    featured: job.featured,
  };
}

/**
 * Primary search engine function used identically by UI and WebMCP
 */
export function searchJobs(params: JobSearchParams = {}): JobSearchResponse {
  const {
    query,
    jobTitle,
    skills,
    candidateCountry,
    remoteRegion,
    employmentType,
    experienceLevel,
    minimumSalary,
    companyStage,
    industry,
    postedWithinDays,
    timezone,
    limit = 20,
    offset = 0,
    sortBy = 'newest'
  } = params;

  let filtered = [...JOBS];

  // 1. General query match (across title, company, description, skills, techStack, industry)
  if (query && query.trim()) {
    const qPhrase = query.toLowerCase().trim();
    const qTerms = qPhrase.split(/\s+/);
    filtered = filtered.filter(job => {
      const searchTarget = [
        job.title,
        job.company.name,
        job.company.industry,
        job.description,
        ...job.skills.required,
        ...job.skills.preferred,
        ...job.techStack,
      ].join(' ').toLowerCase();

      // Priority 1: Contiguous phrase match (e.g. "React Native", "Product Designer")
      if (searchTarget.includes(qPhrase)) {
        return true;
      }

      // Priority 2: All individual words present as distinct terms
      return qTerms.every(term => {
        const regex = new RegExp(`(^|[^a-z0-9])${term}([^a-z0-9]|$)`, 'i');
        return regex.test(searchTarget);
      });
    });
  }

  // 2. Specific Job Title filter
  if (jobTitle && jobTitle.trim()) {
    const titleLower = jobTitle.toLowerCase().trim();
    filtered = filtered.filter(job => job.title.toLowerCase().includes(titleLower));
  }

  // 3. Skills filter
  if (skills && skills.length > 0) {
    const skillList = Array.isArray(skills) ? skills : [skills];
    filtered = filtered.filter(job => {
      const jobAllSkills = [
        ...job.skills.required,
        ...job.skills.preferred,
        ...job.techStack
      ].map(s => s.toLowerCase());

      return skillList.some(skill => 
        jobAllSkills.some(js => js.includes(skill.toLowerCase()))
      );
    });
  }

  // 4. Candidate country eligibility (Worldwide or country included in allowedCountries)
  if (candidateCountry && candidateCountry.trim()) {
    const countryLower = candidateCountry.toLowerCase().trim();
    filtered = filtered.filter(job => {
      if (job.remote.worldwide) return true;
      return job.remote.allowedCountries.some(c => c.toLowerCase() === countryLower || c.toLowerCase().includes(countryLower));
    });
  }

  // 5. Remote region filter
  if (remoteRegion && remoteRegion.trim()) {
    const regionLower = remoteRegion.toLowerCase().trim();
    filtered = filtered.filter(job => {
      if (regionLower === 'worldwide' && job.remote.worldwide) return true;
      if (job.remote.worldwide) return true;
      return job.remote.allowedRegions.some(r => r.toLowerCase().includes(regionLower));
    });
  }

  // 6. Employment type
  if (employmentType && employmentType !== 'all') {
    filtered = filtered.filter(job => 
      job.employmentType.toLowerCase() === employmentType.toLowerCase()
    );
  }

  // 7. Experience level
  if (experienceLevel && experienceLevel !== 'all') {
    filtered = filtered.filter(job => 
      job.experienceLevel.toLowerCase() === experienceLevel.toLowerCase()
    );
  }

  // 8. Minimum salary (evaluates min salary or USD equivalent)
  if (minimumSalary && minimumSalary > 0) {
    filtered = filtered.filter(job => 
      job.salary.min >= minimumSalary || job.salary.salaryUsdEquivalent >= minimumSalary
    );
  }

  // 9. Company stage
  if (companyStage && companyStage !== 'all') {
    filtered = filtered.filter(job => 
      job.company.companyStage.toLowerCase() === companyStage.toLowerCase()
    );
  }

  // 10. Industry
  if (industry && industry !== 'all') {
    filtered = filtered.filter(job => 
      job.company.industry.toLowerCase() === industry.toLowerCase()
    );
  }

  // 11. Posted within days
  if (postedWithinDays && postedWithinDays > 0) {
    const cutoffTime = new Date('2026-09-02T18:00:00.000Z').getTime() - (postedWithinDays * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(job => {
      const jobTime = new Date(job.postedDate).getTime();
      return jobTime >= cutoffTime;
    });
  }

  // 12. Timezone
  if (timezone && timezone.trim()) {
    const tzLower = timezone.toLowerCase().trim();
    filtered = filtered.filter(job => 
      job.remote.timezone.toLowerCase().includes(tzLower)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'salary_desc') {
      return b.salary.salaryUsdEquivalent - a.salary.salaryUsdEquivalent;
    }
    if (sortBy === 'salary_asc') {
      return a.salary.salaryUsdEquivalent - b.salary.salaryUsdEquivalent;
    }
    if (sortBy === 'relevance') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
    }
    // Default newest
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });

  const totalMatches = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  return {
    totalMatches,
    querySummary: {
      filtersApplied: {
        query: query || null,
        candidateCountry: candidateCountry || null,
        remoteRegion: remoteRegion || null,
        minimumSalary: minimumSalary || null,
        companyStage: companyStage || null,
        experienceLevel: experienceLevel || null,
        employmentType: employmentType || null,
        industry: industry || null,
        postedWithinDays: postedWithinDays || null,
      },
      returnedCount: paginated.length,
      hasMore: offset + limit < totalMatches,
    },
    jobs: paginated.map(formatJobSummary),
  };
}

/**
 * Detailed single job lookup
 */
export function getJobById(id: string): Job | null {
  return getRawJobById(id) || null;
}

/**
 * Compare 2-5 jobs side-by-side
 */
export function compareJobs(jobIds: string[]): { count: number; jobs: JobComparisonItem[] } {
  if (!Array.isArray(jobIds)) {
    return { count: 0, jobs: [] };
  }

  const validIds = jobIds.slice(0, 5);
  const items: JobComparisonItem[] = [];

  for (const id of validIds) {
    const job = getRawJobById(id);
    if (job) {
      items.push({
        id: job.id,
        title: job.title,
        company: job.company.name,
        companyStage: job.company.companyStage,
        industry: job.company.industry,
        salary: formatSalary(job.salary.min, job.salary.max, job.salary.currency),
        salaryUsdEquivalent: job.salary.salaryUsdEquivalent,
        remoteEligibility: job.remote.worldwide 
          ? 'Worldwide' 
          : job.remote.allowedCountries.slice(0, 4).join(', ') + (job.remote.allowedCountries.length > 4 ? ` (+${job.remote.allowedCountries.length - 4} more)` : ''),
        worldwide: job.remote.worldwide,
        timezone: job.remote.timezone,
        experienceLevel: job.experienceLevel,
        yearsExperience: `${job.minimumYearsExperience}${job.maximumYearsExperience ? `–${job.maximumYearsExperience}` : '+'} years`,
        requiredSkills: job.skills.required,
        preferredSkills: job.skills.preferred,
        techStack: job.techStack,
        benefits: job.benefits.slice(0, 3),
        visaSponsorship: job.visaSponsorship,
        postedDate: getRelativeTime(job.postedDate),
      });
    }
  }

  return {
    count: items.length,
    jobs: items,
  };
}

/**
 * Provides metadata for filter dropdowns / WebMCP discoverability
 */
export function getFilterOptions(): FilterOptions {
  const industries = Array.from(new Set(JOBS.map(j => j.company.industry))).sort();
  const stages: CompanyStage[] = ['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Public'];
  const experienceLevels: ExperienceLevel[] = ['Entry Level', 'Junior', 'Mid Level', 'Senior', 'Staff', 'Lead', 'Manager', 'Director'];
  const employmentTypes: EmploymentType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  
  const countrySet = new Set<string>();
  JOBS.forEach(j => j.remote.allowedCountries.forEach(c => countrySet.add(c)));
  const countries = Array.from(countrySet).sort();

  const regions = ['Worldwide', 'APAC', 'EMEA', 'Americas', 'Europe', 'LATAM'];
  
  const skillSet = new Set<string>();
  JOBS.forEach(j => {
    j.skills.required.forEach(s => skillSet.add(s));
    j.skills.preferred.forEach(s => skillSet.add(s));
  });
  const skills = Array.from(skillSet).slice(0, 25).sort();

  return {
    industries,
    companyStages: stages,
    experienceLevels,
    employmentTypes,
    remoteRegions: regions,
    countries,
    skills,
    salaryRanges: [
      { label: '$40K+', min: 40000 },
      { label: '$60K+', min: 60000 },
      { label: '$80K+', min: 80000 },
      { label: '$100K+', min: 100000 },
      { label: '$120K+', min: 120000 },
      { label: '$150K+', min: 150000 },
    ]
  };
}
