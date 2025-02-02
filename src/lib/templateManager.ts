// src/lib/templateManager.ts

import { AgentTemplate, AgentInstance } from "../types/agent";
import { AgentConfig } from "@coinbase/agentkit";

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
}

export class TemplateManager {
  private templates: Map<string, AgentTemplate>;
  private categories: TemplateCategory[];

  constructor() {
    this.templates = new Map();
    this.categories = [
      {
        id: "defi",
        name: "DeFi Agents",
        description: "Templates for decentralized finance operations",
      },
      {
        id: "social",
        name: "Social Agents",
        description: "Templates for social media and community interaction",
      },
      {
        id: "analytics",
        name: "Analytics Agents",
        description: "Templates for data analysis and reporting",
      },
    ];
    this.initializeTemplates();
  }

  private initializeTemplates() {
    // Initialize with base templates
    const baseTemplates: AgentTemplate[] = [
      {
        id: "defi-basic",
        name: "Basic DeFi Agent",
        description: "Simple DeFi operations and monitoring",
        category: "defi",
        capabilities: ["tx_execution", "defi_trading"],
        requiredActions: ["send_transaction", "read_contract"],
        defaultConfig: {
          maxTransactionValue: "1000000000000000000", // 1 ETH
          refreshInterval: 60000,
          riskLevel: "low",
        },
      },
      {
        id: "social-engagement",
        name: "Community Engagement Agent",
        category: "social",
        description:
          "Handles social media interactions and community management",
        capabilities: ["social_interaction", "content_generation"],
        requiredActions: ["post_message", "read_messages"],
        defaultConfig: {
          platforms: ["telegram", "discord"],
          responseDelay: 1000,
          moderationLevel: "medium",
        },
      },
      {
        id: "analytics-reporter",
        name: "Analytics & Reporting Agent",
        category: "analytics",
        description: "Analyzes on-chain data and generates reports",
        capabilities: ["data_analysis", "report_generation"],
        requiredActions: ["query_data", "generate_report"],
        defaultConfig: {
          dataSourceUrls: [],
          reportInterval: 86400000,
          metrics: ["volume", "tvl", "users"],
        },
      },
    ];

    baseTemplates.forEach((template) => {
      this.templates.set(template.id, template);
    });
  }

  async getTemplates(category?: string): Promise<AgentTemplate[]> {
    const allTemplates = Array.from(this.templates.values());
    if (category) {
      return allTemplates.filter((template) => template.category === category);
    }
    return allTemplates;
  }

  async getTemplate(id: string): Promise<AgentTemplate | null> {
    return this.templates.get(id) || null;
  }

  async getCategories(): Promise<TemplateCategory[]> {
    return this.categories;
  }

  async createTemplate(
    template: Omit<AgentTemplate, "id">
  ): Promise<AgentTemplate> {
    const id = `template-${Date.now()}`;
    const newTemplate = { ...template, id };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }

  async updateTemplate(
    id: string,
    updates: Partial<AgentTemplate>
  ): Promise<boolean> {
    const template = this.templates.get(id);
    if (!template) return false;

    const updatedTemplate = { ...template, ...updates };
    this.templates.set(id, updatedTemplate);
    return true;
  }

  async deleteTemplate(id: string): Promise<boolean> {
    return this.templates.delete(id);
  }

  async validateTemplate(
    template: AgentTemplate
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Validate required fields
    if (!template.name) errors.push("Template name is required");
    if (!template.description) errors.push("Template description is required");
    if (!template.category) errors.push("Template category is required");

    // Validate capabilities
    if (!template.capabilities?.length) {
      errors.push("At least one capability is required");
    }

    // Validate required actions
    if (!template.requiredActions?.length) {
      errors.push("At least one required action is required");
    }

    // Validate default config
    if (!template.defaultConfig) {
      errors.push("Default configuration is required");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  async deployTemplate(
    templateId: string,
    config: Partial<AgentConfig>
  ): Promise<{ success: boolean; instanceId?: string; error?: string }> {
    try {
      const template = await this.getTemplate(templateId);
      if (!template) {
        throw new Error("Template not found");
      }

      // Validate configuration
      const validation = await this.validateTemplate(template);
      if (!validation.valid) {
        throw new Error(`Invalid template: ${validation.errors.join(", ")}`);
      }

      // Merge template default config with provided config
      const finalConfig: AgentConfig = {
        ...template.defaultConfig,
        ...config,
      };

      // Create agent instance
      const instanceId = `${templateId}-${Date.now()}`;

      // Here you would typically:
      // 1. Deploy the agent using AgentKit
      // 2. Set up required integrations
      // 3. Initialize monitoring
      // 4. Set up security measures

      return {
        success: true,
        instanceId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

// Export a singleton instance
export const templateManager = new TemplateManager();
