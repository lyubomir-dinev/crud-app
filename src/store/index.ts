import { Widget, Widgets } from "@/types";
const db = "http://localhost:3000/widgets";

export const api = {
  getWidgets: async (): Promise<Widgets> => {
    try {
      return fetch(db, {
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
  createWidget: async (widget: Widget): Promise<Widget> => {
    return fetch(db, {
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
    return fetch(`${db}/${widget.id}`, {
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
    return fetch(`${db}/${widget.id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then(() => true)
      .catch(() => false);
  },
};
