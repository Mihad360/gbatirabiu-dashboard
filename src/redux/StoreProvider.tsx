// src/redux/StoreProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      {children}
    </Provider>
  );
}
