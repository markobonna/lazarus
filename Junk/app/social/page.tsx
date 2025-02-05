import { Suspense } from "react";
import { SocialDashboard } from "@/components/social/dashboard";
import { NotificationCenter } from "@/components/social/notifications/notification-center";
import { PlatformStatusPanel } from "@/components/social/platforms/platform-status-panel";
import { PLATFORM_CONFIGS } from "@/config/social";

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Social Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Monitor and manage your social interactions across platforms
            </p>
          </div>
          <NotificationCenter />
        </div>

        <div className="space-y-6">
          <Suspense fallback={<div>Loading platform status...</div>}>
            <PlatformStatusPanel />
          </Suspense>

          <Suspense fallback={<div>Loading dashboard...</div>}>
            <SocialDashboard
              platformConfigs={PLATFORM_CONFIGS}
              platformFactory={PlatformFactory}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
