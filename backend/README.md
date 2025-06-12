# Job Platform Backend

A Node.js Express backend for handling interview requests with real-time updates using Socket.io.

## Features

- **RESTful API** for interview request management
- **Real-time notifications** using Socket.io
- **MongoDB integration** with Mongoose ODM
- **Input validation** and error handling
- **CORS enabled** for frontend communication

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/interview-requests` | Fetch all interview requests (supports ?status=pending/accepted) |
| POST | `/api/interview-requests` | Submit new interview request |
| PUT | `/api/interview-requests/:id/accept` | Mark request as accepted |
| GET | `/api/health` | Health check endpoint |

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-platform-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```
   MONGODB_URI=mongodb://localhost:27017/job-platform
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use your connection string

5. **Run the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## Database Schema

```javascript
{
  name: String,           // Required, max 100 chars
  email: String,          // Required, validated email format
  jobTitle: String,       // Required, max 200 chars
  status: String,         // 'pending' | 'accepted', default: 'pending'
  createdAt: Date        // Auto-generated timestamp
}
```

## Real-time Events

The server emits the following Socket.io events:

- `newInterviewRequest` - When a new request is submitted
- `requestAccepted` - When a request is accepted

## API Usage Examples

### Submit Interview Request
```bash
curl -X POST http://localhost:5000/api/interview-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "jobTitle": "Frontend Developer"
  }'
```

### Fetch Pending Requests
```bash
curl http://localhost:5000/api/interview-requests?status=pending
```

### Accept Request
```bash
curl -X PUT http://localhost:5000/api/interview-requests/{id}/accept
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Production Deployment

### Environment Variables for Production:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-platform
PORT=5000
FRONTEND_URL=https://your-frontend-domain.com
```

### Recommended Platforms:
- **Render**: Easy deployment with MongoDB Atlas
- **Heroku**: With MongoDB Atlas add-on
- **Railway**: Simple deployment with database support

## Socket.io Client Connection

Frontend can connect to Socket.io like this:

```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

socket.on('newInterviewRequest', (data) => {
  // Handle new request
  console.log('New request:', data);
});

socket.on('requestAccepted', (data) => {
  // Handle accepted request
  console.log('Request accepted:', data);
});
```

## Testing

You can test the API using tools like:
- **Postman** - For REST API testing
- **Socket.io Client Tool** - For WebSocket testing
- **curl** - Command line testing (examples above)

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **socket.io**: Real-time communication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management