import { Widget } from "@/types";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "..";
import { useState } from "react";
import { useWidget } from "@/widget-context";

export const DeleteWidget = () => {
  const { state, dispatch } = useWidget();
  const [open, setOpen] = useState(false);

  const widget = state.selectedWidget as Widget;

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="rounded"
          disabled={widget == null || widget == undefined}
          onClick={() => setOpen(true)}
        >
          Delete Widget
        </Button>
      </DialogTrigger>
      {widget ? (
        <>
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
        </>
      ) : null}
    </Dialog>
  );
};
