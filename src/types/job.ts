export type CompanyStage = 
  | 'Bootstrapped' 
  | 'Pre-Seed' 
  | 'Seed' 
  | 'Series A' 
  | 'Series B' 
  | 'Series C+' 
  | 'Public';

export type ExperienceLevel = 
  | 'Intern' 
  | 'Entry Level' 
  | 'Junior' 
  | 'Mid Level' 
  | 'Senior' 
  | 'Staff' 
  | 'Lead' 
  | 'Manager' 
  | 'Director';

export type EmploymentType = 
  | 'Full-time' 
  | 'Part-time' 
  | 'Contract' 
  | 'Internship';

export type Department = 
  | 'Engineering' 
  | 'Design' 
  | 'Product' 
  | 'Marketing' 
  | 'Sales' 
  | 'Customer Success' 
  | 'Operations' 
  | 'Data' 
  | 'AI / ML' 
  | 'Finance' 
  | 'People / HR';

export interface Company {
  id: string;
  name: string;
  logo: string;
  badgeBg: string;
  description: string;
  website: string;
  industry: string;
  companyStage: CompanyStage;
  employeeCount: number;
  headquarters: string;
  fundingRaised?: string;
}

export interface RemotePolicy {
  type: 'Fully Remote' | 'Remote First';
  worldwide: boolean;
  allowedCountries: string[];
  allowedRegions: string[];
  timezone: string;
  timezoneOverlapHours: number;
}

export interface SalaryInfo {
  min: number;
  max: number;
  currency: string;
  period: 'year' | 'month' | 'hour';
  salaryUsdEquivalent: number; // Normalized annual USD for filtering
}

export interface EquityInfo {
  available: boolean;
  min?: string;
  max?: string;
}

export interface JobSkills {
  required: string[];
  preferred: string[];
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  company: Company;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  department: Department;
  remote: RemotePolicy;
  salary: SalaryInfo;
  equity?: EquityInfo;
  skills: JobSkills;
  techStack: string[];
  minimumYearsExperience: number;
  maximumYearsExperience?: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  visaSponsorship: boolean;
  relocationSupport: boolean;
  postedDate: string; // ISO 8601
  applicationDeadline?: string;
  featured: boolean;
  verifiedDemoCompany: boolean;
}

export interface JobSearchParams {
  query?: string;
  jobTitle?: string;
  skills?: string[];
  candidateCountry?: string;
  remoteRegion?: string;
  employmentType?: EmploymentType | string;
  experienceLevel?: ExperienceLevel | string;
  minimumSalary?: number;
  companyStage?: CompanyStage | string;
  industry?: string;
  postedWithinDays?: number;
  timezone?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'newest' | 'salary_desc' | 'salary_asc' | 'relevance';
}

export interface JobSearchResponse {
  totalMatches: number;
  querySummary: {
    filtersApplied: Record<string, any>;
    returnedCount: number;
    hasMore: boolean;
  };
  jobs: JobSearchResultItem[];
}

export interface JobSearchResultItem {
  id: string;
  title: string;
  company: {
    name: string;
    stage: CompanyStage;
    industry: string;
    headquarters: string;
    employeeCount: number;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
    display: string;
    usdEquivalent: number;
  };
  remoteEligibility: {
    worldwide: boolean;
    allowedCountries: string[];
    allowedRegions: string[];
    timezone: string;
  };
  experienceLevel: ExperienceLevel;
  employmentType: EmploymentType;
  topSkills: string[];
  postedDate: string;
  relativePostedDate: string;
  featured: boolean;
}

export interface JobComparisonItem {
  id: string;
  title: string;
  company: string;
  companyStage: CompanyStage;
  industry: string;
  salary: string;
  salaryUsdEquivalent: number;
  remoteEligibility: string;
  worldwide: boolean;
  timezone: string;
  experienceLevel: ExperienceLevel;
  yearsExperience: string;
  requiredSkills: string[];
  preferredSkills: string[];
  techStack: string[];
  benefits: string[];
  visaSponsorship: boolean;
  postedDate: string;
}

export interface FilterOptions {
  industries: string[];
  companyStages: CompanyStage[];
  experienceLevels: ExperienceLevel[];
  employmentTypes: EmploymentType[];
  remoteRegions: string[];
  countries: string[];
  skills: string[];
  salaryRanges: { label: string; min: number }[];
}
