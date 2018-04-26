import { boot } from "hrx";
import routes from "./routes";
let { NODE_ENV } = process.env;

boot({
  rootEl: document.getElementById("root"),
  debug: NODE_ENV !== "production",
  routes
});
