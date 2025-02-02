export const securityConfig = {
  nillion: {
    endpoint: process.env.NEXT_PUBLIC_NILLION_ENDPOINT || "",
    collections: {
      agent: "agent-data",
      keys: "key-storage",
      transactions: "tx-history",
    },
  },
  lit: {
    endpoint: process.env.NEXT_PUBLIC_LIT_NODE_ENDPOINT || "",
    keyRotationDays: 7,
    maxKeyAge: 30, // days
  },
  monitoring: {
    checkInterval: 60000, // 1 minute
    alertThresholds: {
      failedAttempts: 5,
      keyAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  },
};
