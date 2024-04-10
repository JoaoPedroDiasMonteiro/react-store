import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../layouts/App.tsx';
import Login from '../pages/auth/login.tsx';
import Register from '../pages/auth/register.tsx';
import Category from '../pages/category.tsx';
import Error from '../pages/error.tsx';
import Home, { homeLoader } from '../pages/Home/Index.tsx';

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
                    const { ProductPage, productLoader } = await import('../pages/Product/Index.tsx')

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
