"use client";

import { CreateWidget, WidgetTable } from "@/components";
import { WidgetProvider } from "@/widget-context";

export default function Home() {
  return (
    <WidgetProvider>
      <h1 className="p-6 border-b border-slate-400">CRUD app</h1>
      <main className="p-6">
        <CreateWidget />
        <WidgetTable />
      </main>
    </WidgetProvider>
  );
}
