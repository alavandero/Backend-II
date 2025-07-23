# BackEnd II - Complete JWT Authentication System

A comprehensive backend system with JWT authentication, user management, product catalog, shopping cart, and email notifications.

## Features

- 🔐 **JWT Authentication** - Secure login/logout with JWT tokens
- 👥 **User Management** - Complete CRUD operations for users
- 📧 **Email Notifications** - Welcome emails and password reset functionality
- 🛒 **Shopping Cart** - Product management and cart operations
- 📦 **Product Catalog** - Product CRUD operations
- 🎫 **Ticket System** - Purchase tickets and order management
- 🔒 **Role-based Access** - User, Admin, Premium roles
- 📱 **Responsive Design** - Mobile-friendly interface

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your configuration
4. Start MongoDB
5. Run the application:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/sessions/register` - Register a new user
- `POST /api/sessions/login` - Login user
- `GET /api/sessions/current` - Get current user info
- `POST /api/sessions/logout` - Logout user
- `POST /api/sessions/forgot-password` - Request password reset
- `POST /api/sessions/reset-password` - Reset password

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/num/:num` - Get user by number
- `GET /api/users/email/:email` - Check if email exists
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user by ID
- `PUT /api/users/num/:num` - Update user by number
- `DELETE /api/users/:id` - Delete user by ID
- `DELETE /api/users/num/:num` - Delete user by number
- `PUT /api/users/:id/password` - Change password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Carts
- `GET /api/carts` - Get all carts (Admin only)
- `GET /api/carts/:id` - Get cart by ID
- `POST /api/carts` - Create cart
- `POST /api/carts/:id/products` - Add product to cart
- `PUT /api/carts/:id/products/:productId` - Update product quantity
- `DELETE /api/carts/:id/products/:productId` - Remove product from cart
- `DELETE /api/carts/:id` - Clear cart
- `POST /api/carts/:id/purchase` - Purchase cart

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets` - Create ticket

## Frontend Views

- `/` - Home page
- `/login` - Login form
- `/register` - Registration form
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/profile` - User profile (protected)
- `/products` - Product catalog (protected)
- `/cart` - Shopping cart (protected)

## Project Structure

```
src/
├── config/
│   ├── index.js              # Environment configuration
│   └── passport.config.js    # Passport JWT strategy
├── controllers/
│   ├── user.controller.js    # User operations
│   ├── sessions.controller.js # Authentication
│   ├── product.controller.js # Product operations
│   ├── cart.controller.js    # Cart operations
│   └── ticket.controller.js  # Ticket operations
├── models/
│   ├── user.model.js         # User schema
│   ├── product.model.js      # Product schema
│   ├── cart.model.js         # Cart schema
│   └── ticket.model.js       # Ticket schema
├── repositories/
│   ├── user.repository.js    # User data access
│   ├── product.repository.js # Product data access
│   ├── cart.repository.js    # Cart data access
│   └── ticket.repository.js  # Ticket data access
├── services/
│   ├── user.service.js       # User business logic
│   ├── sessions.service.js   # Authentication logic
│   ├── product.service.js    # Product business logic
│   ├── cart.service.js       # Cart business logic
│   └── ticket.service.js     # Ticket business logic
├── routes/
│   ├── users.router.js       # User routes
│   ├── sessions.router.js    # Authentication routes
│   ├── products.router.js    # Product routes
│   ├── carts.router.js       # Cart routes
│   ├── tickets.router.js     # Ticket routes
│   └── views.router.js       # Frontend routes
├── middlewares/
│   └── auth.middleware.js    # JWT authentication middleware
├── utils/
│   ├── hash.js               # Password hashing utilities
│   ├── getNextNumber.js      # Sequential number generation
│   └── mailer.js             # Email utilities
├── DTO/
│   └── user.DTO.js           # User data transfer object
├── views/
│   ├── layouts/
└── server.js                 # Main application file
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **Passport.js** - Authentication middleware
- **bcrypt** - Password hashing
- **nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- Secure cookie settings
- CORS protection
- Environment variable configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
