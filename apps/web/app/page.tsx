"use client";

import { useGlobalStore } from "@seller-turbo/ui/providers/RootProvider";
import { useTheme } from "@repo/ui/providers/theme/ThemeContext";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { colors, theme } = useTheme();
  const count = useGlobalStore((state: any) => state.count);
  const increment = useGlobalStore((state: any) => state.increment);

  const { data } = useQuery({
    queryKey: ["example"],
    queryFn: () => fetch("/api/example").then((res) => res.json()),
  });

  return (
    <main
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <h1 style={{ color: colors.primary[500] }}>Current Theme: {theme}</h1>
      {/* <ThemeToggle /> */}
      <button onClick={increment}>Count: {count}</button>
    </main>
  );
}
