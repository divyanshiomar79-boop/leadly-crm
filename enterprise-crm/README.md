# Enterprise CRM

A fullstack MERN lead-management app: Node.js + Express + MongoDB (Mongoose) backend, React + Vite + TailwindCSS + Axios frontend.

## Folder structure

```text
enterprise-crm/
├── client/
│   ├── public/index.html
│   ├── src/components/LeadForm.jsx, LeadTable.jsx, Dashboard.jsx
│   ├── src/pages/Home.jsx
│   ├── src/services/api.js
│   ├── src/App.jsx, main.jsx, index.css
│   ├── package.json, vite.config.js
├── server/
│   ├── models/Lead.js
│   ├── routes/leadRoutes.js
│   ├── controllers/leadController.js
│   ├── .env.example, server.js, package.json
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 18+
- A MongoDB instance (local `mongodb://127.0.0.1:27017/enterprise-crm` or MongoDB Atlas)

## 1. Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/enterprise-crm
PORT=5000
```

Run the API:

```bash
npm run dev     # nodemon server.js
# or: npm start
```

API runs at http://localhost:5000 with base URL `/api/leads`.

## 2. Frontend setup

In a second terminal:

```bash
cd client
npm install
npm run dev     # vite
```

App runs at http://localhost:5173 and calls the API at `http://localhost:5000/api`.

## API reference

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/leads`      | List all leads     |
| GET    | `/api/leads/:id`  | Get a single lead  |
| POST   | `/api/leads`      | Create a lead      |
| PUT    | `/api/leads/:id`  | Update a lead      |
| DELETE | `/api/leads/:id`  | Delete a lead      |

### Lead schema

| Field       | Type   | Rules                                              |
| ----------- | ------ | -------------------------------------------------- |
| `name`      | String | required                                            |
| `email`     | String | required, unique                                    |
| `phone`     | String | optional                                            |
| `dealStage` | String | enum `New`, `Contacted`, `Won`, `Lost` (default `New`) |
| `createdAt` | Date   | default `Date.now`                                  |

### Example request

```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Cooper","email":"jane@acme.com","phone":"+1 555 0100"}'
```

## Features

- Dashboard with Total Leads, Won Leads and In Progress (New + Contacted) stat cards
- Add leads with name, email and phone
- Responsive lead table with inline deal-stage dropdown and delete action
- MVC backend structure (models / routes / controllers)
