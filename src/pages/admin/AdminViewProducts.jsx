import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import AdminSideNavbar from "../../components/navbar/adminSideNavbar";
import { FetchProducts, ProductDelete } from "../../backend-API-services/api";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AdminViewProducts = () => {
	const [products, setProducts] = useState([]);
	const [deleteId, setDeleteId] = useState("");

	useEffect(() => {
		loadProducts();
	}, [deleteId]);

	const loadProducts = async () => {
		try {
			const data = await FetchProducts();
			setProducts(data);
		} catch (error) {
			console.log(error);
		}
	};
	const truncateString = (str, num) => {
		if (str.length > num) return str.slice(0, num) + " .... ";
		else return str;
	};
	const handleDelete = async (id) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const deleteData = await ProductDelete(id);
					setDeleteId(id);
					if (deleteData) {
						Swal.fire(
							"Deleted!",
							"Your task has been deleted.",
							"success"
						);
					}
				}
			});
		} catch (error) {
			console.log(error);
			toast.error("Blog has not Deleted!");
		}
	};

	return (
		<div className="container-fluid" style={{ padding: "0", margin: "0" }}>
			<div className="row gx-5" style={{ padding: "0", margin: "0" }}>
				<div className="col-lg-3 shadow">
					<AdminSideNavbar />
				</div>
				<div className="col-lg-9 mt-5">
					<h1 className="card-title mt-3 mb-3">All Products</h1>
					<div className="row gx-5">
						{products &&
							products.map((product) => {
								const {
									_id,
									name,
									description,
									createdAt,
									price,
									slug,
									category,
									shipping,
									quantity,
								} = product;

								return (
									<div className="col-lg-6" key={_id}>
										<div className="card shadow mb-3 ">
											<Link
												to={`/dashboard/admin/product/update-delete/${slug}`}
												state={{
													_id,
													name,
													description,
													price,
													slug,
													category,
													shipping,
													quantity,
												}}
											>
												<div>
													<div
														style={{
															textAlign: "center",
															padding: "20px",
															width: "auto",
															height: "400px",
														}}
													>
														<img
															src={`${
																import.meta.env
																	.VITE_API
															}/product/photo/${_id}?timestamp=${new Date().getTime()}`}
															alt={name}
															className="img img-fluid rounded card-img-top"
															style={{
																maxWidth:
																	"100%",
																maxHeight:
																	"100%",
															}}
														/>
													</div>

													<div className="card-body">
														<h5 className="card-title">
															{name}
														</h5>
														<p className="text-lead">
															{`${price} BDT`}
														</p>
														<p className="card-text">
															{truncateString(
																description,
																100
															)}
														</p>
														<p className="card-text">
															<small className="text-muted">
																{moment(
																	createdAt
																).format(
																	"MMM Do YYYY"
																)}
															</small>
														</p>
													</div>
												</div>
											</Link>
											<div className="d-flex flex-row-reverse mb-2 pe-3 mx-2">
												<button
													className="btn btn-outline-danger"
													onClick={() => {
														handleDelete(_id);
													}}
													style={{
														fontSize: "0.9rem",
														width: "30%",
													}}
												>
													<AiOutlineDelete
														className="text-danger"
														style={{
															fontSize: "1rem",
															marginRight: "8px",
															marginBottom: "2px",
														}}
													/>
													Delete
												</button>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminViewProducts;
