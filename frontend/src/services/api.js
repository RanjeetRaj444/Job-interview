// API service for backend communication
const API_BASE_URL = 'http://localhost:8080/api';

// Submit interview request
export const submitInterviewRequest = async (requestData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting interview request:', error);
    throw error;
  }
};

// Get all interview requests
export const getInterviewRequests = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview-requests`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching interview requests:', error);
    throw error;
  }
};

// Accept interview request
export const acceptInterviewRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview-requests/${requestId}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error accepting interview request:', error);
    throw error;
  }
};