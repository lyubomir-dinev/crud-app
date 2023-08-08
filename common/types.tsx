export type Widget = {
  id: string;
  name: string;
  manufacturer: string;
  stockLevel: number;
};

export type WidgetMutable = Partial<Widget>;

export type Widgets = Widget[];

export type WidgetDispatchActionType =
  | "init"
  | "create"
  | "update"
  | "delete"
  | "widgetSelected"
  | "widgetDeselected";

export type WidgetDispatchAction = {
  type: WidgetDispatchActionType;
  payload: WidgetMutable | Widget | Widgets;
};

export type WidgetDispatch = (action: WidgetDispatchAction) => void;

export type WidgetState = {
  widgets: Widgets;
  selectedWidget?: Widget;
};
