import React, { useState, useEffect } from "react";
import { AdminCheck } from "../../backend-API-services/api";
import { Outlet } from "react-router-dom";
import Loading from "../loader/Loading";
import { useAuth } from "../../context/authContext";

const AdminPrivateRoute = () => {
	const [hasToken, setHasToken] = useState(false);
	const [auth, setAuth] = useAuth();
	// console.log("from adminprivate route");
	useEffect(() => {
		const isAdmin = async () => {
			const data = await AdminCheck();
			if (data.ok) {
				setHasToken(true);
			} else {
				setHasToken(false);
			}
		};
		auth?.token && isAdmin(); //calling the isAdmin() function here.
	}, [auth?.token]);

	return hasToken ? <Outlet /> : <Loading />;
};

export default AdminPrivateRoute;
