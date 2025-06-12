import React, { useEffect, useState } from "react";
import { submitInterviewRequest } from "../services/api";
import "../styles/applyPage.css";

const ApplyPage = () => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("job-user-data"))
  );
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
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
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.jobTitle.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await submitInterviewRequest(formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", jobTitle: "" });
    } catch (err) {
      setError("Failed to submit request. Please try again.");
      console.error("Submission error:", err);
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
          <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>
            🎉 Application Submitted!
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Thank you for your interest! We've received your interview request
            and will get back to you soon.
          </p>
          <button
            onClick={handleNewApplication}
            className="form-button"
            style={{ width: "auto", padding: "0.5rem 1.5rem" }}
          >
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
        Fill out the form below to request an interview with our team
      </p>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            border: "2px solid #ef4444",
            color: "#dc2626",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle" className="form-label">
            Job Title *
          </label>
          <select
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="form-select"
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
          {isSubmitting ? (
            <>
              <span className="loading"></span>
              <span style={{ marginLeft: "0.5rem" }}>Submitting...</span>
            </>
          ) : (
            "Submit Interview Request"
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
