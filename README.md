# lovalla
## Smart Social Matching

Smart Social Matching is an MVP designed to enrich social connections by leveraging advanced matching algorithms and group-based interactions. The project aims to provide a platform where users are grouped into "Villas" based on deep personality insights and behavioral compatibility.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Running the Application](#setup--running-the-application)
  - [Backend (NestJS)](#backend-nestjs)
  - [Frontend (Next.js)](#frontend-nextjs)
- [Next Steps](#next-steps)
- [License](#license)

## Tech Stack

### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **HTTP Server:** Express (via `@nestjs/platform-express`)
- **Reactive Programming:** RxJS
- **Testing (Optional):** Jest

### Frontend
- **Framework:** [Next.js](https://nextjs.org/)
- **Library:** React
- **Rendering:** Server-side rendering (SSR) & Static Site Generation (SSG)

### Tooling & Infrastructure
- **Package Manager:** npm
- **TypeScript:** For type safety and better development experience
- **(Future Consideration):** Docker and AWS for containerization and scalable deployment


## Setup & Running the Application

### Backend (NestJS)

1. **Install Dependencies:**  
   Navigate to the `backend` directory and install dependencies:
   ```bash
   cd backend
   npm install

2. **Start the Development Server:**
Run the following command to start the NestJS server in development mode:
'''bash
npm run start:dev
The server will start on http://localhost:3000.

3. Test the API Endpoint:
Open your browser and navigate to http://localhost:3000/user to verify that the /user endpoint is returning the expected sample data.
