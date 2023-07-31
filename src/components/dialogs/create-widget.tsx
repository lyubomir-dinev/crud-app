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
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";

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

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name can't be blank",
    }),
    manufacturer: z.string().min(1, { message: "Manufacturer can't be blank" }),
    stockLevel: z.string().min(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      manufacturer: "",
      name: "",
      stockLevel: "0",
    },
  });

  return (
    <Dialog>
      {!widget && (
        <DialogTrigger asChild>
          <Button variant={widget ? "ghost" : "outline"} className="rounded">
            {widget ? "Edit" : "Create"} Widget
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] border rounded">
        <DialogHeader>
          <DialogTitle>Widget information</DialogTitle>
          <DialogDescription>
            Provide the necessary data to {widget ? "update" : "create"} the
            widget.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              dispatch({
                payload: {
                  ...values,
                  id: widget ? widget.id : uuidv4(),
                },
                type: widget ? "update" : "create",
              });
              form.reset();
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Widget" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock level</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
