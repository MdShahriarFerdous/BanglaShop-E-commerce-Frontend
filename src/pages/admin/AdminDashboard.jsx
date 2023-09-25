import React from "react";
import { useAuth } from "../../context/authContext";
import Jumbotron from "../../components/jumbotron/Jumbotron";
import AdminSideNavbar from "../../components/navbar/adminSideNavbar";
import { RxAvatar } from "react-icons/rx";
const AdminDashboard = () => {
	const [auth, setAuth] = useAuth();

	return (
		<div className="container-fluid" style={{ padding: "0", margin: "0" }}>
			<div className="row gx-5" style={{ padding: "0", margin: "0" }}>
				<div className="col-lg-3 shadow">
					<AdminSideNavbar />
				</div>
				<div className="col-lg-9 mt-4">
					<Jumbotron
						title={`Welcome ${auth?.user?.name}`}
						subTitle="Admin Dashboard"
					/>
					<div className="card mt-4" style={{ width: "70vw" }}>
						<div className="card-body">
							<h4 className="card-text mb-4">
								<RxAvatar
									style={{
										marginBottom: "2px",
										marginRight: "8px",
									}}
								/>
								Admin Info
							</h4>
							<p className="lead">{`Name: ${auth?.user?.name}`}</p>
							<p className="lead">{`Email: ${auth?.user?.email}`}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
