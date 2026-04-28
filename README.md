# GlassixEx

A REST API built with **Node.js**, **Express**, and **TypeScript** that integrates with the Glassix API — handling authentication and ticket management.

---

## Project Structure

```
Glassix-Exam/
├── server.ts
├── package.json
├── tsconfig.json
├── .env.example
├── controllers/
│   ├── authController.ts
│   └── ticketController.ts
├── services/
│   └── glassixService.ts
├── routes/
│   ├── auth.ts
│   └── tickets.ts
├── models/
│   └── ticket.ts
└── screenshots/
    ├── auth-response.png
    ├── create-ticket-response.png
    ├── send-message-response.png
    └── set-state-response.png
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Eden-Cohen-Consist/GlassixEx.git
cd GlassixEx
npm install
```

### Environment Variables

create an .env file with:

```env
API_USER=example@api.com
API_KEY=glassix API key
API_SECRET=Glassix API password
BASE_URL=https://{workspce}.glassix.com/api/v1.2/
```

> ⚠️ Never commit your `.env` file.

### Run

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

---

## API Endpoints

### Auth

| Method | Endpoint      | Description                          |
| ------ | ------------- | ------------------------------------ |
| GET    | `/auth/login` | Login to Glassix and receive a token |

**Response:**

```json
{
  "access_token": "...",
  "token_type": "...",
  "expires_in": "..."
}
```

---

### Tickets

> All ticket endpoints require an `Authorization: Bearer <token>` header.

| Method | Endpoint         | Description                      |
| ------ | ---------------- | -------------------------------- |
| POST   | `tickets/create` | Create a new ticket              |
| POST   | `/tickets/hello` | Send a message to a ticket       |
| PUT    | `/tickets/close` | Update a ticket's state to close |

---

## Architecture

- **Controllers** — handle HTTP request/response only
- **Services** — all Glassix API calls and business logic
- **Routes** — wire endpoints to controllers

---

## Health Check

```
GET /health → { "status": "ok" }
```
