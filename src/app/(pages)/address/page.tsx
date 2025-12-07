import React, { Suspense } from "react";
import AddressFormClient from "./AddressFormClient";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <Suspense fallback={<p>Loading...</p>}>
        <AddressFormClient />
      </Suspense>
    </div>
  );
}
