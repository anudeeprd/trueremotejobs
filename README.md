# TrueRemoteJobs 🌐

> **Remote jobs you can actually apply for.**
> A discovery web application featuring deep browser **WebMCP (Web Model Context Protocol)** integration.

[![WebMCP Standard](https://img.shields.io/badge/WebMCP-document.modelContext-indigo.svg)](https://github.com/w3c/webmachinelearning)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Vitest-27%2F27%20Passing-brightgreen.svg)](https://vitest.dev)

---

## 🎯 Hackathon Objective

The primary differentiator of **TrueRemoteJobs** is demonstrating how an AI agent can discover, inspect, compare, and save remote jobs by interacting with the website through **browser-native WebMCP tools**, rather than fragile HTML scraping or synthetic DOM clicking.

When an AI agent searches or saves positions, the visible website responds in real time without requiring a page refresh.

---

## 🚀 Why WebMCP Makes Job Discovery Better

| Traditional AI Web Agent | TrueRemoteJobs with WebMCP |
|---|---|
| Parses unpredictable HTML DOM tags | Calls clean, structured JavaScript tools (`search_jobs`, `get_job_details`) |
| Brittle against CSS class and markup updates | Stable semantic JSON schema contract |
| Struggles with multi-faceted filtering & pagination | Passes typed arguments directly (`candidateCountry: "India"`, `minimumSalary: 60000`) |
| Cannot reliably persist state into user sessions | Executes action tools (`save_job`) that update `localStorage` and visible React UI |

---

## 🛠️ Supported WebMCP Tools

All tools are registered imperatively via the emerging W3C standard:

```ts
document.modelContext.registerTool({ ... }, { signal });
```

*(With graceful fallback to `navigator.modelContext` and feature detection for non-WebMCP browsers).*

| Tool Name | Type | Description |
|---|---|---|
| `search_jobs` | Read-only | Search and filter jobs by query, skills, candidate country (e.g. India), region, salary, stage, recency, etc. Returns compact structured items. |
| `get_job_details` | Read-only | Fetch comprehensive specifications, tech stack, responsibilities, requirements, and benefits by `jobId`. |
| `compare_jobs` | Read-only | Compare 2–5 jobs side-by-side in a structured matrix. |
| `save_job` | **Action** | Saves a job into `localStorage` and immediately triggers a visible UI update in the React application. |
| `unsave_job` | **Action** | Removes a job from the user's saved collection with instant UI synchronization. |
| `get_saved_jobs` | Read-only | Returns all jobs currently saved by the user or agent. |
| `get_filter_options` | Read-only | Returns valid filter facets (stages, countries, skills, industries). |

---

## 🧑‍⚖️ Hackathon Judge Demonstration Script

To test the complete workflow using a WebMCP-capable browser agent:

1. **Search matching jobs:**
   > *"Find remote React Native jobs that allow candidates from India, pay at least $60,000, and were posted recently."*
   > → Invokes `search_jobs({ query: "React Native", candidateCountry: "India", minimumSalary: 60000 })`

2. **Inspect job details:**
   > *"Show me details about the first two."*
   > → Invokes `get_job_details({ jobId: "job-1" })` and `get_job_details({ jobId: "job-2" })`

3. **Compare jobs side-by-side:**
   > *"Compare these three jobs."*
   > → Invokes `compare_jobs({ jobIds: ["job-1", "job-2", "job-3"] })`

4. **Save jobs (Action Tool):**
   > *"Save the first and third jobs."*
   > → Invokes `save_job({ jobId: "job-1" })` and `save_job({ jobId: "job-3" })`
   > **Notice:** The website's Saved Jobs counter badge immediately updates to **2**, and both jobs appear in the **Saved Jobs** tab with zero refresh!

5. **Verify saved list:**
   > *"What jobs have I saved?"*
   > → Invokes `get_saved_jobs({})`

6. **Unsave a job:**
   > *"Remove the first saved job."*
   > → Invokes `unsave_job({ jobId: "job-1" })`
   > **Notice:** The job immediately disappears from the Saved Jobs screen.

---

## 🧱 Single Source of Truth Architecture

```
                               ┌───────────────────────────┐
                               │   WebMCP-Capable Agent    │
                               │  (Chrome Canary / MCP-B)  │
                               └─────────────┬─────────────┘
                                             │ document.modelContext
                                             ▼
┌──────────────────────────┐      ┌─────────────────────────┐
│     Visible React UI     │      │   WebMCP Tool Layer     │
│ (Discover, Saved, About) │      │   (src/webmcp/tools/)   │
└─────────────┬────────────┘      └───────────┬─────────────┘
              │                               │
              ▼                               ▼
       ┌─────────────────────────────────────────────┐
       │     Canonical Business Logic & Store        │
       │  • jobSearch.ts (deterministic filtering)   │
       │  • savedJobs.ts (localStorage + CustomEvent)│
       │  • jobs.ts (200 high-quality seeded jobs)   │
       └─────────────────────────────────────────────┘
```

Both the visible UI and the WebMCP tools interact with the exact same store. When `save_job` or `unsave_job` executes, a `trueremotejobs:saved-updated` event is broadcasted, notifying React hooks (`useSavedJobs`) synchronously.

---

## 📊 Dataset Specifications

- **Total Positions:** 200 high-quality deterministic jobs.
- **Companies:** 20 distinct fictional technology startups (NovaStack, Orbit Labs, Mosaic AI, Cinder, Lantern Labs, Cloudsmithy, FocalPoint, etc.).
- **Funding Stages:** Bootstrapped, Pre-Seed, Seed, Series A, Series B, Series C+, Public (biased toward Seed/Series A/Series B).
- **Geographic Eligibility:**
  - Worldwide Remote
  - India-eligible Remote
  - APAC, EMEA, Americas, Europe
- **Verified Primary Scenarios:**
  1. React Native + India eligible + $60k+
  2. Frontend + $60k+
  3. Senior Engineering + Series A
  4. Product Designer + Worldwide
  5. AI Engineer + posted within 7 days
  6. Entry Level + India eligible
  7. Product Manager + Seed/Series A
  8. TypeScript + $100k+

---

## ⚠️ Fictional Data Disclaimer

> **Demo dataset · Fictional job listings.**  
> Positions shown in TrueRemoteJobs are fictional records created specifically for this WebMCP prototype. No real application will be submitted or processed.

---

## 💻 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `>= 18.0.0`
- npm `>= 9.0.0`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated Tests
```bash
npm run test
```
Runs 27 automated tests checking search queries, WebMCP tools, and the judge demonstration sequence.

### 5. Build for Production
```bash
npm run build
```
Generates production build in `dist/`.

---

## 🚀 Deployment

The project is zero-dependency on servers or databases and can be deployed directly as a static site:

- **Vercel:** `npm run build` → Output directory: `dist`
- **Netlify:** `npm run build` → Publish directory: `dist`
- **Cloudflare Pages:** Framework preset: Vite → Build output: `dist`

---

## 📂 Project Structure

```
trueremotejobs/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx                      # App entry point
│   ├── App.tsx                       # Root layout & tab router
│   ├── index.css                     # Tailwind styling & tokens
│   ├── types/
│   │   ├── job.ts                    # Canonical Job & Company types
│   │   └── webmcp.ts                 # WebMCP ModelContext interfaces
│   ├── data/
│   │   ├── jobs.ts                   # Exported 200-job catalog
│   │   └── generator.ts              # Deterministic data generation engine
│   ├── lib/
│   │   ├── jobSearch.ts              # Canonical search, compare & facets
│   │   ├── savedJobs.ts              # Reactive saved jobs store (localStorage)
│   │   └── dateUtils.ts              # Relative dates & currency formatting
│   ├── webmcp/
│   │   ├── registry.ts               # document.modelContext registration
│   │   └── tools/                    # 7 WebMCP tools
│   │       ├── searchJobs.ts
│   │       ├── getJobDetails.ts
│   │       ├── compareJobs.ts
│   │       ├── saveJob.ts
│   │       ├── unsaveJob.ts
│   │       ├── getSavedJobs.ts
│   │       └── getFilterOptions.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Sticky header with real-time saved badge
│   │   │   ├── DisclaimerBanner.tsx  # Persistent demo disclaimer
│   │   │   └── Footer.tsx
│   │   ├── discover/
│   │   │   ├── DiscoverView.tsx      # Main discovery page
│   │   │   ├── SearchBar.tsx         # Search box with quick suggestion chips
│   │   │   ├── FilterBar.tsx         # Quick filter buttons & sort dropdown
│   │   │   ├── FilterDrawer.tsx      # Full slide-out faceted filter panel
│   │   │   ├── ActiveFilters.tsx     # Removable active filter tags
│   │   │   └── JobCard.tsx           # Rich card with badges, salary & bookmark
│   │   ├── details/
│   │   │   └── JobDetailDrawer.tsx   # Slide-over full job drawer + demo modal
│   │   ├── saved/
│   │   │   └── SavedJobsView.tsx     # Reactive saved positions screen
│   │   └── about/
│   │       └── AboutDemoView.tsx     # WebMCP tools, schemas & judge prompts
│   └── test/
│       ├── setup.ts
│       ├── jobSearch.test.ts         # Query & filter verification
│       ├── savedJobs.test.ts         # Persistence & reactivity verification
│       ├── webmcp.test.ts            # WebMCP registration & tools test
│       └── judgeDemoWorkflow.test.ts # End-to-end judge demonstration script
```
