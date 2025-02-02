import { ReactNode } from "react";

interface MultiChainLayoutProps {
  children: ReactNode;
}

export default function MultiChainLayout({ children }: MultiChainLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
