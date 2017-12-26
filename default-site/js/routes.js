let routes = [
  {
    path: "/",
    load: () => System.import("./home")
  },
  {
    path: "*",
    component: props => "No Page Found"
  }
];

export default routes;
