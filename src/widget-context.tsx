import { createContext, ReactNode, useContext, useState } from "react";
import { Widget, Widgets, WidgetMutable } from "../common/types";
import { api } from "./effects";

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

export const WidgetContext = createContext<
  | {
      state: WidgetState;
      dispatch: WidgetDispatch;
    }
  | undefined
>(undefined);

async function widgetReducer(
  state: WidgetState,
  action: WidgetDispatchAction
): Promise<WidgetState> {
  switch (action.type) {
    case "init":
      return {
        ...state,
        widgets: action.payload as Widgets,
      };
    case "create":
      const createdWidget = await api.createWidget(
        action.payload as WidgetMutable
      );
      return {
        ...state,
        widgets: [...state.widgets, createdWidget],
      };
    case "update":
      const updatedWidget = await api.updateWidget(action.payload as Widget);
      return {
        ...state,
        widgets: state.widgets.map((w) =>
          w.id == updatedWidget.id ? updatedWidget : w
        ),
        selectedWidget: action.payload as Widget,
      };
    case "delete":
      const success = await api.deleteWidget(action.payload as Widget);
      if (success) {
        return {
          ...state,
          widgets: state.widgets.filter(
            (w) => w.id != (action.payload as Widget).id
          ),
        };
      }
      return {
        ...state,
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
  const [state, setState] = useState<WidgetState>({ widgets: [] });

  const dispatch: WidgetDispatch = async (action) => {
    const result = await widgetReducer(state, action);
    setState(result);
  };

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
