export type Widget = {
  id: string;
  name: string;
  manufacturer: string;
  stockLevel: number;
};

export type WidgetDispatchActionType =
  | "create"
  | "update"
  | "delete"
  | "triggerUpdate"
  | "triggerDelete"
  | "cancelUpdate"
  | "cancelDelete";

export type WidgetDispatchAction = {
  type: WidgetDispatchActionType;
  payload: Widget;
};

export type WidgetDispatch = (action: WidgetDispatchAction) => void;

export type WidgetState = {
  widgets: Widget[];
  selectedWidget?: Widget;
  action?: "updating" | "deleting";
};
