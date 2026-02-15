# Social Platform API - Advanced Social Networking Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)

## Overview
**Social Platform API** is a high-performance, scalable social networking backend engine. Built with **Node.js** and **TypeScript**, the project follows a **Modular Layered Architecture**, strictly separating concerns between controllers, services, and data models. It features real-time interactivity, group governance, and a personalized feed system, all while maintaining a hardened security posture.

## Tech Stack
*   **Backend:** Node.js & Express.js.
*   **Language:** TypeScript (Strict Type Safety).
*   **Architecture:** Modular MVC with a Dedicated Service Layer.
*   **Database:** MongoDB Atlas with Mongoose ODM.
*   **Real-time:** Socket.io for instant event-driven notifications.
*   **Security & Protection:** 
    *   **JWT:** Stateless authentication and role-based access control.
    *   **Bcrypt:** Industry-standard password hashing.
    *   **Helmet:** HTTP security header management.
    *   **Rate Limiting:** Granular traffic control (Auth, Creation, and General tiers).
    *   **Mongo-Sanitize:** Mitigation against NoSQL Injection attacks.
*   **Validation:** Strict data integrity using **Zod** schema validation.
*   **Documentation:** Fully interactive API explorer via **Swagger UI**.

## Key Features
- **Real-time Notifications:** Instant alerts for follows and comments using WebSockets.
- **Group Governance:** Create groups, manage roles (Admin/Member), and ban users via admin endpoints.
- **Intelligent Feed Logic:** A personalized discovery system combining posts from followed users and joined groups.
- **Dynamic Follow System:** Managed relationships with automatic counters for followers and following.
- **Hardened Security:** Implementation of multiple Rate Limiters to prevent brute-force and DDoS attempts.
- **Scalable Design:** Clean folder structure allows for seamless integration of new modules.

## API Endpoints Summary

### Authentication & Users
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/users/signup` | Register a new account |
| POST | `/api/users/login` | Authenticate and receive a JWT |
| GET | `/api/users/feed` | Retrieve personalized user feed |

### Posts & Comments
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/posts` | Create a new public post |
| GET | `/api/posts/:userId/posts` | Fetch posts by a specific user |
| POST | `/api/comments/:postId` | Add a comment to a post |
| GET | `/api/comments/:postId` | Retrieve all comments for a post |

### Groups & Admin
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/groups` | Create a new community group |
| POST | `/api/groups/:groupId/post` | Publish a post within a group |
| PUT | `/api/admin/:groupId/:userId/ban` | Ban a member from a group (Admin only) |
| PUT | `/api/admin/:groupId/:userId/role` | Elevate member to Admin role |

- **API Documentation:** [Swagger UI Docs](https://social-platform-api-production.up.railway.app/docs)

## ⚙️ Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omar-BEDev/social-platform-api.git
   cd social-platform-api

  2. **Install dependencies:**
   ```bash
   npm install
   ```
  3. **Configure Environment Variables:**
  Create a .env file in the root directory:
  ```.env
 Env
 PORT=3000
 MONGO_URL=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret
```
 4. **Run in development mode:**
```bash
npm run dev
```
5. **Build and start for production:**
```bash
npm run build
npm start
