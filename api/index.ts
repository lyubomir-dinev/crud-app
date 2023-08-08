import express from "express";
import cors from "cors";
import { Widget, WidgetMutable, Widgets } from "../common/types";
import { v4 as uuid4 } from "uuid";

const PORT = 3002;

const DB_URL = `http://localhost:3001`;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/getWidgets", async (req, res) => {
  let widgets: Widgets = [];
  try {
    widgets = await fetch(`${DB_URL}/widgets`, {
      mode: "cors",
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Error fetching widgets");
        }
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
    widgets = [];
  }

  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(widgets));
});

app.post("/createWidget", async (req, res) => {
  const widgetPayload = req.body as WidgetMutable;
  widgetPayload.id = uuid4();

  const createdWidget = await fetch(`${DB_URL}/widgets`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(widgetPayload),
  })
    .then((res) => res.json())
    .then((json) => json as Widget);

  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(createdWidget));
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.delete("/deleteWidget/:id", async (req, res) => {
  const id = req.params.id;

  const success = await fetch(`${DB_URL}/widgets/${id}`, {
    method: "DELETE",
    mode: "cors",
  })
    .then(() => true)
    .catch(() => false);

  res.set("Content-Type", "application/json");
  res.send(JSON.stringify({ success }));
});

app.put("/updateWidget", async (req, res) => {
  const widgetPayload = req.body as Widget;

  const updatedWidget = await fetch(`${DB_URL}/widgets/${widgetPayload.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "PUT",
    body: JSON.stringify(widgetPayload),
  })
    .then((res) => res.json())
    .then((json) => json as Widget);

  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(updatedWidget));
});

export default app;
