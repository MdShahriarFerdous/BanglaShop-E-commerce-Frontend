import React, { useState } from "react";
import AdminSideNavbar from "../../components/navbar/adminSideNavbar";
import useCategories from "./../../hooks/useCategories";
import { useFormik } from "formik";
import { CreateProduct } from "../../backend-API-services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
	const [categories] = useCategories();
	const navigate = useNavigate();
	const [selectedImage, setSelectedImage] = useState(null);
	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			price: "",
			category: "",
			quantity: "",
			photo: null,
			shipping: "",
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				const formData = new FormData();
				formData.append("name", values.name);
				formData.append("description", values.description);
				formData.append("price", values.price);
				formData.append("category", values.category);
				formData.append("quantity", values.quantity);
				formData.append("shipping", values.shipping);
				formData.append("photo", values.photo);

				const data = await CreateProduct(formData);

				if (data) {
					toast.success(`"${data.name}" is created`);
					navigate("/dashboard/admin/all-products");
				}
			} catch (error) {
				console.error(error); // Log the actual error for debugging
				toast.error("Failed to create the Product. Please try again.");
			}
		},
	});

	const handleImageChange = (e) => {
		const file = e.currentTarget.files[0];
		setSelectedImage(file); // Set the selected image in the state
		formik.setFieldValue("photo", file); // Set the selected image in formik values
	};

	return (
		<div className="container-fluid" style={{ padding: "0", margin: "0" }}>
			<div className="row gx-5" style={{ padding: "0", margin: "0" }}>
				<div className="col-lg-3 shadow">
					<AdminSideNavbar />
				</div>
				<div className="col-lg-8 mt-5 mx-auto">
					<div className="card py-3 px-5">
						<h1 className="card-title mt-3 mb-3">Create Product</h1>

						{selectedImage && (
							<div className="text-center my-2 p-3">
								<img
									className="img-fluid rounded"
									src={URL.createObjectURL(selectedImage)}
									alt="product photo"
									style={{ height: "300px" }}
								/>
							</div>
						)}
						<form
							className="form-group my-2"
							onSubmit={formik.handleSubmit}
							encType="multipart/form-data"
						>
							<label className="btn btn-outline-secondary mb-3 d-grid p-3">
								{selectedImage
									? selectedImage.name
									: "Upload photo"}
								<input
									type="file"
									className="form-control"
									accept="image/*"
									name="photo"
									onChange={handleImageChange}
									hidden
								/>
							</label>

							<input
								type="text"
								className="form-control mb-4 p-3"
								placeholder="Product name"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>

							<div className="form-floating mb-4">
								<textarea
									className="form-control"
									placeholder="Write description here"
									id="floatingTextarea"
									name="description"
									value={formik.values.description}
									onChange={formik.handleChange}
								></textarea>
								<label htmlFor="floatingTextarea">
									Description
								</label>
							</div>

							<input
								type="number"
								className="form-control mb-4 p-3"
								placeholder="Enter price"
								name="price"
								value={formik.values.price}
								onChange={formik.handleChange}
							/>

							<select
								className="form-select mb-4 p-3"
								placeholder="Select a category"
								name="category"
								value={formik.values.category}
								onChange={formik.handleChange}
							>
								<option>Select one category</option>
								{categories?.map((category) => {
									return (
										<option
											key={category._id}
											value={category._id}
										>
											{category.name}
										</option>
									);
								})}
							</select>

							<select
								className="form-select mb-4 p-3"
								placeholder="Choose shipping"
								name="shipping"
								value={formik.values.shipping}
								onChange={formik.handleChange}
							>
								<option>Select one option</option>
								<option value="0">No</option>
								<option value="1">Yes</option>
							</select>

							<input
								type="number"
								min="1"
								placeholder="Enter quantity"
								className="form-control mb-4 p-3"
								name="quantity"
								value={formik.values.quantity}
								onChange={formik.handleChange}
							/>

							<button
								type="submit"
								className="btn btn-primary mb-5 col-12"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminProduct;
