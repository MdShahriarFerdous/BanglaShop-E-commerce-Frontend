import React from "react";

const Jumbotron = ({ title, subTitle }) => {
	return (
		<div className="card p-5" style={{ width: "70vw" }}>
			<div className="card-body">
				<h1 className="fw-bold card-title">{title}</h1>
				<p className="lead">{subTitle}</p>
			</div>
		</div>
	);
};

export default Jumbotron;
