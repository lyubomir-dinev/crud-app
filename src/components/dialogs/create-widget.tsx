import {
  Dialog,
  DialogTrigger,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
} from "..";
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
import { useWidget } from "@/widget-context";

export const CreateWidget = () => {
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
      <DialogTrigger asChild>
        <Button
          id="create-widget-trigger"
          variant={"outline"}
          className="rounded"
        >
          Create Widget
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] border rounded"
        id="create-widget-dialog-content"
      >
        <DialogHeader>
          <DialogTitle>Widget information</DialogTitle>
          <DialogDescription>
            Provide the necessary data to create the widget.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              dispatch({
                payload: {
                  ...values,
                  stockLevel: Number.parseInt(values.stockLevel),
                },
                type: "create",
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
            <Button type="submit" id="create-widget-dialog-submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
