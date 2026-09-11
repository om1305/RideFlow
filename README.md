# 🚕 RideFlow — Full Stack Ride Booking Platform

RideFlow is a full-stack, production-style ride-booking platform inspired by Uber's core architecture. It supports two independent user roles — **Riders** and **Captains (Drivers)** — with live location tracking, real-time ride-status updates, and an event-driven backend built for scale.

---

## ✨ Features

- **Dual User Roles** — Separate authentication, dashboards, and flows for Riders and Captains
- **Live Driver Tracking** — Real-time location updates via WebSockets
- **Real-Time Ride Status** — Ride requests, acceptance, arrival, and completion pushed instantly to both parties
- **Secure Authentication** — JWT access tokens with refresh-token rotation
- **Hardened Backend Security** — Peppered password hashing, Helmet HTTP headers, rate limiting, and Zod-based schema validation
- **Caching & Session Management** — Redis used for session storage, caching, and fast lookups
- **Maps & Routing** — Google Maps API integration for geolocation, route computation, and fare/distance estimation

---

## 🏗️ Tech Stack

| Layer          | Technology                                   |
|----------------|-----------------------------------------------|
| Frontend       | React.js                                      |
| Backend        | Node.js, Express.js                           |
| Database       | PostgreSQL                                    |
| Cache/Sessions | Redis                                         |
| Real-Time      | WebSockets (Socket.IO)                        |
| Auth           | JWT (access + refresh token rotation)         |
| Validation     | Zod                                           |
| Security       | Helmet, rate limiting, peppered password hashing |
| Maps           | Google Maps API                               |

---

## 🗂️ Project Structure

```
RideFlow/
├── Backend/          # Node.js/Express API, WebSocket server
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── sockets/
│   └── package.json
│
├── Frontend/          # React.js client (Rider + Captain interfaces)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
│
└── README.md
```

---

## 🏛️ System Architecture

1. **Rider** requests a ride from the React client → request hits the Express API.
2. Nearby **Captains** are located and notified in real time over **WebSockets**.
3. Once a Captain accepts, both Rider and Captain receive live status and location updates via WebSocket channels.
4. **Redis** stores active sessions, driver locations, and frequently accessed data to keep lookups fast.
5. **PostgreSQL** persists users, rides, and transactional data.
6. **Google Maps API** computes routes, ETAs, and distances for fare estimation and live navigation.

---

## 🔐 Security

- JWT-based authentication with short-lived access tokens and rotating refresh tokens
- Passwords hashed with a peppered hashing scheme (hash + server-side secret) before storage
- `helmet` middleware for secure HTTP headers
- Rate limiting on sensitive routes (auth, ride requests) to prevent abuse
- Request payloads validated with `zod` schemas before hitting business logic

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- Redis
- Google Maps API key

### 1. Clone the repository

```bash
git clone https://github.com/om1305/RideFlow.git
cd RideFlow
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:

```env
PORT=4000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/rideflow
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
PASSWORD_PEPPER=your_password_pepper
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in `Frontend/`:

```env
VITE_API_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Run the frontend:

```bash
npm run dev
```

### 4. Start supporting services

Make sure PostgreSQL and Redis are running locally (or point the `.env` files to hosted instances).

---

## 📡 API Overview

| Module     | Description                                      |
|------------|---------------------------------------------------|
| `/auth`    | Rider & Captain registration, login, token refresh |
| `/rides`   | Ride creation, status updates, ride history        |
| `/captains`| Captain profile, availability, live location       |
| `/maps`    | Distance/time estimation, route computation        |

*(Refer to the `Backend/src/routes` directory for the full, up-to-date endpoint list.)*

---

## 🚀 Roadmap

- [ ] Payment gateway integration
- [ ] Ride history and analytics dashboard
- [ ] Surge pricing engine
- [ ] Push notifications
- [ ] Dockerized deployment (Docker Compose for Postgres/Redis)

---

## 🙌 Acknowledgements

Architecture and core ride-booking flow inspired by open-source Uber-clone build tutorials, extended with production-oriented backend practices (JWT rotation, Redis caching, and schema validation).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
