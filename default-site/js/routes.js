import { loader } from "hrx";

let routes = [
  {
    path: "/",
    component: loader(() => import('./home'))
  },
  {
    path: "*",
    component: loader(() => import('./404')) // page not found
  }
];

export default routes;
