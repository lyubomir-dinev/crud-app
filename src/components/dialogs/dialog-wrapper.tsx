import { DeleteWidget } from "./delete-widget";
import { EditWidget } from "./edit-widget";
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
