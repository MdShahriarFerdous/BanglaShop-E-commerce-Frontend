import React from "react";
import { useAuth } from "../../context/authContext";
import Jumbotron from "../../components/jumbotron/Jumbotron";

const UserDashboard = () => {
	const [auth, setAuth] = useAuth();

	return (
		<div>
			<Jumbotron
				title={`Hello ${auth?.user?.name}`}
				subTitle="Dashboard"
			/>
		</div>
	);
};

export default UserDashboard;
