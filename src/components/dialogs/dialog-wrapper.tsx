import { useWidget } from "@/widget-context";
import { useEffect, useState } from "react";
import { DeleteWidget } from "./delete-widget";
import { EditWidget } from "./edit-widget";
import { Widget } from "@/types";

export const DialogWrapper = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { state } = useWidget();

  useEffect(() => {
    if (state.action) {
      setShowEdit(state.action == "updating");
      setShowDelete(state.action == "deleting");
    }
  }, [state]);
  return (
    <>
      {showEdit && <EditWidget widget={state.selectedWidget} />}
      {showDelete && <DeleteWidget widget={state.selectedWidget as Widget} />}
    </>
  );
};
