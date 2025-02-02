import { SecureVaultManager } from "../nillion";
import { KeyManager } from "../lit";
import type { SecurityMetrics, SecurityAlert } from "./types";
import { securityConfig } from "@/config/security";

export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private vaultManager: SecureVaultManager;
  private keyManager: KeyManager;
  private alertCallbacks: ((alert: SecurityAlert) => void)[] = [];
  private monitoringInterval: NodeJS.Timer | null = null;

  private constructor(
    vaultManager: SecureVaultManager,
    keyManager: KeyManager
  ) {
    this.vaultManager = vaultManager;
    this.keyManager = keyManager;
  }

  static async getInstance(): Promise<SecurityMonitor> {
    if (!SecurityMonitor.instance) {
      const vaultManager = await SecureVaultManager.getInstance();
      const keyManager = await KeyManager.getInstance();
      SecurityMonitor.instance = new SecurityMonitor(vaultManager, keyManager);
    }
    return SecurityMonitor.instance;
  }

  async startMonitoring(
    intervalMs = securityConfig.monitoring.checkInterval
  ): Promise<void> {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }

    this.monitoringInterval = setInterval(async () => {
      await this.checkSecurityStatus();
    }, intervalMs);
  }

  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  private async checkSecurityStatus(): Promise<void> {
    const keyMetrics = this.keyManager.getKeyMetrics();

    // Check key rotation thresholds
    if (
      keyMetrics.averageAge > securityConfig.monitoring.alertThresholds.keyAge
    ) {
      await this.raiseAlert({
        id: `alert-${Date.now()}`,
        severity: "medium",
        type: "key_rotation_needed",
        message: "Keys are due for rotation",
        timestamp: Date.now(),
        metadata: { averageKeyAge: keyMetrics.averageAge },
      });
    }

    // Additional checks can be implemented here
  }

  async getMetrics(): Promise<SecurityMetrics> {
    const keyMetrics = this.keyManager.getKeyMetrics();

    return {
      authAttempts: 0, // Implementation needed
      failedAttempts: 0, // Implementation needed
      lastCompromiseAttempt: null,
      activeKeys: keyMetrics.totalKeys,
      averageKeyAge: keyMetrics.averageAge,
    };
  }

  onAlert(callback: (alert: SecurityAlert) => void): void {
    this.alertCallbacks.push(callback);
  }

  private async raiseAlert(alert: SecurityAlert): Promise<void> {
    this.alertCallbacks.forEach((callback) => callback(alert));
  }
}
