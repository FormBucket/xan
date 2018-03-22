let routes = [
  {
    path: "/",
    load: () => System.import("./home")
  },
  {
    path: "/rules",
    load: () => System.import("./rules")
  },
  {
    path: "*",
    component: props => "No Page Found"
  }
];

export default routes;
