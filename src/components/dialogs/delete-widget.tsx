import { Widget } from "@/types";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "..";

export interface DeleteWidgetProps {
  widget: Widget;
  onConfirm: () => void;
  open: boolean;
}

export const DeleteWidget = ({
  widget,
  onConfirm,
  open,
}: DeleteWidgetProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] border rounded">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="flex gap-1 items-end">
          <Button variant="destructive">Yes</Button>
          <Button>No</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
