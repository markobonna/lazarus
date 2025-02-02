export interface StorageConfig {
  endpoint: string;
  collections: Record<string, string>;
}

export interface StorageLocation {
  vault: string;
  collection: string;
  recordId: string;
}
