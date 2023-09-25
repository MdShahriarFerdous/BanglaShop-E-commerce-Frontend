import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateCategory } from "../../backend-API-services/api";

const CategoryForm = ({ loadCategories }) => {
	const formik = useFormik({
		initialValues: {
			name: "",
		},
		onSubmit: async (values, { resetForm }) => {
			try {
				const data = await CreateCategory(values);

				if (data) {
					loadCategories();
					resetForm({
						name: "",
					});
					toast.success(`"${data.name}" is created`);
				}
			} catch (error) {
				console.error(error); // Log the actual error for debugging
				toast.error("Failed to create the category. Please try again.");
			}
		},
	});
	return (
		<div>
			<form className="form-group" onSubmit={formik.handleSubmit}>
				<input
					type="text"
					className="form-control p-3"
					placeholder="Write category name"
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
				/>
				<button
					type="submit"
					className="btn bg-gradient-primary btn-lg mt-4 submit-button shadow-sm"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CategoryForm;
