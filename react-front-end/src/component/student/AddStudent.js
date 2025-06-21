import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

const AddStudent = () => {
    let navigate = useNavigate();
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {
        firstName,
        lastName,
        email,
        department,
    } = student;

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };
    const saveStudent = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`/api/students`, student);
            console.log('Student added successfully:', response.data);
            navigate("/view-students");
        } catch (error) {
            console.error("Error adding student:", error);
            // Check for CORS error
            if (error.message?.includes("Network Error")) {
                setError("Failed to connect to the server. Please check your internet connection.");
            } else if (error.response) {
                // Server responded with an error
                const status = error.response.status;
                const message = error.response.data?.message || error.response.statusText;
                
                if (status === 400) {
                    setError("Bad request. Please check your input and try again.");
                } else if (status === 401) {
                    setError("Authentication required. Please log in.");
                } else if (status === 403) {
                    setError("Access denied. You don't have permission to perform this action.");
                } else if (status === 404) {
                    setError("Resource not found. Please check the URL and try again.");
                } else if (status === 409) {
                    setError("A student with this email already exists. Please use a different email.");
                } else if (status >= 500) {
                    setError("Server error. Please try again later.");
                } else {
                    setError(message || "An error occurred. Please try again.");
                }
            } else {
                // Other errors
                setError(error.message || "Failed to add student. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="col-sm-8 offset-sm-2 mt-3 pt-2 pb-2 px-5 shadow">
                <h2 className="mt-5"> Add Student</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={(e) => saveStudent(e)}>
                    <div className="form-group mb-5">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="firstName"
                            id="firstName"
                            disabled={loading}
                            required
                            value={firstName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="form-group mb-5">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                            value={lastName}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="form-group mb-5">
                        <label htmlFor="email">Your Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="form-group mb-5">
                        <label htmlFor="department">Department</label>
                        <input
                            className="form-control"
                            type="text"
                            name="department"
                            id="department"
                            required
                            value={department}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>

                    <div className="row mb-5">
                        <div className="col-sm-6">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg btn-block">
                                Save
                            </button>
                        </div>

                        <div className="col-sm-6">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Student'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
