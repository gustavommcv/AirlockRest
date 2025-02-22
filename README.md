# Airlock Website Rest API

This project is a clone of an API for a fictitious website that is part of a crash course on Apollo Server and GraphQL. The original REST API was refactored to follow Clean Architecture principles and TDD (Test-Driven Development), using TypeScript, Express, Node.js, ESLint, Jest, MariaDB, Bcrypt, and JWT.

![image](https://github.com/user-attachments/assets/470a1d09-1035-41cc-9c71-22e0eda9cad9)

- [🚀 Technologies](#-technologies)
- [📂 Project Structure](#-project-structure)
- [🛠️ How to Run the Project](#️-how-to-run-the-project)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
  - [Database Configuration](#database-configuration)
- [🧪 Tests](#-tests)
- [📝 License](#-license)
- [🙌 Contributing](#-contributing)

## 🚀 Technologies

- **TypeScript** – Main programming language
- **Node.js** – JavaScript runtime environment
- **Express** – Web framework for the REST API
- **MariaDB** – Relational database
- **Bcrypt** – Library for password hashing
- **JWT (JSON Web Tokens)** – Authentication and authorization
- **Jest** – Test framework for unit and integration tests
- **Clean Architecture** – Code organization and separation of concerns
- **TDD** – Test-Driven Development approach

## 📂 Project Structure

Below is an overview of the folder structure following the Clean Architecture approach:

    .
    ├── .git
    ├── node_modules
    ├── src
    │ ├── application
    │ │ ├── dtos
    │ │ │ ├── userDtoRequest.ts
    │ │ │ └── userDtoResponse.ts
    │ │ └── services
    │ │ │ └── userService.ts...
    │ ├── domain
    │ │ ├── entities
    │ │ │ └── IUser.ts
    │ │ ├── repository / service contracts
    │ │ └── IUserRepository ...
    │ ├── infrastructure
    │ │ ├── database
    │ │ │ ├── connection.ts
    │ │ │ ├── seed
    │ │ │ │ └── seeds.ts ...
    │ │ │ └── models
    │ │ │ └── User.ts ...
    │ │ ├── http
    │ │ │ └── controllers
    │ │ │ └── authController.ts ...
    │ │ ├── middlewares
    │ │ │ └── validationsErrors.ts ...
    │ │ ├── routes
    │ │ │ ├── authRouter.ts
    │ │ │ └── userRouter.ts ...
    │ │ └── utils
    │ │ └── generateToken.ts ...
    ├── .env.example
    ├── .env
    ├── .eslintrc.js
    ├── jest.config.js
    ├── package.json
    ├── package-lock.json
    ├── script.sql
    ├── tsconfig.json
    └── README.md

- **application**: Contains DTOs (Data Transfer Objects) and service classes.
- **domain**: Contains entities and core domain logic.
- **infrastructure**: Contains infrastructure-related code (database connections, contracts implementation, seeds, etc.).

## 🛠️ How to Run the Project

### Prerequisites

- Node.js
- MariaDB (or another compatible database)
- Yarn or npm

### Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-user/your-project.git
   cd your-project
   ```

2. **Install dependencies:**

   ```bash
   # Using Yarn
   yarn install

   # Or using npm
   npm install
   ```

## Database Configuration

**Run the `script.sql`**

- You can execute the script using your MariaDB client:
  ```bash
  mysql -u your_username -p your_database_name < script.sql
  ```
  Rename .env.example to .env and update the environment variables with your database credentials and other settings.
  example:

  ```env
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=your_username
  DB_PASSWORD=your_password
  DB_NAME=your_database_name
  JWT_SECRET=your_jwt_secret_key
  ```

## 🧪 Tests

This project uses **Jest** for unit and integration tests. To run the tests, use one of the following commands:

```bash
npm run test
# or
yarn test
```

## 📝 License

This project is licensed under the MIT License. Please see the LICENSE file for more details.

## 🙌 Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.
Made with ❤️ by [Gustavo Monnerat](https://github.com/gustavommcv)
