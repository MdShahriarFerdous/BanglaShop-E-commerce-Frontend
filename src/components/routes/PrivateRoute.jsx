import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import Loading from "../loader/Loading";

const PrivateRoute = () => {
	const [hasToken, setHasToken] = useState(false);
	const [auth, setAuth] = useAuth();

	useEffect(() => {
		if (auth?.token) {
			setHasToken(true);
		} else {
			setHasToken(false);
		}
	}, [auth?.token]);

	//here outlet means children inside parent route
	return hasToken ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
