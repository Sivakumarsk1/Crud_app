
# MERN Notes App

https://github.com/user-attachments/assets/c5515d2e-3b39-4b1e-a83e-aaba7c638e79

A full-stack MERN (MongoDB, Express, React, Node) application for note-taking. This app allows users to create, edit, delete, and search notes, with user authentication and JWT-based login.

## Folder Structure

```
.
├── backend/                # Backend folder containing Node.js and Express code
│   └── code/               # Server-side code for the backend
│
└── frontend/               # Frontend folder containing React code
    └── notes-app/          # React app for the notes frontend
```

## Technologies Used

- **MongoDB**: Database for storing user data and notes.
- **Express**: Web framework for Node.js to handle API requests.
- **React**: Frontend JavaScript library for building the UI.
- **Node.js**: Backend JavaScript runtime.
- **Vite**: A fast build tool for the frontend (React).

## Prerequisites

- Node.js (version 16 or higher)
- MongoDB instance (can be local or use MongoDB Atlas for cloud-based DB)
- Git

## Setup Instructions

### Step 1: Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Step 2: Setup Backend

1. **Navigate to the backend folder**:

   ```bash
   cd backend/code
   ```

2. **Install Backend Dependencies**:

   Install the required packages using `npm`:

   ```bash
   npm install
   ```

3. **Run the Backend Server**:

   Start the backend server with:

   ```bash
   npm start
   ```

   The backend will run on `http://localhost:8000`.

### Step 3: Setup Frontend

1. **Navigate to the frontend folder**:

   ```bash
   cd ../../frontend/notes-app
   ```

2. **Install Frontend Dependencies**:

   Install the required dependencies for the React app:

   ```bash
   npm install
   ```

3. **Run the Frontend App**:

   Start the frontend React app with:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

### Step 4: Testing the App

1. **Open the frontend** in your browser at `http://localhost:5173`.
2. **Register** a new account or **Login** using the login credentials.
3. **Create Notes**, **Edit Notes**, **Delete Notes**, and **Search Notes** using the provided UI.

