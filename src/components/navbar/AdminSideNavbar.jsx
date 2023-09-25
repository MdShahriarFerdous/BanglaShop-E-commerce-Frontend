import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import "./sidenavbar.css";

const AdminSideNavbar = () => {
	const [activeMenuItem, setActiveMenuItem] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const path = location.pathname;
		switch (true) {
			case path === "/dashboard/admin/category":
				setActiveMenuItem(0);
				break;
			case path === "/dashboard/admin/product":
				setActiveMenuItem(1);
				break;
			case path.startsWith("/dashboard/admin/all-products"):
				setActiveMenuItem(2);
				break;
			default:
				setActiveMenuItem(null);
		}
	}, [location]);

	const handleMenuItemClick = (index) => {
		setActiveMenuItem(index);
	};

	return (
		<div className="d-flex flex-column flex-shrink-0 pt-5">
			<ul
				className="list-group p-3"
				style={{ height: "80vh", listStyleType: "none" }}
			>
				<li
					className={`m-3 list ${
						activeMenuItem === 0 ? "active-menu-item" : ""
					}`}
					onClick={() => handleMenuItemClick(0)}
				>
					<NavLink
						to="/dashboard/admin/category"
						style={{ color: activeMenuItem === 0 ? "white" : "" }}
						className="d-block navlink-hover"
					>
						<AiOutlinePlus style={{ marginRight: "8px" }} /> Create
						Category
					</NavLink>
				</li>

				<li
					className={`m-3 list ${
						activeMenuItem === 1 ? "active-menu-item" : ""
					}`}
					onClick={() => handleMenuItemClick(1)}
				>
					<NavLink
						style={{ color: activeMenuItem === 1 ? "white" : "" }}
						className="d-block navlink-hover"
						to="/dashboard/admin/product"
					>
						<AiOutlinePlus style={{ marginRight: "8px" }} /> Create
						Product
					</NavLink>
				</li>

				<li
					className={`m-3 list ${
						activeMenuItem === 2 ? "active-menu-item" : ""
					}`}
					onClick={() => handleMenuItemClick(2)}
				>
					<NavLink
						style={{ color: activeMenuItem === 2 ? "white" : "" }}
						className="d-block navlink-hover"
						to="/dashboard/admin/all-products"
					>
						<BsBox style={{ marginRight: "8px" }} /> Products
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default AdminSideNavbar;
