import type { StorageConfig, StorageLocation } from "./types";
import { NillionSecretVault } from "@nillion/secret-vault";

export class SecureVaultManager {
  private static instance: SecureVaultManager;
  private vault: NillionSecretVault;

  private constructor(config: StorageConfig) {
    this.vault = new NillionSecretVault({
      endpoint: config.endpoint,
    });
  }

  static async getInstance(): Promise<SecureVaultManager> {
    if (!SecureVaultManager.instance) {
      const config = {
        endpoint: process.env.NEXT_PUBLIC_NILLION_ENDPOINT || "",
        collections: {
          agent: "agent-data",
          keys: "key-storage",
          transactions: "tx-history",
        },
      };
      SecureVaultManager.instance = new SecureVaultManager(config);
    }
    return SecureVaultManager.instance;
  }

  async storeSecretData(
    data: Record<string, any>,
    location: StorageLocation
  ): Promise<boolean> {
    try {
      await this.vault.store({
        collection: location.collection,
        record: {
          id: location.recordId,
          data: this.encryptData(data),
        },
      });
      return true;
    } catch (error) {
      console.error("Failed to store secret data:", error);
      return false;
    }
  }

  async retrieveSecretData(
    location: StorageLocation
  ): Promise<Record<string, any> | null> {
    try {
      const record = await this.vault.retrieve({
        collection: location.collection,
        recordId: location.recordId,
      });

      if (!record) {
        throw new Error("Record not found");
      }

      return this.decryptData(record.data);
    } catch (error) {
      console.error("Failed to retrieve secret data:", error);
      return null;
    }
  }

  private encryptData(data: Record<string, any>): string {
    // In a real implementation, you would want to implement proper encryption
    // This is just a placeholder
    return JSON.stringify(data);
  }

  private decryptData(encryptedData: string): Record<string, any> {
    // In a real implementation, you would want to implement proper decryption
    // This is just a placeholder
    return JSON.parse(encryptedData);
  }

  async deleteSecretData(location: StorageLocation): Promise<boolean> {
    try {
      await this.vault.delete({
        collection: location.collection,
        recordId: location.recordId,
      });
      return true;
    } catch (error) {
      console.error("Failed to delete secret data:", error);
      return false;
    }
  }

  async listSecretData(collection: string): Promise<string[]> {
    try {
      const records = await this.vault.list({
        collection,
      });
      return records.map((record) => record.id);
    } catch (error) {
      console.error("Failed to list secret data:", error);
      return [];
    }
  }
}
