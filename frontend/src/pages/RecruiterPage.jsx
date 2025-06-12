import React, { useState, useEffect } from "react";
import { getInterviewRequests, acceptInterviewRequest } from "../services/api";
import { connectSocket, getSocket } from "../services/socket";
import "../styles/recruiterPage.css";

const RecruiterPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acceptingIds, setAcceptingIds] = useState(new Set());
  const [isConnected, setIsConnected] = useState(false);
  const audio = new Audio("/ting.mp3"); // ✅ Make sure the path is correct (public folder)

  useEffect(() => {
    const loadDataAndConnect = async () => {
      try {
        const { data } = await getInterviewRequests();
        setRequests(data);
      } catch (err) {
        setError("Failed to load interview requests");
      } finally {
        setLoading(false);
      }

      const socket = connectSocket();

      socket.on("connect", () => {
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      // 🔔 Handle new interview request
      socket.on("new_interview_request", (newRequest) => {
        setRequests((prev) => [newRequest, ...prev]);
        audio.play().catch((err) => {
          console.error("Audio play error:", err);
        });
        console.log("🔔 New interview request received:", newRequest);
      });

      // ✅ Handle acceptance updates
      socket.on("request_accepted", (updatedRequest) => {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === updatedRequest._id ? updatedRequest : req
          )
        );
      });
    };

    loadDataAndConnect();

    // Don’t disconnect socket here, to keep real-time behavior across sessions.
  }, []);

  const handleAccept = async (requestId) => {
    setAcceptingIds((prev) => new Set(prev).add(requestId));
    try {
      await acceptInterviewRequest(requestId);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId ? { ...req, status: "accepted" } : req
        )
      );
    } catch (err) {
      setError("Failed to accept request");
    } finally {
      setAcceptingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(requestId);
        return updated;
      });
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  if (loading) {
    return (
      <div className="recruiter-container">
        <div className="recruiter-header">
          <h1 className="recruiter-title">Recruiter Dashboard</h1>
          <p className="recruiter-subtitle">Loading interview requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recruiter-container">
      <div className="recruiter-header">
        <h1 className="recruiter-title">Recruiter Dashboard</h1>
        <p className="recruiter-subtitle">
          Manage incoming interview requests in real-time
        </p>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">
            {isConnected
              ? "Connected - Real-time updates active"
              : "Connecting..."}
          </span>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {requests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-title">No Interview Requests</h3>
          <p className="empty-subtext">
            New requests will appear here automatically
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td data-label="Name">{request.name}</td>
                  <td data-label="Email">
                    <a href={`mailto:${request.email}`} className="email-link">
                      {request.email}
                    </a>
                  </td>
                  <td data-label="Job Title">{request.jobTitle}</td>
                  <td data-label="Submitted">
                    {formatDate(request.createdAt)}
                  </td>
                  <td data-label="Status">
                    <span
                      className={`status-badge ${
                        request.status === "accepted"
                          ? "status-accepted"
                          : "status-pending"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td data-label="Action">
                    {request.status === "pending" ? (
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="accept-button"
                        disabled={acceptingIds.has(request._id)}
                      >
                        {acceptingIds.has(request._id) ? (
                          <>
                            <span className="loading-spinner"></span>
                            <span className="loading-text">Accepting...</span>
                          </>
                        ) : (
                          "Accept"
                        )}
                      </button>
                    ) : (
                      <span className="accepted-text">✓ Accepted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecruiterPage;
