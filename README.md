# Leadly CRM

Create a complete fullstack MERN application named "Enterprise CRM"

Tech Stack:

Backend: Node.js, Express.js, MongoDB, Mongoose

Frontend: React, Vite, TailwindCSS, Axios

EXACT FOLDER STRUCTURE I WANT:

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

DETAILED REQUIREMENTS:

1. Backend API: Run on port 5000. Base URL /api/leads

   CRUD: GET all leads, POST new lead, PUT update lead, DELETE lead

   Use MVC structure: models, routes, controllers separate

   Lead Schema: name String required, email String required unique, phone String, dealStage Enum['New','Contacted','Won','Lost'] default 'New', createdAt Date default now

2. Frontend:

   Use Axios with baseURL: http://localhost:5000/api

   Home.jsx: render Dashboard, LeadForm, LeadTable

   LeadForm.jsx: Form with name, email, phone inputs + Add Lead button

   LeadTable.jsx: Table of all leads with columns name,email,phone,dealStage. Add delete button and dropdown to change dealStage

   Dashboard.jsx: 3 stat cards - Total Leads, Won Leads, In Progress Leads[New + Contacted]

   Setup TailwindCSS properly in index.css. Make responsive and modern UI

3. Other Files:

   server/.env.example should contain MONGO_URI=

   server/.gitignore should ignore node_modules

   README.md should have step by step: npm install, create .env, run server and client

   Both package.json should have correct scripts: "dev": "nodemon server.js" for server, "dev": "vite" for client

Important: Give me complete working code for every file. No //TODO comments. Code should run after npm install.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/841dd419-332e-4958-b91a-7d2d39821dde).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
