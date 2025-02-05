// src/app/defiagentdashboard/error.tsx
"use client";

import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("DeFi Dashboard Error:", error);
  }, [error]);

  return (
    <main className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[50vh]">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <span>Something went wrong!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            An error occurred while loading the DeFi Agent Dashboard. This might
            be due to network connectivity issues or problems connecting to the
            required services.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
          <Button onClick={() => reset()}>Try Again</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
