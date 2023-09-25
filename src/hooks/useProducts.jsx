import { useState, useEffect } from "react";
import { FetchProducts } from "../backend-API-services/api";

const useProducts = () => {
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

	return { products, loadProducts };
};

export default useProducts;
