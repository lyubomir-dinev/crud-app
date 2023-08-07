import { useReducer, createContext, useContext, ReactNode } from "react";
import {
  WidgetState,
  WidgetDispatchAction,
  WidgetDispatch,
  Widget,
  Widgets,
} from "../common/types";
import { api } from "./store";

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
    case "init":
      return {
        ...state,
        widgets: action.payload as Widgets,
      };
    case "create":
      api.createWidget(action.payload as Widget);
      return {
        ...state,
        widgets: [...state.widgets, action.payload as Widget],
      };
    case "update":
      api.updateWidget(action.payload as Widget);
      return {
        ...state,
        widgets: state.widgets.map((w) =>
          w.id == (action.payload as Widget).id ? (action.payload as Widget) : w
        ),
        selectedWidget: action.payload as Widget,
      };
    case "delete":
      api.deleteWidget(action.payload as Widget);
      return {
        ...state,
        widgets: state.widgets.filter(
          (w) => w.id != (action.payload as Widget).id
        ),
      };
    case "widgetSelected":
      return {
        ...state,
        selectedWidget: action.payload as Widget,
      };
    case "widgetDeselected":
      return {
        ...state,
        selectedWidget: undefined,
      };
  }
}

type WidgetProviderProps = {
  children: React.ReactNode;
};

function WidgetProvider({ children }: WidgetProviderProps) {
  const [state, dispatch] = useReducer(widgetReducer, { widgets: [] });

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
