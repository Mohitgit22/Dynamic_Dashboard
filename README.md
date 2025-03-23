# Dynamic Dashboard

## Getting Started

Follow these steps to set up and run the project locally on your system.

### Prerequisites
Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Recommended version: 18+)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/) (or use the provided database connection)
- [Prisma](https://www.prisma.io/)

### Installation Steps

#### 1. Clone the repository
```sh
git clone https://github.com/Mohitgit22/Dynamic_Dashboard.git
```

#### 2. Navigate to the project directory
```sh
cd Dynamic_Dashboard
```

#### 3. Install dependencies
```sh
npm install
```

#### 4. Set up environment variables
Create a `.env` file in the root of the project and add the following:
```sh
DATABASE_URL="postgresql://postgresql_owner:npg_fQk7xjMqed8b@ep-square-rain-a5x2ashh-pooler.us-east-2.aws.neon.tech/postgresql?sslmode=require"
NEXT_PUBLIC_JWT_SECRET="mohit"
```

#### 5. Generate Prisma client and migrate database
```sh
npx prisma generate
npx prisma migrate dev --name init
```

#### 6. Run the development server
```sh
npm run dev
```
The application will be available at `http://localhost:3000/`.


