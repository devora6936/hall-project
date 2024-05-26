# Event Hall Management System

Welcome to the Event Hall Management System! This project is designed to efficiently manage the scheduling, updating, and deletion of events in an event hall. It provides features for calculating payment amounts based on customer club types, generating event summaries and total income for specified date ranges, and ensuring secure access with token-based authentication and password encryption.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Project Structure](#project-structure)
5. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication)
   - [Event Management](#event-management)
   - [Person Management](#person-management)
   - [Email](#email)
   - [File Upload](#file-upload)
6. [Environment Variables](#environment-variables)
7. [Running the Project](#running-the-project)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- Schedule, update, and delete events.
- Automatic calculation of payment amounts based on customer club type.
- Generate summaries of events and total income for a specified date range.
- Send automatic email notifications to customers with event details and hall regulations upon scheduling an event.
- Upload multiple users at once.
- Secure access with token-based authentication.
- Password encryption using bcrypt.
- Developed with a layered architecture: model, routes, controller, service.
- Frontend designed using PrimeReact.

## Technologies Used

- **Server**: Node.js, Express.js
- **Client**: React, PrimeReact, CSS
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcrypt

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/devora6936/hallproject.git
   cd hall-project
   \`\`\`

2. Install server dependencies:
   \`\`\`bash
   cd server
   npm install
   \`\`\`

3. Install client dependencies:
   \`\`\`bash
   cd ../client
   npm install
   \`\`\`

## Project Structure

The project is divided into two main parts: server and client.

### Server

\`\`\`
server/
├── controllers/       # Controller functions for handling requests
├── middleware/        # Middleware functions
├── models/            # Database models
├── routes/            # API routes
├── services/          # Business logic and services
├── config/            # Configuration files
└── server.js          # Entry point of the application
\`\`\`

### Client

\`\`\`
client/
├── src/
│   ├── components/    # Reusable components
|   │   ├── pages/         # Page components
│   ├── App.js         # Main App component
│   └── index.js       # Entry point of the React application
├── public/            # Static files
└── package.json       # Project metadata and dependencies
\`\`\`

## API Endpoints

### Authentication

- \`POST /login\` - Login user and get token
- \`POST /register\` - Register a new user

### Event Management

- \`GET /\` - Get all events
- \`POST /\` - Create a new event
- \`PUT /\` - Update an existing event
- \`DELETE /:id\` - Delete an event by ID
- \`GET /byDate/:date\` - Get events by date
- \`GET /byRange/:firstday/:lastday\` - Get events in a date range
- \`GET /byWeek\` - Get events for the current week

### Person Management

- \`GET /\` - Get all persons
- \`POST /\` - Create a new person
- \`POST /loadPeople\` - Import multiple persons
- \`PUT /\` - Update an existing person
- \`DELETE /\` - Delete a person

### Email

- \`POST /\` - Send an email

### File Upload

- \`POST /\` - Upload a file

## Environment Variables

Create a \`.env\` file in the \`server\` directory and add the following variables:

\`\`\`
PORT=1111
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`

## Running the Project

1. Start the MongoDB server.

2. Run the server:
   \`\`\`bash
   cd server
   npm start
   \`\`\`

3. Run the client:
   \`\`\`bash
   cd ../client
   npm start
   \`\`\`

4. Open your browser and go to \`http://localhost:3000\` to see the application running.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

Distributed under the MIT License. See \`LICENSE\` for more information.

---

Thank you for using the Event Hall Management System! If you have any questions or need further assistance, please feel free to contact us.
