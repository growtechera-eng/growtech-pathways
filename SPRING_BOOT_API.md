# Spring Boot API Documentation

This document describes the REST API endpoints your Spring Boot application needs to implement.

## Base URL
Configure in `.env` file: `VITE_API_URL=http://localhost:8080`

## Authentication Endpoints

### 1. Sign Up (Student)
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "email": "student@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "STUDENT"
}
```

**Response (Success - 201):**
```json
{
  "message": "User created successfully",
  "userId": 1
}
```

**Response (Error - 400):**
```json
{
  "message": "Email already exists"
}
```

---

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "STUDENT"
  }
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## Admin Endpoints
**Note:** All admin endpoints require JWT authentication via `Authorization: Bearer <token>` header

### 3. Create User (Admin Only)
**POST** `/api/admin/users`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Request Body:**
```json
{
  "email": "teacher@example.com",
  "password": "password123",
  "fullName": "Jane Smith",
  "role": "TEACHER"
}
```

**Response (Success - 201):**
```json
{
  "message": "User created successfully",
  "userId": 2,
  "user": {
    "id": 2,
    "email": "teacher@example.com",
    "fullName": "Jane Smith",
    "role": "TEACHER",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

**Response (Error - 403):**
```json
{
  "message": "Access denied. Admin privileges required."
}
```

---

### 4. Get All Users (Admin Only)
**GET** `/api/admin/users`

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response (Success - 200):**
```json
[
  {
    "id": 1,
    "email": "student@example.com",
    "fullName": "John Doe",
    "role": "STUDENT",
    "createdAt": "2025-01-15T09:00:00Z"
  },
  {
    "id": 2,
    "email": "teacher@example.com",
    "fullName": "Jane Smith",
    "role": "TEACHER",
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Initial Admin User
You'll need to manually create an admin user in your database:
```sql
INSERT INTO users (email, password, full_name, role) 
VALUES ('admin@example.com', '<hashed-password>', 'Admin User', 'ADMIN');
```

---

## Security Requirements

1. **Password Hashing:** Use BCrypt to hash passwords before storing
2. **JWT Token:** Generate JWT tokens on login with user id and role
3. **Role Validation:** Verify user role from JWT token for admin endpoints
4. **CORS:** Enable CORS for your React app URL
5. **Input Validation:** Validate all inputs (email format, password length, etc.)

---

## Example Spring Boot Dependencies (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>0.9.1</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>
```
