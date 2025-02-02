import { useState } from "react";
import { ChainConfig } from "@/types/multi-chain";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Settings, Save, RefreshCcw } from "lucide-react";

interface NetworkSettingsProps {
  chainId: string;
  chainConfig: ChainConfig;
}

export const NetworkSettings = ({
  chainId,
  chainConfig,
}: NetworkSettingsProps) => {
  const [settings, setSettings] = useState({
    rpcUrl: chainConfig.rpcUrl,
    bridgeAddress: chainConfig.bridgeAddress,
    customGasPrice: "",
    maxGasLimit: "2000000",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      // Implement settings save logic
      console.log("Saving settings:", settings);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to save settings:", error);
      setError("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings({
      rpcUrl: chainConfig.rpcUrl,
      bridgeAddress: chainConfig.bridgeAddress,
      customGasPrice: "",
      maxGasLimit: "2000000",
    });
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>{chainConfig.name} Network Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                RPC URL
              </label>
              <input
                type="text"
                value={settings.rpcUrl}
                onChange={(e) =>
                  setSettings({ ...settings, rpcUrl: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-500">
                The RPC endpoint used to connect to the network
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bridge Address
              </label>
              <input
                type="text"
                value={settings.bridgeAddress}
                onChange={(e) =>
                  setSettings({ ...settings, bridgeAddress: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-500">
                The bridge contract address for cross-chain operations
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Custom Gas Price (Gwei)
              </label>
              <input
                type="text"
                value={settings.customGasPrice}
                onChange={(e) =>
                  setSettings({ ...settings, customGasPrice: e.target.value })
                }
                placeholder="Leave empty for network default"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-500">
                Optional: Set a custom gas price for transactions
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Gas Limit
              </label>
              <input
                type="text"
                value={settings.maxGasLimit}
                onChange={(e) =>
                  setSettings({ ...settings, maxGasLimit: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              <p className="mt-1 text-sm text-gray-500">
                Maximum gas limit for transactions
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleReset}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
