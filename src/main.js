import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/theme.css';
import Concierge from "./pages/Concierge";
import Discover from "./pages/Discover";
import Quiz from "./pages/Quiz";
import Rewards from "../src/pages/Rewards";
import Mentors from "../src/pages//Mentors";
import Wallet from "../src/pages//Wallet";
const router = createBrowserRouter([
    { path: "/", element: _jsx(Discover, {}) },
    { path: "/quiz", element: _jsx(Quiz, {}) },
    { path: "/concierge", element: _jsx(Concierge, {}) },
    { path: "/rewards", element: _jsx(Rewards, {}) },
    { path: "/mentors", element: _jsx(Mentors, {}) },
    { path: "/wallet", element: _jsx(Wallet, {}) },
]);
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
