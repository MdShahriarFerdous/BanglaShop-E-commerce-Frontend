import React, { useState, useEffect } from "react";
import { LoadCategories } from "../../backend-API-services/api";
import AdminSideNavbar from "../../components/navbar/adminSideNavbar";
import CategoryForm from "../../components/category-form/CategoryForm";
import { categoryAlert } from "../../components/category-form/categoryAlerts";

const AdminCategory = () => {
	const [categories, setCategories] = useState([]);
	// console.log(categories);
	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = async () => {
		try {
			const data = await LoadCategories();
			setCategories(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = (categoryName, categoryId) => {
		categoryAlert(categoryName, categoryId, loadCategories);
	};

	return (
		<div className="container-fluid" style={{ padding: "0", margin: "0" }}>
			<div className="row gx-5" style={{ padding: "0", margin: "0" }}>
				<div className="col-lg-3 shadow">
					<AdminSideNavbar />
				</div>
				<div className="col-lg-9 mt-5">
					<div className="card py-3 px-5">
						<h1 className="card-title mt-3 mb-3">
							Manage Categories
						</h1>
						<CategoryForm loadCategories={loadCategories} />
					</div>

					<div className="col mt-3">
						{categories &&
							categories.map((category) => {
								return (
									<button
										key={category._id}
										className="btn btn-outline-primary m-3 "
										onClick={() => {
											handleClick(
												category.name,
												category._id
											);
										}}
									>
										{category.name}
									</button>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminCategory;
