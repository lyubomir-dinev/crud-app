import {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  Context,
} from "react";
import {
  WidgetState,
  WidgetDispatchAction,
  WidgetDispatch,
  Widget,
} from "./types";

const data: Widget[] = [
  {
    id: "m5gr84i9",
    stockLevel: 316,
    name: "Optimus Prime",
    manufacturer: "Hardhead",
  },
  {
    id: "3u1reuv4",
    stockLevel: 242,
    name: "Peacemaker",
    manufacturer: "Shockwave",
  },
  {
    id: "derv1ws0",
    stockLevel: 837,
    name: "Predaking",
    manufacturer: "Krunk",
  },
  {
    id: "5kma53ae",
    stockLevel: 874,
    name: "Chop Shop",
    manufacturer: "Sinnertwin",
  },
  {
    id: "bhqecj4p",
    stockLevel: 721,
    name: "Downshift",
    manufacturer: "Hot Rod",
  },
];

export const WidgetContext = createContext<
  | {
      state: WidgetState;
      dispatch: WidgetDispatch;
    }
  | undefined
>(undefined);

function widgetReducer(
  state: WidgetState,
  action: WidgetDispatchAction
): WidgetState {
  switch (action.type) {
    case "create":
      //TODO: make the API call to CREATE the widget in the DB using the payload
      return { ...state, widgets: [...state.widgets, action.payload] };
    case "update":
      //TODO: make the API call to UPDATE the widget in the DB based on the payload
      return {
        ...state,
        widgets: state.widgets.map((w) =>
          w.id == action.payload.id ? action.payload : w
        ),
      };
    case "delete":
      //TODO: make the API call to DELETE the widget from the DB
      return {
        ...state,
        widgets: state.widgets.filter((w) => w.id != action.payload.id),
      };
    case "triggerDelete":
      console.log("triggerDelete", state);
      return { ...state, selectedWidget: action.payload, action: "deleting" };
    case "triggerUpdate":
      console.log("triggerUpdate", state);
      return { ...state, selectedWidget: action.payload, action: "updating" };
    case "cancelDelete":
    case "cancelUpdate":
      return { widgets: state.widgets };
  }
}

type WidgetProviderProps = {
  children: React.ReactNode;
};

function WidgetProvider({ children }: WidgetProviderProps) {
  const [state, dispatch] = useReducer(widgetReducer, { widgets: data });

  const value = { state, dispatch };

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
}

function WidgetConsumer({
  children,
}: {
  children: (context: {
    state: WidgetState;
    dispatch: WidgetDispatch;
  }) => ReactNode;
}) {
  return (
    <WidgetContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("CountConsumer must be used within a CountProvider");
        }
        return children(context);
      }}
    </WidgetContext.Consumer>
  );
}

function useWidget() {
  const context = useContext(WidgetContext);
  if (context == undefined) {
    throw new Error("useWidgets must be used within a WidgetProvider");
  }
  return context;
}

export { WidgetProvider, WidgetConsumer, useWidget };
