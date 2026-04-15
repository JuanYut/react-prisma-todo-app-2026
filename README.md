# Full Stack Notes App - Ensolvers Challenge

Created by **Juan Santillán**

## 🚀 Quick Start (Setup & Execution)

To fulfill the requirements of the challenge, the entire application can be set up and started with **one single command** using the provided automation script.

### One-Command Rule:

**Mac/Linux** — open a terminal in the project root and run:
```bash
./run.sh
```

**Windows** — open a Command Prompt or PowerShell in the project root and run:
```bat
run.bat
```

**What this command does automatically:**
- Installs all dependencies for both Frontend and Backend.
- Creates and configures environment variables (`.env`).
- Initializes the SQLite database and syncs the schema.
- Starts the Backend API (Port 3001) and the Frontend (Port 5173) simultaneously.

---

## 🏗 Architecture

The project is structured as a pure **Single Page Application (SPA)** with a clean separation of concerns:

- **`frontend/`**: Built with **React**, managing UI state, filtering logic, and asynchronous API calls.
- **`backend/`**: A **Node.js/Express** server implementing a layered architecture:
  - **Routes**: Defines the API endpoints.
  - **Controllers**: Handles request validation and HTTP responses.
  - **Services**: Manages business logic and database interactions via **Prisma ORM**.
  - **Database**: Uses a local **SQLite** file for persistence.

## 🛠 Tech Stack & Versions

- **Node.js**: `v18.x.x`+
- **Frontend**: React 18, Vite 6
- **Backend**: Express 5, Prisma 6
- **Database**: SQLite
