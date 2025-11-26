# API Documentation

This document provides detailed information about all API endpoints in the Task Management Dashboard application.

## Base URL

All API endpoints are prefixed with `/api`

## Authentication

Most endpoints require authentication via JWT token stored in an HTTP-only cookie. The token is automatically sent with requests from the browser.

## Response Format

All responses follow this format:

**Success Response:**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": "Error message",
  "details": [ ... ] // Optional validation errors
}
```

---

## Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: Required, 2-50 characters
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400`: Validation failed or user already exists
- `500`: Internal server error

---

### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

The JWT token is set as an HTTP-only cookie automatically.

**Error Responses:**
- `400`: Validation failed
- `401`: Invalid email or password
- `500`: Internal server error

---

### 3. Logout User

**Endpoint:** `POST /api/auth/logout`

**Description:** Logout user and clear authentication token

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

**Authentication:** Required

---

### 4. Get Current User

**Endpoint:** `GET /api/auth/me`

**Description:** Get the currently authenticated user's information

**Success Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Internal server error

**Authentication:** Required

---

## Profile Endpoints

### 5. Get User Profile

**Endpoint:** `GET /api/profile`

**Description:** Get detailed user profile information

**Success Response (200):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: User not found
- `500`: Internal server error

**Authentication:** Required

---

### 6. Update User Profile

**Endpoint:** `PUT /api/profile`

**Description:** Update user profile information

**Request Body:**
```json
{
  "name": "John Updated"
}
```

**Validation:**
- `name`: Optional, 2-50 characters if provided

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "name": "John Updated",
    "email": "john@example.com",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized
- `404`: User not found
- `500`: Internal server error

**Authentication:** Required

**Note:** Email cannot be updated through this endpoint.

---

## Task Endpoints

### 7. Get All Tasks

**Endpoint:** `GET /api/tasks`

**Description:** Get all tasks for the authenticated user with optional filtering and sorting

**Query Parameters:**
- `search` (optional): Search in title and description
- `status` (optional): Filter by status (`todo`, `in-progress`, `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `sortBy` (optional): Field to sort by (default: `createdAt`)
- `sortOrder` (optional): Sort order (`asc` or `desc`, default: `desc`)

**Example:**
```
GET /api/tasks?search=important&status=todo&priority=high&sortBy=createdAt&sortOrder=desc
```

**Success Response (200):**
```json
{
  "tasks": [
    {
      "id": "task_id",
      "title": "Task title",
      "description": "Task description",
      "status": "todo",
      "priority": "high",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Internal server error

**Authentication:** Required

---

### 8. Create Task

**Endpoint:** `POST /api/tasks`

**Description:** Create a new task

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium"
}
```

**Validation:**
- `title`: Required, 1-100 characters
- `description`: Optional, max 500 characters
- `status`: Optional, must be `todo`, `in-progress`, or `completed` (default: `todo`)
- `priority`: Optional, must be `low`, `medium`, or `high` (default: `medium`)

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "todo",
    "priority": "medium",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized
- `500`: Internal server error

**Authentication:** Required

---

### 9. Get Single Task

**Endpoint:** `GET /api/tasks/[id]`

**Description:** Get a single task by ID

**URL Parameters:**
- `id`: Task ID

**Success Response (200):**
```json
{
  "task": {
    "id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "todo",
    "priority": "medium",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid task ID
- `401`: Unauthorized
- `404`: Task not found
- `500`: Internal server error

**Authentication:** Required

---

### 10. Update Task

**Endpoint:** `PUT /api/tasks/[id]`

**Description:** Update an existing task

**URL Parameters:**
- `id`: Task ID

**Request Body:**
```json
{
  "title": "Updated title",
  "status": "in-progress",
  "priority": "high"
}
```

All fields are optional. Only provided fields will be updated.

**Validation:**
- Same as create task, but all fields are optional

**Success Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "task_id",
    "title": "Updated title",
    "description": "Task description",
    "status": "in-progress",
    "priority": "high",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed or invalid task ID
- `401`: Unauthorized
- `404`: Task not found
- `500`: Internal server error

**Authentication:** Required

**Note:** Users can only update their own tasks.

---

### 11. Delete Task

**Endpoint:** `DELETE /api/tasks/[id]`

**Description:** Delete a task

**URL Parameters:**
- `id`: Task ID

**Success Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- `400`: Invalid task ID
- `401`: Unauthorized
- `404`: Task not found
- `500`: Internal server error

**Authentication:** Required

**Note:** Users can only delete their own tasks.

---

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

## Authentication

Most endpoints require authentication. The JWT token is automatically sent via HTTP-only cookie when making requests from the browser. For API testing tools like Postman, you may need to manually include the token in cookies or Authorization header.

## Error Handling

All errors follow a consistent format:
```json
{
  "error": "Error message",
  "details": [
    {
      "path": ["field"],
      "message": "Validation error message"
    }
  ]
}
```

