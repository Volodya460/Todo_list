# Todo List Application

A full-stack Todo List application with user authentication, email verification, and responsive design. Built with modern web technologies and following best practices for code organization and user experience.

## 🚀 Features

### Core Functionality

- **Todo Management**: Create, Read, Update, Delete todos with full CRUD operations
- **User Authentication**: Secure login/signup with JWT tokens
- **Email Verification**: Account verification via email links
- **Password Reset**: Forgot password functionality with email reset links
- **Responsive Design**: Adaptive UI for Desktop, Tablet, and Mobile devices
- **Filtering & Search**: Filter todos by title and status (private/completed)
- **Pagination**: Smart pagination that adapts to device type

### User Experience

- **Private & Public Todos**: Users can create private todos or share public ones
- **Real-time Updates**: Immediate UI updates after operations
- **Form Validation**: Comprehensive client and server-side validation
- **Error Handling**: User-friendly error messages and loading states
- **Persistent Sessions**: Automatic token management and session persistence

## 🏗️ Architecture

### Backend (Node.js/Express)

- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Passport.js
- **Email Service**: Nodemailer for verification and password reset emails
- **Validation**: Zod schema validation
- **Architecture**: MVC pattern with services, controllers, and middleware

### Frontend (React)

- **Framework**: React 18 with TypeScript
- **State Management**: Zustand for global state
- **Styling**: Emotion CSS with responsive design
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router with protected routes
- **HTTP Client**: Axios with interceptors

## 📁 Project Structure

```
Todo_list/
├── packages/
│   ├── backend/                 # Express.js API server
│   │   ├── src/
│   │   │   ├── controllers/     # Request handlers
│   │   │   ├── services/        # Business logic
│   │   │   ├── routes/          # API routes
│   │   │   ├── middlewares/     # Custom middleware
│   │   │   ├── helpers/         # Utility functions
│   │   │   └── types/           # TypeScript types
│   │   └── prisma/              # Database schema & migrations
│   └── frontend/                # React application
│       ├── src/
│       │   ├── api/             # API client functions
│       │   ├── components/      # Reusable UI components
│       │   ├── pages/           # Page components
│       │   ├── store/           # Zustand stores
│       │   ├── router/          # Routing configuration
│       │   └── shared/          # Shared utilities & styles
│       └── public/              # Static assets
```

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Passport.js
- **Email**: Nodemailer
- **Validation**: Zod
- **CORS**: Express CORS middleware

### Frontend

- **Framework**: React 18
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Emotion CSS
- **Forms**: React Hook Form + Zod
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **UI Components**: Custom components with responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Todo_list
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   yarn install

   # Install backend dependencies
   cd packages/backend
   yarn install

   # Install frontend dependencies
   cd ../frontend
   yarn install
   ```

3. **Database Setup**

   ```bash
   cd packages/backend

   # Set up your database URL in .env
   # DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"

   # Run database migrations
   npx prisma migrate dev

   # Generate Prisma client
   npx prisma generate
   ```

4. **Environment Configuration**

   Create `.env` files in both backend and frontend directories:

   **Backend (.env)**

   ```env
   PORT=3000
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"
   SECRET_KEY="your-jwt-secret-key"
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-email-app-password"
   FRONTEND_BASE_URL="http://localhost:5173"
   BACKEND_BASE_URL="http://localhost:3000"
   ```

   **Frontend (.env)**

   ```env
   VITE_API_URL="http://localhost:3000/api"
   ```

5. **Start the application**

   ```bash
   # Start backend (from packages/backend)
   yarn serve

   # Start frontend (from packages/frontend)
   yarn dev
   ```

## 📱 Features in Detail

### Authentication Flow

1. **Registration**: User signs up with username, email, and password
2. **Email Verification**: Verification link sent to email, redirects to login
3. **Login**: JWT token issued upon successful authentication
4. **Password Reset**: Forgot password sends reset link via email
5. **Session Management**: Automatic token refresh and logout functionality

### Todo Management

- **CRUD Operations**: Full create, read, update, delete functionality
- **Privacy Control**: Toggle between private and public todos
- **Status Management**: Mark todos as completed/incomplete
- **Ownership**: Private todos only accessible to creators
- **Public Sharing**: Public todos readable by all users

### Responsive Design

- **Desktop**: Table layout with button pagination
- **Tablet**: Slider layout with horizontal scroll pagination
- **Mobile**: List layout with vertical scroll pagination

### Filtering & Search

- **Title Search**: Filter todos by title text
- **Status Filter**: Filter by private/completed status
- **URL Parameters**: Filters persist in URL for sharing/bookmarking

## 🔧 API Endpoints

### Authentication

- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `GET /api/user/verify/:code` - Email verification
- `POST /api/user/forgot-password` - Send password reset email
- `POST /api/user/reset-password` - Reset password with token
- `GET /api/user/current` - Get current user info

### Todos

- `GET /api/todos` - Get todos with pagination and filters
- `POST /api/todos` - Create new todo
- `GET /api/todos/:id` - Get specific todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🎨 Design System

### Colors

- Primary colors defined in theme constants
- Consistent color palette across components
- Dark/light mode support ready

### Typography

- Responsive font sizes
- Consistent font families
- Proper hierarchy and spacing

### Components

- Reusable button components
- Form components with validation
- Modal and overlay components
- Loading and error states

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Email Verification**: Prevents fake accounts
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Server-side validation with Zod
- **Rate Limiting**: Protection against abuse (can be added)

## 🚀 Deployment

### Backend Deployment

- Configure environment variables
- Set up PostgreSQL database
- Deploy to platform (Heroku, Railway, etc.)
- Run database migrations

### Frontend Deployment

- Build the application: `yarn build`
- Deploy to platform (Vercel, Netlify, etc.)
- Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Express.js community
- React ecosystem
- Prisma team
- All contributors and reviewers
