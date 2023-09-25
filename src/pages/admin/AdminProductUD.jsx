import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FetchProducts, ProductUpdate } from "../../backend-API-services/api";
import useCategories from "../../hooks/useCategories";
import AdminSideNavbar from "../../components/navbar/adminSideNavbar";
import { BsArrowLeft } from "react-icons/bs";

const AdminProductUD = () => {
	const [categories] = useCategories();
	const navigate = useNavigate();
	const [selectedImage, setSelectedImage] = useState(null);
	const location = useLocation();
	const { _id, name, description, price, category, shipping, quantity } =
		location.state || {};
	const [products, setProducts] = useState([]);

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			const data = await FetchProducts();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: name || "",
			description: description || "",
			price: price || 0,
			category: category ? category._id : "",
			quantity: quantity || 0,
			shipping: shipping || "",
			photo: null,
		},
		onSubmit: async (values) => {
			// console.log(values);
			try {
				const formData = new FormData();
				formData.append("name", values.name);
				formData.append("description", values.description);
				formData.append("price", values.price);
				formData.append("category", values.category);
				formData.append("quantity", values.quantity);
				formData.append("shipping", values.shipping);
				formData.append("photo", values.photo);
				// console.log(values.photo);

				if (_id && formData) {
					const data = await ProductUpdate(_id, formData);
					toast.success(`"${data.name}" is updated`);
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
					<button
						className="btn btn-secondary btn-md fs-6"
						onClick={() => {
							navigate("/dashboard/admin/all-products");
						}}
					>
						{" "}
						<BsArrowLeft
							style={{ fontSize: "1.2rem", marginRight: "4px" }}
						/>{" "}
						Back
					</button>
					<div className="card py-3 px-5">
						{selectedImage ? (
							<div className="text-center my-2 p-3">
								<img
									className="img-fluid rounded"
									src={URL.createObjectURL(selectedImage)}
									alt="product photo"
									style={{ height: "300px" }}
								/>
							</div>
						) : (
							<div className="text-center my-2 p-3">
								<img
									src={`${
										import.meta.env.VITE_API
									}/product/photo/${_id}?timestamp=${new Date().getTime()}`}
									alt={name}
									className="img-fluid rounded"
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
							<div className="col-12 mb-5 d-flex justify-content-between">
								<button
									type="submit"
									className="btn btn-primary w-100"
								>
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminProductUD;
