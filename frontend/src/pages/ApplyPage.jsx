import React, { useEffect, useState } from "react";
import { submitInterviewRequest } from "../services/api";
import { connectSocket } from "../services/socket";
import "../styles/applyPage.css";

const ApplyPage = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("job-user-data"))
  );
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    jobTitle: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const jobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "DevOps Engineer",
    "Mobile Developer",
    "QA Engineer",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.jobTitle.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await submitInterviewRequest(formData);
      const socket = connectSocket();
      socket.emit("new_interview_request", response.data); // real-time notify recruiters

      setIsSubmitted(true);
      setFormData({ name: "", email: "", jobTitle: "" });
    } catch (err) {
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewApplication = () => {
    setIsSubmitted(false);
    setError("");
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("job-user-data")));
  }, []);

  if (isSubmitted) {
    return (
      <div className="form-container">
        <div className="success-message">
          <h2>🎉 Application Submitted!</h2>
          <p>We've received your request. We’ll get back to you soon.</p>
          <button onClick={handleNewApplication} className="form-button">
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Apply for Interview</h1>
      <p className="form-subtitle">
        Fill out the form below to request an interview
      </p>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <select
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="form-input"
            disabled={isSubmitting}
          >
            <option value="">Select a job title</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="form-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Interview Request"}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
