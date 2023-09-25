import React, { useEffect, useState } from "react";
import loaderGIF from "../../assets/img/loader.gif";
import { useNavigate, useLocation } from "react-router-dom";

// here path is default and it is set to /login
const Loading = ({ path = "/login" }) => {
	const [count, setCount] = useState(3);
	const navigate = useNavigate();
	const location = useLocation();
	// console.log(location);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevValue) => {
				return --prevValue;
			});
		}, 1000); //function will work after each 1 sec.

		count === 0 &&
			navigate(`${path}`, {
				state: location.pathname,
			});
		// cleanup
		return () => clearInterval(interval);
	}, [count]);

	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100vh" }}
		>
			<img src={loaderGIF} alt="Loading" style={{ width: "180px" }} />
		</div>
	);
};

export default Loading;
