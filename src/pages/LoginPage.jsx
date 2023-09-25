import { useFormik } from "formik";
import { object, string } from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginAPI } from "../backend-API-services/api";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
	const [auth, setAuth] = useAuth();

	const navigate = useNavigate();
	const location = useLocation();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: object({
			email: string().email("Must be valid email").required(),
			password: string().min(6, "Minimum 6 characters long").required(),
		}),
		onSubmit: async (values, { resetForm }) => {
			const data = await LoginAPI(values);
			localStorage.setItem("auth", JSON.stringify(data));
			setAuth({ ...auth, user: data.user, token: data.token });
			toast.success("Login successful");

			navigate(
				location.state ||
					`/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
			);
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
								Login
							</h1>
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
								Login
							</button>
							<p className="text-center mt-2">
								New Here?
								<Link className="text-info ms-2" to="/register">
									Register
								</Link>
							</p>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
