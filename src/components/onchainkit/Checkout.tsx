"use client";

import {
  Checkout,
  CheckoutButton,
  CheckoutStatus,
} from "@coinbase/onchainkit/checkout";

export default function OnchainCheckout() {
  const handleCheckoutStatus = (status: any) => {
    const { statusName, statusData } = status;
    switch (statusName) {
      case "success":
        console.log("Payment successful!", statusData);
        break;
      case "pending":
        console.log("Payment pending...");
        break;
      case "error":
        console.error("Payment error:", statusData);
        break;
      default:
        console.log("Status:", statusName);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <Checkout productId="your-product-id" onStatus={handleCheckoutStatus}>
        <CheckoutButton
          coinbaseBranded
          text="Pay with Crypto"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        />
        <CheckoutStatus className="mt-4" />
      </Checkout>
    </div>
  );
}
