import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from './../pages/home.tsx'
import Category from '../pages/category.tsx';
import App from '../App.tsx';

export default createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: '/categories/:category/:subCategory',
                element: <Category />
            }
        ]
    },
]);
