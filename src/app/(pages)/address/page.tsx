import React, { Suspense } from "react";
import AddressFormClient from "./AddressFormClient";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <AddressFormClient />
      </Suspense>
    </div>
  );
}
