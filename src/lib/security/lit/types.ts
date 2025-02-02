export interface KeyConfig {
  endpoint: string;
  keyRotationDays: number;
  maxKeyAge: number;
}

export interface KeyPair {
  publicKey: string;
  encryptedPrivateKey: string;
}

export interface KeyInfo {
  keyId: string;
  publicKey: string;
  createdAt: number;
  lastUsed: number;
}
