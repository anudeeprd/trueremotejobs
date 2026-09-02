import { WebMCPToolDefinition } from '../types/webmcp';
import { searchJobsTool } from './tools/searchJobs';
import { getJobDetailsTool } from './tools/getJobDetails';
import { compareJobsTool } from './tools/compareJobs';
import { saveJobTool } from './tools/saveJob';
import { unsaveJobTool } from './tools/unsaveJob';
import { getSavedJobsTool } from './tools/getSavedJobs';
import { getFilterOptionsTool } from './tools/getFilterOptions';

// All seven official TrueRemoteJobs WebMCP tools
export const ALL_WEBMCP_TOOLS: WebMCPToolDefinition[] = [
  searchJobsTool,
  getJobDetailsTool,
  compareJobsTool,
  saveJobTool,
  unsaveJobTool,
  getSavedJobsTool,
  getFilterOptionsTool,
];

export interface RegistrationStatus {
  isSupported: boolean;
  target: 'document.modelContext' | 'navigator.modelContext' | null;
  toolCount: number;
  registeredNames: string[];
  registeredAt?: string;
  error?: string;
}

let currentStatus: RegistrationStatus = {
  isSupported: false,
  target: null,
  toolCount: 0,
  registeredNames: [],
};

/**
 * Detects the WebMCP interface according to the current W3C Web Machine Learning specification,
 * prioritizing document.modelContext with fallback to navigator.modelContext.
 */
function getModelContextTarget(): { api: any; name: 'document.modelContext' | 'navigator.modelContext' } | null {
  if (typeof document !== 'undefined' && (document as any).modelContext?.registerTool) {
    return { api: (document as any).modelContext, name: 'document.modelContext' };
  }
  if (typeof navigator !== 'undefined' && (navigator as any).modelContext?.registerTool) {
    return { api: (navigator as any).modelContext, name: 'navigator.modelContext' };
  }
  return null;
}

/**
 * Registers all seven WebMCP tools with the browser modelContext API
 * supports AbortSignal for proper lifecycle and cleanup.
 */
export async function registerAllWebMCPTools(signal?: AbortSignal): Promise<RegistrationStatus> {
  const target = getModelContextTarget();

  if (!target) {
    currentStatus = {
      isSupported: false,
      target: null,
      toolCount: 0,
      registeredNames: ALL_WEBMCP_TOOLS.map(t => t.name),
    };
    return currentStatus;
  }

  const registered: string[] = [];

  try {
    for (const tool of ALL_WEBMCP_TOOLS) {
      if (signal?.aborted) {
        break;
      }

      await target.api.registerTool(
        {
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
          execute: tool.execute,
          ...(tool.readOnlyHint !== undefined ? { readOnlyHint: tool.readOnlyHint } : {}),
        },
        signal ? { signal } : undefined
      );

      registered.push(tool.name);
    }

    currentStatus = {
      isSupported: true,
      target: target.name,
      toolCount: registered.length,
      registeredNames: registered,
      registeredAt: new Date().toISOString(),
    };
  } catch (err: any) {
    console.warn('[WebMCP] Tool registration notice:', err);
    currentStatus = {
      isSupported: true,
      target: target.name,
      toolCount: registered.length,
      registeredNames: registered,
      error: err?.message || String(err),
    };
  }

  return currentStatus;
}

/**
 * Returns current WebMCP registration diagnostics
 */
export function getWebMCPRegistrationStatus(): RegistrationStatus {
  const target = getModelContextTarget();
  if (target && currentStatus.toolCount === 0) {
    return {
      isSupported: true,
      target: target.name,
      toolCount: 0,
      registeredNames: ALL_WEBMCP_TOOLS.map(t => t.name),
    };
  }
  return currentStatus;
}
