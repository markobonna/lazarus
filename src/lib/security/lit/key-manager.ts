import { LitNodeClient } from "@lit-protocol/lit-node-client";
import type { KeyConfig, KeyPair, KeyInfo } from "./types";

export class KeyManager {
  private static instance: KeyManager;
  private litClient: LitNodeClient;
  private activeKeys: Map<string, KeyInfo>;

  private constructor(config: KeyConfig) {
    this.litClient = new LitNodeClient({
      alertWhenUnauthorized: false,
      debug: false,
    });
    this.activeKeys = new Map();
  }

  static async getInstance(): Promise<KeyManager> {
    if (!KeyManager.instance) {
      const config = {
        endpoint: process.env.NEXT_PUBLIC_LIT_NODE_ENDPOINT || "",
        keyRotationDays: 7,
        maxKeyAge: 30,
      };
      KeyManager.instance = new KeyManager(config);
      await KeyManager.instance.initialize();
    }
    return KeyManager.instance;
  }

  async initialize(): Promise<void> {
    await this.litClient.connect();
  }

  async generateKeyPair(keyId: string): Promise<KeyPair | null> {
    try {
      const authSig = await this.litClient.signMessage();
      const response = await this.litClient.executeJs({
        code: `
          const keyPair = await LitActions.generateKeyPair();
          return {
            publicKey: keyPair.publicKey,
            encryptedPrivateKey: await LitActions.encrypt(
              keyPair.privateKey,
              publicKey
            )
          };
        `,
        authSig,
        jsParams: {
          keyId,
        },
      });

      if (response?.publicKey) {
        this.activeKeys.set(keyId, {
          keyId,
          publicKey: response.publicKey,
          createdAt: Date.now(),
          lastUsed: Date.now(),
        });
        return response;
      }
      return null;
    } catch (error) {
      console.error("Key generation failed:", error);
      return null;
    }
  }

  async rotateKeys(): Promise<boolean> {
    try {
      const keysToRotate = Array.from(this.activeKeys.entries()).filter(
        ([_, info]) => Date.now() - info.createdAt > 7 * 24 * 60 * 60 * 1000
      );

      for (const [keyId] of keysToRotate) {
        const newKeyPair = await this.generateKeyPair(`${keyId}-${Date.now()}`);
        if (newKeyPair) {
          this.activeKeys.delete(keyId);
        }
      }

      return true;
    } catch (error) {
      console.error("Key rotation failed:", error);
      return false;
    }
  }

  getKeyMetrics(): {
    totalKeys: number;
    averageAge: number;
  } {
    const now = Date.now();
    const ages = Array.from(this.activeKeys.values()).map(
      (info) => now - info.createdAt
    );

    return {
      totalKeys: this.activeKeys.size,
      averageAge: ages.reduce((sum, age) => sum + age, 0) / ages.length || 0,
    };
  }
}
