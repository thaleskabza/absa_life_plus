import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/theme.css';
import Concierge from "./pages/Concierge";
import Discover from "./pages/Discover";
import Quiz from "./pages/Quiz";
import Rewards from "../src/pages/Rewards";
import Mentors from "../src/pages/Mentors";
import Wallet from "../src/pages/Wallet";
import RetailBank from "./pages/RetailBank";

const router = createBrowserRouter([
  { path: "/", element: <RetailBank/> },
  { path: "/quiz", element: <Quiz/> },
  { path: "/concierge", element: <Concierge/> },
  { path: "/rewards", element: <Rewards/> },
  { path: "/mentors", element: <Mentors/> },
  { path: "/wallet", element: <Wallet/> },
  { path: "/offers", element: <Discover/> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><RouterProvider router={router}/></React.StrictMode>
);
