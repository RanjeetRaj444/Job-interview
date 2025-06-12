const express = require('express');
const InterviewRequest = require('../models/InterviewRequest');
const router = express.Router();

// GET /api/interview-requests - Fetch all interview requests (optional filter by status)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const requests = await InterviewRequest.find(filter).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      data: requests,
      count: requests.length
    });
  } catch (error) {
    console.error('Error fetching interview requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch interview requests'
    });
  }
});

// POST /api/interview-requests - Submit new interview request
router.post('/', async (req, res) => {
  try {
    const { name, email, jobTitle } = req.body;

    if (!name || !email || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, jobTitle) are required'
      });
    }

    const newRequest = new InterviewRequest({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      jobTitle: jobTitle.trim()
    });

    const savedRequest = await newRequest.save();

    // Emit real-time event to connected recruiters
    req.io.emit('new_interview_request', savedRequest); // 👈 Updated event name to match frontend

    res.status(201).json({
      success: true,
      message: 'Interview request submitted successfully',
      data: savedRequest
    });
  } catch (error) {
    console.error('Error creating interview request:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to submit interview request'
    });
  }
});

// PUT /api/interview-requests/:id/accept - Mark request as accepted
router.put('/:id/accept', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request ID format'
      });
    }

    const updatedRequest = await InterviewRequest.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: 'Interview request not found'
      });
    }

    // Emit real-time event to update recruiters
    req.io.emit('request_accepted', updatedRequest); // 👈 Updated event name to match frontend

    res.json({
      success: true,
      message: 'Interview request accepted successfully',
      data: updatedRequest
    });
  } catch (error) {
    console.error('Error accepting interview request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept interview request'
    });
  }
});

// Optional: GET /api/interview-requests/:id - Get single interview request
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request ID format'
      });
    }

    const request = await InterviewRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Interview request not found'
      });
    }

    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error fetching interview request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch interview request'
    });
  }
});

module.exports = router;
