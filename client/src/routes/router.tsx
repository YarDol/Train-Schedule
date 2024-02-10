import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/layout";
import Error404 from "../utils/error";
import Main from "../pages/main";
import Auth from "../pages/auth";
import Users from "../pages/users";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: "auth",
                element: <Auth />,
            },
            {
                path: "user",
                element: <Users/>
            }
        ]
    },
])