import { PlatformCard } from "./platform-card";
import { PLATFORM_CONFIGS } from "@/config/social";

export const PlatformList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.values(PLATFORM_CONFIGS).map((config) => (
        <PlatformCard key={config.id} config={config} />
      ))}
    </div>
  );
};
