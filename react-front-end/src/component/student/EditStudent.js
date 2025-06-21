import React, {
	useEffect,
	useState,
} from "react";
import axios from "../../config/axiosConfig";

import {
	Link,
	useNavigate,
	useParams,
} from "react-router-dom";

const EditStudent = () => {
	let navigate = useNavigate();

	const { id } = useParams();

	const [student, setStudent] = useState({
		firstName: "",
		lastName: "",
		email: "",
		department: "",
	});
	const {
		firstName,
		lastName,
		email,
		department,
	} = student;

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	useEffect(() => {
		loadStudent();
	}, []);

	const loadStudent = async () => {
    try {
        const result = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/student/${id}`
        );
        setStudent(result.data);
    } catch (error) {
        console.error('Error loading student:', error);
        alert('Error loading student. Please try again.');
    }
};

const handleInputChange = (e) => {
    setStudent({
        ...student,
        [e.target.name]: e.target.value,
    });
};

const updateStudent = async (e) => {
    e.preventDefault();
    try {
        await axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/students/update/${id}`,
            student
        );
        navigate("/view-students");
        alert('Student updated successfully');
    } catch (error) {
        console.error('Error updating student:', error);
        alert('Error updating student. Please try again.');
    }
};

	return (
		<div className="col-sm-8 py-2 px-5 offset-2 shadow">
			<h2 className="mt-5"> Edit Student</h2>
			<form onSubmit={(e) => updateStudent(e)}>
				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="firstName">
						First Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="firstName"
						id="firstName"
						required
						value={firstName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="lastName"
						id="lastName"
						required
						value={lastName}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="email">
						Your Email
					</label>
					<input
						className="form-control col-sm-6"
						type="email"
						name="email"
						id="email"
						required
						value={email}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="input-group mb-5">
					<label
						className="input-group-text"
						htmlFor="department">
						Department
					</label>
					<input
						className="form-control col-sm-6"
						type="text"
						name="department"
						id="department"
						required
						value={department}
						onChange={(e) => handleInputChange(e)}
					/>
				</div>

				<div className="row mb-5">
					<div className="col-sm-2">
						<button
							type="submit"
							className="btn btn-outline-success btn-lg">
							Save
						</button>
					</div>

					<div className="col-sm-2">
						<Link
							to={"/view-students"}
							className="btn btn-outline-warning btn-lg">
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditStudent;
