import { Widget } from "@/types";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "..";
import { useState } from "react";
import { useWidget } from "@/widget-context";

export interface DeleteWidgetProps {
  widget: Widget;
}

export const DeleteWidget = ({ widget }: DeleteWidgetProps) => {
  const [open, setOpen] = useState(true);
  const { dispatch } = useWidget();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] border rounded">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You are about to delete <b>{widget.name}</b> from{" "}
            <b>{widget.manufacturer}</b> with current stock of{" "}
            <b>{widget.stockLevel}</b>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-1 items-end">
          <Button
            variant="destructive"
            onClick={() => {
              dispatch({
                type: "delete",
                payload: widget,
              });
              setOpen(false);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setOpen(false)}>No</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
