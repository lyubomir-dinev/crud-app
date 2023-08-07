import { useWidget } from "@/widget-context";
import { useEffect, useState } from "react";
import { DeleteWidget } from "./delete-widget";
import { EditWidget } from "./edit-widget";
import { Widget } from "../../../common/types";
import { CreateWidget } from "./create-widget";

export const DialogWrapper = () => {
  return (
    <div className="flex gap-2">
      <CreateWidget />
      <EditWidget />
      <DeleteWidget />
    </div>
  );
};
