/**
 * WebMCP (Web Model Context Protocol) Type Definitions
 * Based on W3C Web Machine Learning CG & emerging browser ModelContext API
 */

export interface JSONSchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
  items?: {
    type: string;
    enum?: string[];
  };
  default?: any;
}

export interface JSONSchema {
  type: 'object';
  properties: Record<string, JSONSchemaProperty>;
  required?: string[];
}

export interface WebMCPToolDefinition {
  name: string;
  description: string;
  inputSchema: JSONSchema;
  execute: (input: any) => Promise<any> | any;
  readOnlyHint?: boolean;
}

export interface WebMCPRegisterOptions {
  signal?: AbortSignal;
}

export interface ModelContextAPI {
  registerTool: (tool: WebMCPToolDefinition, options?: WebMCPRegisterOptions) => void | Promise<void>;
  provideContext?: (context: any) => void | Promise<void>;
  listTools?: () => Promise<WebMCPToolDefinition[]> | WebMCPToolDefinition[];
}

declare global {
  interface Document {
    modelContext?: ModelContextAPI;
  }
  interface Navigator {
    modelContext?: ModelContextAPI;
  }
}
