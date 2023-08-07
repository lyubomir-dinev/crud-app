import express from "express";

const app = express();
app.get("/getWidgets", (req, res) => {
  res.send("Hello World!");
});
app.delete("/deleteWidget/:id", (req, res) => {
  res.send("Hello World!");
});
app.put("/updateWidget/:id", (req, res) => {
  res.send("Hello World!");
});
app.post("/createWidget", (req, res) => {
  res.send("Hello World!");
});
app.listen(3002, () => {
  console.log("Listening on port 3000");
});
