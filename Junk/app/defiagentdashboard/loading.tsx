// src/app/defiagentdashboard/loading.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="container mx-auto p-4 md:p-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="h-7 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/4 mt-2" />
        </CardHeader>
      </Card>

      {/* Metric Cards Loading State */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Loading State */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>

      {/* Strategy Panel Loading State */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Log Loading State */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
