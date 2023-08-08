import { Widget } from "../../../common/types";
import {
  Dialog,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
  DialogTrigger,
} from "..";
import { useWidget } from "@/widget-context";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useEffect, useState } from "react";

export const EditWidget = () => {
  const { state, dispatch } = useWidget();
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    if (state.selectedWidget != undefined) {
      form.setValue("manufacturer", state.selectedWidget.manufacturer);
      form.setValue("name", state.selectedWidget.name);
      form.setValue("stockLevel", state.selectedWidget.stockLevel.toString());
    }
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          className="rounded"
          disabled={state.selectedWidget == undefined}
          onClick={() => {
            setOpen(true);
          }}
          id="update-widget-trigger"
        >
          Edit Widget
        </Button>
      </DialogTrigger>
      {state.selectedWidget ? (
        <DialogContent className="sm:max-w-[425px] border rounded">
          <DialogHeader>
            <DialogTitle>Widget information</DialogTitle>
            <DialogDescription>
              Provide the necessary data to update the widget.
            </DialogDescription>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                dispatch({
                  payload: {
                    ...values,
                    stockLevel: Number.parseInt(values.stockLevel),
                    id: (state.selectedWidget as Widget).id,
                  },
                  type: "update",
                });
                setOpen(false);
              })}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem itemType="">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Widget" {...field} id="name" />
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
                      <Input {...field} id="manufacturer" />
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
                      <Input
                        placeholder="0"
                        {...field}
                        type="number"
                        id="stockLevel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit" id="update-widget-dialog-submit">
                  Submit
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};
