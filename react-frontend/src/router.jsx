import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound';
import Preference from './pages/Preference/Preference';
import Register from './pages/Register/Register';
import About from './pages/About/About';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Auth />
    },
    {
        path: '/preference',
        element: <Preference />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;
