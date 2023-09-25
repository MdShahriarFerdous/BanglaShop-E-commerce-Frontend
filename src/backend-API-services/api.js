import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Base_URL = "http://localhost:8000/api/v1/";

//* =========================Register API=========================
export const RegisterAPI = async (values) => {
	// let registerURL = Base_URL + "register";

	let postBody = {
		...values,
	};
	try {
		const { data } = await axios.post("/register", postBody);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Registration failed. Try again.");
	}
};

//* =========================Login API=========================
export const LoginAPI = async (values) => {
	// let LoginURL = Base_URL + "login";

	let postBody = {
		...values,
	};
	try {
		const { data } = await axios.post("/login", postBody);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Login failed. Try again.");
	}
};

//* =========================Admin check API=========================
export const AdminCheck = async () => {
	try {
		const { data } = await axios.get("/admin-check");
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Admin Check Failed.");
	}
};
//* =========================List of Categories API=========================
export const LoadCategories = async () => {
	try {
		const { data } = await axios.get("/categories");
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Categories load failed.");
	}
};

//* =========================Create Category API=========================
export const CreateCategory = async (values) => {
	try {
		const { data } = await axios.post("/category", { ...values });
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Creating category failed!.");
	}
};

//* =========================Update Category API=========================
export const UpdateCategory = async (updateName, id) => {
	try {
		const { data } = await axios.put(`/category/${id}`, {
			name: updateName,
		});
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Updating failed!.");
	}
};

//* =========================Delete Category API=========================
export const DeleteCategory = async (id) => {
	try {
		const { data } = await axios.delete(`/category/${id}`);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Deleting failed!.");
	}
};

//* =========================Create Product API=========================
export const CreateProduct = async (formData) => {
	try {
		const { data } = await axios.post("/create-product", formData);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Product creating failed");
	}
};

//* =========================Fetch All Products API=========================
export const FetchProducts = async () => {
	try {
		const { data } = await axios.get("/products");
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Product Fetching Failed!");
	}
};

//* =========================Products By Slug API=========================
export const ProductsBySlug = async (slug) => {
	try {
		const { data } = await axios.get(`/product/${slug}`);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Product Fetching By Slug Failed!");
	}
};

//* =========================Products Update API=========================
export const ProductUpdate = async (productId, formData) => {
	try {
		const { data } = await axios.put(`/product/${productId}`, formData);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Product Update failed!");
	}
};

//* =========================Products Delete API=========================
export const ProductDelete = async (id) => {
	try {
		const { data } = await axios.delete(`/product/${id}`);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error);
		toast.error("Product delete failed!");
	}
};
