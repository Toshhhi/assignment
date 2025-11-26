# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add:

```env
MONGODB_URI=mongodb://localhost:27017/frontend-intern-task
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-characters
```

**For MongoDB Atlas:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Replace `MONGODB_URI` with your Atlas connection string
5. Whitelist your IP address in Atlas Network Access

### 3. Start MongoDB (if using local MongoDB)

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

### 4. Run the Application

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Register a new account:**
   - Navigate to http://localhost:3000/register
   - Fill in your name, email, and password (min. 6 characters)
   - Click "Create account"

2. **Login:**
   - After registration, you'll be redirected to the dashboard
   - Or go to http://localhost:3000/login

3. **Explore the Dashboard:**
   - View your profile information
   - Create tasks
   - Search and filter tasks
   - Update and delete tasks

## Testing the API

### Using Postman

1. Import the Postman collection from `docs/Postman_Collection.json`
2. Set the base URL variable to `http://localhost:3000`
3. Start with the "Register User" request
4. The login request will set an HTTP-only cookie automatically
5. Subsequent authenticated requests will use the cookie

### Using curl

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}' \
  -c cookies.txt
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  -c cookies.txt
```

**Get Tasks:**
```bash
curl -X GET http://localhost:3000/api/tasks \
  -b cookies.txt
```

## Common Issues

### MongoDB Connection Error

**Error:** "MongooseError: Operation `users.findOne()` buffering timed out"

**Solution:**
- Check that MongoDB is running
- Verify your `MONGODB_URI` is correct
- For Atlas, ensure your IP is whitelisted

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Build Errors

**Error:** TypeScript compilation errors

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

## Project Structure Overview

- `/app` - Next.js app directory (pages and API routes)
- `/models` - MongoDB/Mongoose models
- `/lib` - Utility functions and API client
- `/contexts` - React contexts (Auth)
- `/components` - Reusable React components
- `/docs` - Documentation files

## Next Steps

- Read the full [README.md](README.md) for detailed information
- Check [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for API details
- Review [SCALING_NOTES.md](docs/SCALING_NOTES.md) for production deployment

## Support

For issues or questions, refer to the main README.md file or check the API documentation.

