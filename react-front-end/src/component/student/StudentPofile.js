import React, {
	useEffect,
	useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../config/axiosConfig";

const StudentPofile = () => {
	const { id } = useParams();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadStudent();
	}, []);

	const loadStudent = async () => {
	    try {
	        setLoading(true);
	        setError(null);
	        const result = await axios.get(
	            `${process.env.REACT_APP_API_BASE_URL}/api/students/student/${id}`
	        );
	        setStudent(result.data);
	    } catch (error) {
	        console.error('Error loading student profile:', error);
	        setError('Failed to load student profile. Please try again.');
	    } finally {
	        setLoading(false);
	    }
	};

	return (
		<div>
			{loading && (
				<div className="text-center p-5">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
			{error && (
				<div className="alert alert-danger m-3">
					{error}
				</div>
			)}
			{!loading && !error && (
				<section
					className="shadow"
					style={{ backgroundColor: "whitesmoke" }}>
					<div className="container py-5">
						<div className="row">
							<div className="col-lg-3">
								<div className="card mb-4">
									<div className="card-body text-center">
										<img
											src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
											alt="avatar"
											className="rounded-circle img-fluid"
											style={{ width: 150 }}
										/>
										<h5 className="my-3">
											{`${student.firstName} ${student.lastName}`}
										</h5>
										<div className="d-flex justify-content-center mb-2">
											<button
												type="button"
												className="btn btn-outline-primary">
												Call
											</button>
											<button
												type="button"
												className="btn btn-outline-warning ms-1">
												Message
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="col-lg-9">
								<div className="card mb-4">
									<div className="card-body">
										<hr />

										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">
													First Name
												</h5>
											</div>

											<div className="col-sm-9">
												<p className="text-muted mb-0">
													{student.firstName}
												</p>
											</div>
										</div>

										<hr />

										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">
													Last Name
												</h5>
											</div>

											<div className="col-sm-9">
												<p className="text-muted mb-0">
													{student.lastName}
												</p>
											</div>
										</div>

										<hr />

										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">
													Email
												</h5>
											</div>

											<div className="col-sm-9">
												<p className="text-muted mb-0">
													{student.email}
												</p>
											</div>
										</div>

										<hr />

										<div className="row">
											<div className="col-sm-3">
												<h5 className="mb-0">
													Department
												</h5>
											</div>

											<div className="col-sm-9">
												<p className="text-muted mb-0">
													{student.department}
												</p>
											</div>
										</div>

										<div className="col-sm-5 mt-3">
											<Link
												to="/view-students"
												type="submit"
												className="btn btn-outline-warning btn-lg">
												Cancel
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

export default StudentPofile;
