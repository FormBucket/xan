import HomePage from "./home";

let routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "*",
    component: props => "No Page Found"
  }
];

export default routes;
