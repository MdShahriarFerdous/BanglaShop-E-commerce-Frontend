import { useFormik } from "formik";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { RegisterAPI } from "../backend-API-services/api";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
	const [auth, setAuth] = useAuth();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: object({
			name: string().min(4, "Minimum 4 characters long").required(),
			email: string().email("Must be valid email").required(),
			password: string().min(6, "Minimum 6 characters long").required(),
		}),
		onSubmit: async (values, { resetForm }) => {
			const data = await RegisterAPI(values);
			localStorage.setItem("auth", JSON.stringify(data));
			setAuth({ ...auth, user: data.user, token: data.token });
			toast.success("Registration successful");
			// console.log(data);
			navigate("/dashboard");
			resetForm({
				values: "",
			});
		},
	});

	return (
		<div className="container mt-5">
			<form className="form-group " onSubmit={formik.handleSubmit}>
				<div className="row d-flex py-4 justify-content-center">
					<div className="col-lg-6">
						<div className="card p-5">
							<h1 className="card-title mb-4 text-center">
								Register
							</h1>
							<input
								type="text"
								className="form-control my-2 py-3"
								placeholder="Name"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
							/>
							{formik.touched.name && formik.errors.name && (
								<span className="text-danger my-1 ms-2">
									&#9432; {formik.errors.name}
								</span>
							)}
							<input
								type="email"
								className="form-control my-2 py-3"
								placeholder="Email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
							{formik.touched.email && formik.errors.email && (
								<span className="text-danger my-1 ms-2">
									&#9432; {formik.errors.email}
								</span>
							)}
							<input
								type="password"
								className="form-control my-2 py-3"
								placeholder="Password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
							/>
							{formik.touched.password &&
								formik.errors.password && (
									<span className="text-danger my-1 ms-2">
										&#9432; {formik.errors.password}
									</span>
								)}
							<button
								type="submit"
								className="btn bg-gradient-primary my-2"
							>
								Register
							</button>
							<p className="text-center mt-2">
								Already have an account?
								<Link className="text-info ms-2" to="/login">
									Login
								</Link>
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegisterPage;
