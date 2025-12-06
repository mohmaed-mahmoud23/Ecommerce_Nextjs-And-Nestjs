"use client";

import React, { ReactNode } from "react";

import { Provider } from "react-redux"; // غير الاسم هنا
import { store } from "../../redux/store";

const ProvidersComponetns = ({ children }: { children: ReactNode }) => {
  // غير اسم component هنا
  return <Provider store={store}>{children}</Provider>;
};

export default ProvidersComponetns;
