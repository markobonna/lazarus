import { useEffect, useState } from "react";
import { Interaction } from "@/types/social";
import { MessageCircle } from "lucide-react";

export const InteractionList = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  useEffect(() => {
    // Fetch interactions implementation
  }, []);

  return (
    <div className="space-y-4">
      {interactions.map((interaction) => (
        <div
          key={interaction.id}
          className="flex items-center p-4 border rounded-lg"
        >
          <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
          <div>
            <p className="font-medium">{interaction.content}</p>
            <p className="text-sm text-gray-600">
              via {interaction.platform} •{" "}
              {new Date(interaction.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
