import { useEffect, useState } from "react";
import { ViralContent } from "@/types/social";
import { Star, Share2 } from "lucide-react";

export const ViralContentList = () => {
  const [content, setContent] = useState<ViralContent[]>([]);

  useEffect(() => {
    // Fetch viral content implementation
  }, []);

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">{item.content}</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(item.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Share2 className="h-4 w-4 text-blue-500" />
              <span>{item.shares}</span>
            </div>
            <span>{item.engagement}% engagement</span>
          </div>
        </div>
      ))}
    </div>
  );
};
