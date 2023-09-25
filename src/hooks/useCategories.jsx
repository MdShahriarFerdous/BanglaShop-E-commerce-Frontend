import { useState, useEffect } from "react";
import { LoadCategories } from "../backend-API-services/api";

const useCategories = () => {
	const [categories, setCategories] = useState([]);

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

	return [categories];
};

export default useCategories;
