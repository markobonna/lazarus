import { PlatformConfig } from "@/types/social";

export const PlatformCard = ({ config }: { config: PlatformConfig }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{config.name}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            config.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {config.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
