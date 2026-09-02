import React, { useState } from 'react';
import { 
  Bot, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle, 
  ChevronDown, 
  ChevronRight, 
  Cpu, 
  Compass,
  CheckCircle2, 
  Laptop
} from 'lucide-react';
import { ALL_WEBMCP_TOOLS, getWebMCPRegistrationStatus } from '../../webmcp/registry';

export const AboutDemoView: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const status = getWebMCPRegistrationStatus();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const demoScenarios = [
    {
      step: '1. Search Jobs',
      prompt: 'Find remote React Native jobs that allow candidates from India, pay at least $60,000, and were posted recently.',
      tool: 'search_jobs',
      notes: 'Filters by title/query, candidateCountry: "India", minimumSalary: 60000, and recency.',
    },
    {
      step: '2. Inspect Job Details',
      prompt: 'Show me details about the first two jobs returned.',
      tool: 'get_job_details',
      notes: 'Retrieves comprehensive full specifications for specific job IDs (e.g. job-1, job-2).',
    },
    {
      step: '3. Compare Jobs Side-by-Side',
      prompt: 'Compare jobs job-1, job-2, and job-3 side by side.',
      tool: 'compare_jobs',
      notes: 'Generates structured comparison matrix for 2–5 positions without dumping unnecessary text.',
    },
    {
      step: '4. Save Jobs (Action Tool)',
      prompt: 'Save job-1 and job-3 to my saved jobs collection.',
      tool: 'save_job',
      notes: 'Updates localStorage and dispatches reactive state change; visible UI updates instantly!',
    },
    {
      step: '5. Query Saved Jobs',
      prompt: 'What jobs have I saved on TrueRemoteJobs?',
      tool: 'get_saved_jobs',
      notes: 'Returns current saved jobs list and verification count.',
    },
    {
      step: '6. Unsave / Remove Job',
      prompt: 'Remove job-1 from my saved jobs collection.',
      tool: 'unsave_job',
      notes: 'Removes the specified job from localStorage and visibly updates the Saved Jobs screen.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Hero Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <Bot className="w-3.5 h-3.5" />
          <span>TrueRemoteJobs + WebMCP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
          About the Demo
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl">
          TrueRemoteJobs demonstrates how modern web applications expose structured capabilities to AI agents using the <strong>Web Model Context Protocol (WebMCP)</strong> standard via <code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-mono text-sm">document.modelContext</code>.
        </p>
      </div>

      {/* Official Judge Testing Instructions Banner */}
      <div className="bg-gradient-to-br from-indigo-50/90 to-white rounded-2xl border border-indigo-200/80 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-900 font-bold text-base">
          <Laptop className="w-5 h-5 text-indigo-600" />
          <span>How to Test with WebMCP</span>
        </div>
        <p className="text-sm text-zinc-700 leading-relaxed">
          You can test TrueRemoteJobs using any WebMCP-compliant environment:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-2">
            <span className="font-bold text-zinc-900 text-sm block">Option A: ChatGPT In-App Browser</span>
            <p className="text-zinc-600 leading-relaxed">
              Open this deployed site directly inside ChatGPT's in-app browser. ChatGPT automatically discovers the 7 registered tools through <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono">document.modelContext</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-2xs space-y-2">
            <span className="font-bold text-zinc-900 text-sm block">Option B: Chrome 149+ with Flag</span>
            <p className="text-zinc-600 leading-relaxed">
              In Chrome 149+, navigate to:
            </p>
            <code className="block p-2 bg-zinc-900 text-zinc-100 rounded-lg font-mono text-[11px] select-all">
              chrome://flags/#enable-webmcp-testing
            </code>
            <p className="text-zinc-500 text-[11px]">
              Set flag to <strong>Enabled</strong> and restart Chrome.
            </p>
          </div>
        </div>
      </div>

      {/* Live WebMCP Status Card */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-zinc-900 text-base">
                WebMCP Browser Integration Status
              </h2>
              <p className="text-xs text-zinc-500">
                W3C Web Machine Learning ModelContext Standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {ALL_WEBMCP_TOOLS.length} Tools Ready
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-mono">
              document.modelContext
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
            <span className="text-zinc-400 font-medium">Canonical API:</span>
            <p className="font-semibold text-zinc-800 font-mono">document.modelContext.registerTool()</p>
            <p className="text-zinc-500 text-[11px]">Fallback: navigator.modelContext</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
            <span className="text-zinc-400 font-medium">State Synchronization:</span>
            <p className="font-semibold text-zinc-800">Zero-Refresh Live Sync</p>
            <p className="text-zinc-500 text-[11px]">Shared store between UI & WebMCP</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
            <span className="text-zinc-400 font-medium">Dataset:</span>
            <p className="font-semibold text-zinc-800">200 Seeded Fictional Jobs</p>
            <p className="text-zinc-500 text-[11px]">Instant local search & matching</p>
          </div>
        </div>
      </div>

      {/* Primary Judge Demo Prompts Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Hackathon Judge Demonstration Prompts
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Copy and prompt your AI agent with these commands to observe full discovery and real-time state synchronization:
          </p>
        </div>

        <div className="space-y-3">
          {demoScenarios.map((scenario, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-zinc-200/80 p-4 transition-all hover:border-zinc-300 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-zinc-900">{scenario.step}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-mono font-medium">
                      Tool: {scenario.tool}()
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-100 text-sm font-mono text-zinc-800 flex items-center justify-between gap-3">
                    <span>"{scenario.prompt}"</span>
                    <button
                      onClick={() => handleCopy(scenario.prompt)}
                      className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 transition-colors flex-shrink-0"
                      title="Copy prompt"
                    >
                      {copiedPrompt === scenario.prompt ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">{scenario.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exposed WebMCP Tools List with Schemas (Collapsible) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600" />
            Exposed WebMCP Tools (7 Tools)
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Click any tool to inspect its structured JSON Schema and descriptions:
          </p>
        </div>

        <div className="space-y-2.5">
          {ALL_WEBMCP_TOOLS.map((tool) => {
            const isExpanded = expandedTool === tool.name;
            return (
              <div
                key={tool.name}
                className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setExpandedTool(isExpanded ? null : tool.name)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono font-bold text-sm text-indigo-600">
                      {tool.name}()
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      tool.readOnlyHint
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {tool.readOnlyHint ? 'Read Only' : 'Action Tool'}
                    </span>
                    <span className="text-xs text-zinc-500 hidden sm:inline truncate max-w-md">
                      — {tool.description.slice(0, 75)}...
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400 flex-shrink-0">
                    <span className="text-xs text-zinc-500 hidden sm:inline">
                      {isExpanded ? 'Hide' : 'Schema'}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-zinc-100 bg-zinc-50/50 space-y-3">
                    <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                      {tool.description}
                    </p>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                        Input JSON Schema:
                      </span>
                      <pre className="p-3 bg-zinc-900 text-zinc-100 rounded-lg text-xs font-mono overflow-x-auto">
                        {JSON.stringify(tool.inputSchema, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mandatory Disclaimer Section */}
      <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Fictional Demonstration Dataset Notice</span>
        </div>
        <p className="text-xs text-amber-800 leading-relaxed">
          TrueRemoteJobs is a prototype application built exclusively for hackathon evaluation of the Web Model Context Protocol. All 200 job positions, companies (e.g. NovaStack, Orbit Labs, Mosaic AI), salaries, and application policies are generated fictional records. No real applications will be processed or submitted.
        </p>
      </div>

    </div>
  );
};
