"use client";

import { ReactQueryProvider } from "./react-queary-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
