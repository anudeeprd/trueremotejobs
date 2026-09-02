# TrueRemoteJobs 🌐

> **Remote jobs you can actually apply for.**  
> A discovery web application featuring deep browser **WebMCP (Web Model Context Protocol)** integration.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![WebMCP Standard](https://img.shields.io/badge/WebMCP-document.modelContext-indigo.svg)](https://github.com/w3c/webmachinelearning)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-teal.svg)](https://tailwindcss.com)
[![Tests](https://img.shields.io/badge/Vitest-28%2F28%20Passing-brightgreen.svg)](https://vitest.dev)

---

## 🎯 What is TrueRemoteJobs?

**TrueRemoteJobs** is a modern remote job discovery platform specifically architected to demonstrate how external AI agents interact with web applications through **structured, client-side WebMCP browser tools** rather than scraping HTML DOM elements or simulating mouse clicks.

The application includes a curated deterministic dataset of **200 realistic fictional remote jobs** across 20 tech startups, with multi-faceted filtering for geographic eligibility (Worldwide, India-eligible, APAC, EMEA, Americas), salary ranges, funding stages, experience levels, and skills.

---

## 💡 Why Remote Job Search is a Strong WebMCP Use Case

Remote job hunting is traditionally plagued by messy data and fragmented eligibility rules:
1. **Hidden Eligibility Gotchas**: Positions labeled "remote" often restrict hiring to specific countries or timezones.
2. **Fragmented Filtering**: Human users must manually cross-reference salaries, visa policies, tech stacks, and company stages across dozens of filters.
3. **Fragile Web Scraping**: Traditional AI agents scraping job boards struggle with infinite scrolling, dynamic DOM changes, and modal overlays.

With **WebMCP**, the website provides a semantic contract directly via `document.modelContext`:
* **Structured Queries**: Agents query candidate-country eligibility (`candidateCountry: "India"`), minimum salary (`minimumSalary: 60000`), and role recency via typed JSON schemas.
* **Side-by-Side Comparison**: Agents request side-by-side matrices across 2–5 positions without dumping full HTML pages into context windows.
* **Synchronized State**: When an agent invokes the action tool `save_job`, the browser's `localStorage` and visible React UI update synchronously with zero page refresh required.

---

## 👥 What Humans Can Do in the UI

* **Instant Search & Faceting**: Search by keyword, role, technology, or company name with live suggestions.
* **Granular Filter Drawer**: Filter by candidate country eligibility, remote regions, experience levels, minimum salary ($40k to $120k+), startup stages (Seed, Series A, Series B), and posting recency.
* **Rich Job Cards**: Scan company logos, funding stages, salary ranges, skills tags, and clear regional eligibility badges (e.g. `🇮🇳 India eligible`).
* **Slide-Over Job Details**: Inspect full company backgrounds, funding history, responsibilities, requirements, benefits, and tech stack details.
* **Saved Jobs Collection**: Bookmark interesting roles and manage saved positions.

---

## 🤖 What Agents Can Do with WebMCP

External AI agents have direct access to seven structured browser tools exposed on `document.modelContext`:

| Tool Name | Type | Description |
|---|---|---|
| `search_jobs` | Read-only | Search and filter the catalog by keywords, skills, candidate country (e.g. India), region, minimum salary, stage, recency, etc. Returns compact structured items. |
| `get_job_details` | Read-only | Retrieve complete specifications, tech stack, responsibilities, requirements, and benefits for a specific `jobId`. |
| `compare_jobs` | Read-only | Compare 2 to 5 remote jobs side-by-side in a structured comparison matrix. |
| `save_job` | **Action Tool** | Saves a job into `localStorage` and immediately updates the visible UI saved count and collection without refreshing. |
| `unsave_job` | **Action Tool** | Removes a job from the saved collection with immediate UI synchronization. |
| `get_saved_jobs` | Read-only | Returns all jobs currently saved by the user or agent. |
| `get_filter_options` | Read-only | Returns valid filter facets across all searchable categories. |

---

## 🧪 Browser Testing Instructions (For Hackathon Judges)

You can test TrueRemoteJobs using either of the following official WebMCP environments:

### Option A: ChatGPT In-App Browser
1. Open the deployed website link directly inside ChatGPT's in-app browser.
2. ChatGPT automatically discovers the 7 registered tools through `document.modelContext` and enables direct agent interaction.

### Option B: Chrome 149+ with WebMCP Flag
1. Launch **Google Chrome 149+**.
2. Navigate to:
   ```
   chrome://flags/#enable-webmcp-testing
   ```
3. Set the flag to **Enabled**.
4. Click **Relaunch** to restart Chrome.
5. Open the TrueRemoteJobs URL.

---

## 🧑‍⚖️ Hackathon Judge Demonstration Script

Try this step-by-step sequence in your WebMCP-enabled agent:

1. **Search matching jobs:**
   > *"Find remote React Native jobs that allow candidates from India, pay at least $60,000, and were posted recently."*  
   > → Agent invokes `search_jobs({ query: "React Native", candidateCountry: "India", minimumSalary: 60000 })`

2. **Inspect job details:**
   > *"Show me details about the first two."*  
   > → Agent invokes `get_job_details({ jobId: "job-1" })` and `get_job_details({ jobId: "job-2" })`

3. **Compare jobs side-by-side:**
   > *"Compare these three jobs."*  
   > → Agent invokes `compare_jobs({ jobIds: ["job-1", "job-2", "job-3"] })`

4. **Save jobs (Action Tool):**
   > *"Save the first and third jobs."*  
   > → Agent invokes `save_job({ jobId: "job-1" })` and `save_job({ jobId: "job-3" })`  
   > **Notice:** The website's Saved Jobs counter badge immediately updates to **2**, and both jobs appear in the **Saved Jobs** view with zero refresh!

5. **Query saved collection:**
   > *"What jobs have I saved?"*  
   > → Agent invokes `get_saved_jobs({})`

6. **Unsave a job:**
   > *"Remove the first saved job."*  
   > → Agent invokes `unsave_job({ jobId: "job-1" })`  
   > **Notice:** The job immediately disappears from the Saved Jobs screen.

---

## 🧱 Architecture & Single Source of Truth

```
                               ┌───────────────────────────┐
                               │   WebMCP-Capable Agent    │
                               │  (ChatGPT / Chrome 149+)  │
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
       │  • generator.ts (200 deterministic jobs)    │
       └─────────────────────────────────────────────┘
```

Both the visible React UI and the WebMCP tools interact with the exact same business logic:
* Canonical search queries call `searchJobs()`.
* Canonical bookmark toggles and agent saves call `saveJob()` / `unsaveJob()`.
* State mutations dispatch `trueremotejobs:saved-updated` events, ensuring React components and custom hooks (`useSavedJobs`) update synchronously.

---

## ⚠️ Fictional Data Disclosure

> **Demo dataset · Fictional job listings.**  
> TrueRemoteJobs is a prototype application built exclusively for hackathon evaluation of the Web Model Context Protocol. All 200 job positions, companies (e.g. NovaStack, Orbit Labs, Mosaic AI), salaries, and application policies are generated fictional records. No real applications will be processed or submitted.

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js `>= 18.0.0`
- npm `>= 9.0.0`

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Run Automated Test Suite
```bash
npm run test
```
Runs 28 automated tests covering search queries, reactive state persistence, WebMCP tool schemas, and the full end-to-end judge demonstration workflow.

### 5. Build for Production
```bash
npm run build
```
Type checks and bundles production assets into `dist/`.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
