# Frontend Developer Intern Task - Task Management Dashboard

A scalable web application with authentication, user profiles, and task management features. Built with Next.js 16, TypeScript, MongoDB, and TailwindCSS.

## 🚀 Features

- ✅ **User Authentication**
  - User registration and login
  - JWT-based authentication with HTTP-only cookies
  - Password hashing using bcrypt
  - Protected routes

- ✅ **User Dashboard**
  - User profile display
  - Profile update functionality
  - Secure session management

- ✅ **Task Management (CRUD)**
  - Create, Read, Update, Delete tasks
  - Search functionality
  - Filter by status and priority
  - Status: Todo, In Progress, Completed
  - Priority: Low, Medium, High

- ✅ **Security**
  - Password hashing with bcrypt
  - JWT token authentication
  - Input validation (client & server-side)
  - Error handling
  - Secure HTTP-only cookies

- ✅ **UI/UX**
  - Responsive design with TailwindCSS
  - Modern and intuitive interface
  - Loading states and error handling
  - Form validation with user feedback

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-intern-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and update:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string (at least 32 characters)

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # Or run directly
   mongod
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend-intern-task/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts    # User registration
│   │   │   ├── login/route.ts       # User login
│   │   │   ├── logout/route.ts      # User logout
│   │   │   └── me/route.ts          # Get current user
│   │   ├── profile/route.ts         # Profile CRUD
│   │   └── tasks/
│   │       ├── route.ts             # Tasks list & create
│   │       └── [id]/route.ts        # Task update & delete
│   ├── dashboard/page.tsx           # Protected dashboard
│   ├── login/page.tsx               # Login page
│   ├── register/page.tsx            # Registration page
│   └── page.tsx                     # Home page
├── components/
│   └── ProtectedRoute.tsx           # Route protection wrapper
├── contexts/
│   └── AuthContext.tsx              # Authentication context
├── lib/
│   ├── api.ts                       # API client
│   ├── auth.ts                      # Auth utilities
│   ├── db.ts                        # Database connection
│   └── validation.ts                # Zod validation schemas
├── models/
│   ├── User.ts                      # User model
│   └── Task.ts                      # Task model
└── package.json
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/logout` - Logout user

- `GET /api/auth/me` - Get current user

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
  ```json
  {
    "name": "John Updated"
  }
  ```

### Tasks

- `GET /api/tasks` - Get all tasks (supports query params: `search`, `status`, `priority`, `sortBy`, `sortOrder`)
- `POST /api/tasks` - Create a new task
  ```json
  {
    "title": "Task title",
    "description": "Task description",
    "status": "todo",
    "priority": "medium"
  }
  ```
- `GET /api/tasks/[id]` - Get a single task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

## 🧪 Testing

You can test the API endpoints using:
- Postman collection (see `docs/API_DOCUMENTATION.md`)
- Browser developer tools
- curl commands

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📝 Notes on Scalability

See `docs/SCALING_NOTES.md` for detailed information on how to scale this application for production.

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **JWT Tokens**: Secure authentication using JSON Web Tokens
3. **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
4. **Input Validation**: Both client-side and server-side validation using Zod
5. **Error Handling**: Comprehensive error handling without exposing sensitive information
6. **Protected Routes**: Route protection middleware for authenticated pages

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env.local`
- For MongoDB Atlas, ensure your IP is whitelisted

**Authentication Issues**
- Clear browser cookies
- Check that `JWT_SECRET` is set in `.env.local`
- Verify token expiration settings

## 📚 Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Validation**: Zod
- **HTTP Client**: Axios

## 👤 Author

Frontend Developer Intern Task Submission

## 📄 License

This project is created for the Frontend Developer Intern assignment.
