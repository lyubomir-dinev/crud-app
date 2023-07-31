"use client";

import { CreateWidget, WidgetTable } from "@/components";
import { DeleteWidget } from "@/components/dialogs/delete-widget";
import { DialogWrapper } from "@/components/dialogs/dialog-wrapper";
import { EditWidget } from "@/components/dialogs/edit-widget";
import { WidgetProvider, useWidget } from "@/widget-context";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <WidgetProvider>
      <h1 className="p-6 border-b border-slate-400">CRUD App</h1>
      <main className="p-6">
        <CreateWidget />
        <WidgetTable />
        <DialogWrapper />
      </main>
    </WidgetProvider>
  );
}
