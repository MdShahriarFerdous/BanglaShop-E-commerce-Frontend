import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavMenu from "./components/navbar/Navbar";
import PrivateRoute from "./components/routes/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import SecretPage from "./pages/user/SecretPage";
import AdminPrivateRoute from "./components/routes/AdminPrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminViewProducts from "./pages/admin/AdminViewProducts";
import AdminProductUD from "./pages/admin/AdminProductUD";

const App = () => {
	return (
		<BrowserRouter>
			<NavMenu />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				{/* User dashboard */}
				<Route path="/dashboard" element={<PrivateRoute />}>
					<Route path="user" element={<UserDashboard />} />
					<Route path="secret" element={<SecretPage />} />
				</Route>
				{/* Admin dashboard */}
				<Route path="/dashboard" element={<AdminPrivateRoute />}>
					<Route path="admin" element={<AdminDashboard />} />
					<Route path="admin/category" element={<AdminCategory />} />
					<Route path="admin/product" element={<AdminProduct />} />
					<Route
						path="admin/all-products"
						element={<AdminViewProducts />}
					/>
					<Route
						path="admin/product/update-delete/:slug"
						element={<AdminProductUD />}
					/>
				</Route>

				<Route path="*" element={<PageNotFound />} replace />
			</Routes>
			<ToastContainer />
		</BrowserRouter>
	);
};

export default App;
