# software-engineer-test-onesmile

Architecture Explanation:
A resident facility management system built with NestJS, TypeScript, and PostgreSQL. This application includes (from the task):
- ✅ User authentication and role-based access
- ✅ Complaint ticketing system
- ✅ Facility booking with admin approval
- ✅ Swagger API documentation

src/
> auth/                 # Auth (register, login, JWT strategy)
> user/                 # User CRUD
> complaint/            # Complaint ticketing CRUD
> facility/             # Facility CRUD
> facility-booking/     # Booking and approval CRUD (api on facility)
> config/               # Database config (Sequelize)
> migration/            # Sequelize migration files
> main.ts               # App entry point
> app.module.ts         # Main app module


----------------------------------------------------------------------------------------------------


How to run:
1. open terminal, make sure you are on the "software-engineer-test-onesmile" path
2. prepare the environment. firts run > $ npm install
3. setup the environment in .env
4. prepare the database by run > $ npm run sequelize-migrate
5. to run the project you can use > $ npm run start
6. list of api can be seen at > localhost:port/api-list
7. register user to create a user using > /api/auth/register
8. after register, make sure you authorized first by using login method using > /api/auth/login


----------------------------------------------------------------------------------------------------

Important Notes:
1. some API required for token, dont forget to login. some of API also require role "user" or "admin" for access
2. even if there is imageUrl but Multer isnt provided yet