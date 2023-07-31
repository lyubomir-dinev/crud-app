import { Widget } from "@/types";
import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Label,
  Input,
  DialogFooter,
} from "..";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWidget } from "@/widget-context";

export interface CreateWidgetProps {
  widget?: Widget;
}

export const CreateWidget = ({ widget }: CreateWidgetProps) => {
  const [name, setName] = useState(widget ? widget.name : "");
  const [manufacturer, setManufacturer] = useState(
    widget ? widget.manufacturer : ""
  );
  const [stockLevel, setStockLevel] = useState(widget ? widget.stockLevel : 0);
  const { dispatch } = useWidget();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={widget ? "ghost" : "outline"} className="rounded">
          {widget ? "Edit" : "Create"} Widget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border rounded">
        <DialogHeader>
          <DialogTitle>Widget info</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you`re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              className="col-span-3 rounded"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Manufacturer
            </Label>
            <Input
              id="manufacturer"
              value={manufacturer}
              className="col-span-3 rounded"
              onChange={(e) => setManufacturer(e.currentTarget.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Stock level
            </Label>
            <Input
              type="number"
              id="stockLevel"
              value={stockLevel}
              className="col-span-3 rounded"
              onChange={(e) =>
                setStockLevel(Number.parseInt(e.currentTarget.value))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              dispatch({
                payload: {
                  manufacturer,
                  name,
                  stockLevel,
                  id: widget ? widget.id : uuidv4(),
                },
                type: widget ? "update" : "create",
              })
            }
          >
            Submit widget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
