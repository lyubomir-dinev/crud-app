export type Widget = {
  id: string;
  name: string;
  manufacturer: string;
  stockLevel: number;
};

export type WidgetMutable = Partial<Widget>;

export type Widgets = Widget[];
