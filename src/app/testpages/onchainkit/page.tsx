import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { OCKIdentity } from "@/components/onchainkit/OCKIdentity";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

export default function OnchainKitTestPage() {
  return (
    <div className="space-y-4 p-6">
      <Heading level={1}>Hello World</Heading>
      <Text>Welcome to the OnchainKit Test Page</Text>
      <OCKIdentity />
      <WalletDefault />
    </div>
  );
}
