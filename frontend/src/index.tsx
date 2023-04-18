import React from 'react'

import {
	createHashRouter,
	RouterProvider,
} from "react-router-dom";

import { createRoot } from "react-dom/client";

import Login from './components/pages/Login'
import ForgotPassword from './components/pages/ForgotPassword'
import ResetPassword from './components/pages/ResetPassword'

import User from './components/pages/User'
import Users from './components/pages/Users'

import Product from './components/pages/Product'
import Products from './components/pages/Products'

import Options from './components/pages/Options'
import About from './components/pages/About'
import TermsOfUse from './components/pages/TermsOfUse'

import GlobalStyle from './style';

const router = createHashRouter([
	{ path: '/', element: <Login /> },
	{ path: '/login', element: <Login /> },
	{ path: '/options', element: <Options /> },
	{ path: '/forgot-password', element: <ForgotPassword /> },
	{ path: '/reset-password', element: <ResetPassword /> },
	{ path: '/users', element: <Users /> },
	{ path: '/user', element: <User /> },
	{ path: '/product', element: <Product /> },
	{ path: '/products', element: <Products /> },
	{ path: '/about', element: <About /> },
	{ path: '/terms-of-use', element: <TermsOfUse /> }
])

createRoot(document.getElementById("root") as Element).render(
	<>
		<GlobalStyle />
		<RouterProvider router={router} />
	</>
)
