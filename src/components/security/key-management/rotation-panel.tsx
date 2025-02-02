import { useState } from "react";
import { Key, RotateCw } from "lucide-react";
import { KeyManager } from "@/lib/security";

export function RotationPanel() {
  const [isRotating, setIsRotating] = useState(false);

  const handleRotateKeys = async () => {
    setIsRotating(true);
    try {
      const keyManager = await KeyManager.getInstance();
      // Implement key rotation logic
    } finally {
      setIsRotating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Key Management</h2>
        <Key className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        <button
          onClick={handleRotateKeys}
          disabled={isRotating}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <RotateCw className={`h-4 w-4 ${isRotating ? "animate-spin" : ""}`} />
          <span>{isRotating ? "Rotating Keys..." : "Rotate Keys"}</span>
        </button>
      </div>
    </div>
  );
}
