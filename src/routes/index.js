import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../layouts/App';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Category from '../pages/category';
import Error from '../pages/error';
import Home, { homeLoader } from '../pages/Home/Index';

export default createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                loader: homeLoader,
                index: true,
                element: <Home />
            },
            {
                path: '/categories/:category/:subCategory',
                element: <Category />
            },
            {
                path: '/product/:product',
                async lazy() {
                    const { ProductPage, productLoader } = await import('../pages/Product/Index')

                    return {
                        loader: productLoader,
                        Component: ProductPage,
                        errorElement: <Error />
                    }
                },
            },
            {
                path: '*',
                element: <Error />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
]);
