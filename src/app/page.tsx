"use client";

import { WidgetTable } from "@/components";
import { DialogWrapper } from "@/components/dialogs/dialog-wrapper";
import { WidgetProvider } from "@/widget-context";

export default function Home() {
  return (
    <WidgetProvider>
      <h1 className="p-6 border-b border-slate-400">Tech Test</h1>
      <main className="p-6">
        <DialogWrapper />
        <WidgetTable />
      </main>
    </WidgetProvider>
  );
}
