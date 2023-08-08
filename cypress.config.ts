import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2h533p",
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    projectId: "2h533p",
  },
  port: 3003,
});
