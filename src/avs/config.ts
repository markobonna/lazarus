import { AVSConfig } from "./types";

export const defaultAVSConfig: AVSConfig = {
  operatorAddress: process.env.NEXT_PUBLIC_AVS_OPERATOR_ADDRESS || "",
  registryContract: process.env.NEXT_PUBLIC_AVS_REGISTRY_CONTRACT || "",
  stakingContract: process.env.NEXT_PUBLIC_AVS_STAKING_CONTRACT || "",
  quorumThreshold: 2,
  taskTimeout: 30000,
};
