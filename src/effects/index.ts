import { Widget, WidgetMutable, Widgets } from "../../common/types";
const API_URL = "http://localhost:3002";

export const api = {
  getWidgets: async (): Promise<Widgets> => {
    try {
      return fetch(`${API_URL}/getWidgets`, {
        mode: "cors",
      })
        .then((res) => {
          return res.json();
        })
        .then((json: []) => {
          if (json.length > 0) {
            return json as Widgets;
          }
          return [];
        });
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  createWidget: async (widget: WidgetMutable): Promise<Widget> => {
    return fetch(`${API_URL}/createWidget`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(widget),
    })
      .then((res) => res.json())
      .then((json) => json as Widget);
  },
  updateWidget: async (widget: Widget): Promise<Widget> => {
    return await fetch(`${API_URL}/updateWidget`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      method: "PUT",
      body: JSON.stringify(widget),
    })
      .then((res) => res.json())
      .then((json) => json as Widget);
  },
  deleteWidget: async (widget: Widget): Promise<boolean> => {
    return fetch(`${API_URL}/deleteWidget/${widget.id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => json.success as boolean);
  },
};
