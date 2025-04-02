# Airbnb Clone – Full-Stack Booking Platform

A full-featured Airbnb-inspired booking platform built with Next.js, Tailwind CSS, Node.js, and Prisma. Includes secure authentication, property listings, calendar-based booking, Stripe payment integration, real-time messaging, and more.

# Features

- Authentication with Clerk (Sign Up, Sign In, Role-based Access)

- Host: Create and manage property listings

- Booking calendar with date validation

- Stripe integration for secure payments

- Real-time chat between hosts and guests using Socket.io

- Admin panel for managing users, properties, and bookings

- Responsive UI with modern UX

- Tech Stack

## Frontend

- React

- Tailwind CSS

- Axios

- Clerk for authentication

## Backend

- Node.js

- Express.js

- Prisma ORM

- Socket.io (real-time messaging)

## Database

- mySQL

- Payment Gateway

- Stripe


# Getting Started

## 1. Clone the Repository
``` bash
git clone https://github.com/olliewiranphatDEV/AirbnbClone-FrontendWEB
cd airbnb-clone
```
## 2. Install Dependencies

## Frontend
``` bash
cd client
npm install
```
## Backend
``` bash
cd ../server
npm install
```
## 3. Configure Environment Variables

Create .env files in both client/ and server/

## Example .env (Backend)

DATABASE_URL=your_mysql_url
STRIPE_SECRET_KEY=your_stripe_secret
CLERK_SECRET_KEY=your_clerk_secret

### Example .env (Frontend)

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

## 4. Setup Prisma & Run Dev Server

# Backend
``` bash
cd server
npx prisma generate
npx prisma migrate dev
npm start
```
# Frontend
``` bash
cd ../client
npm run dev
```
## Visit http://localhost:5173

# Screenshots (Add your own images)

### Homepage with listings
https://media-hosting.imagekit.io/8d259f550bf7498d/Screenshot%202025-03-31%20151912.png?Expires=1838017184&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=h9CptAfOE0xjTfeUJZRu8ot1cCYtkbw5uueHkwb3FpHZ~8L3qwGzIkn5J3SFX8A-gyMWGzukdKdr2aTD2OPo1hy3kq3JDRbBIWnJGeI28ykgffaQolD-Zpv1Nmktkhukd-5PgSCkvayzMqDr3SV5HmeyevMJ9RlobgdOkvnAgTHbxTTvHgi1jJI1XPD9tk8IJ~lCkG2pJuB6q5ZuIzeeLo2I9BIO2ji8wK0ZALsvMi7DZCIHRR8Tq1dNnnLP7gJbSyQQJsop5uxNP4E9J1Gtw-l1d5DMwZ5vBhPF~M8wMG8CnGkZhqtcsS5jeDZkODSCM4oRQJEwEQrUXOK9Ddjx7A__

### Admin dashboard
https://media-hosting.imagekit.io/2d78b809a98647e4/Airbnb-Admin.png?Expires=1838017236&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EpAcIpVD67L2GGMoq-MUD3WAljcieAkrKosl9OhdZvXrdcZZZkX5SfVVra6R0jTtEocorVC3ixWxNQVgKY6Zda9IR8K4D5zYX7Q-okY-2z3B-7x1V4KaA21cGvua9kP6RVYRhdGnLOa73qtqsht0j11qzUhu~8uVUO1iKCs-gTtJp0J~bbApq6rnQKZbTUBizAya4wTE1AQkt2c1TGsJuUx5LwaJRRGO5-GoAsiTbPdsXo3o7BrMZGjkI9ZJZep3wpACRQnkYQPXFBHt5VHOYW6tWKDbQGsJoKCWxIN~V5b6kx~KhaXBXF6la-BiZns30xgvs54TGjCCKNZPuKzZzg__

### Host Setup
https://media-hosting.imagekit.io/573488fcbe044c31/Airbnb-SetupHost.png?Expires=1838017288&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Eg-J0ee8NmI6gGGtZ3ZD38rrxWUXPaIdziI7d-gLLaapXuX0GmeitQ9L72A~bZ4M7ry0zWEo5YM4RipBOGh-be64u7qtGdGQcs9pq8k12vr8jzBJwQJWVTqzVo6Os4PNJZR07B3OC-zlm8uCaap4ewYqr8armZ-08dBmnmYktIvQJ1OM5lbdZBTgcjHhV~A5a9s~tCfi-ktCoK1Fj-SMWjkneMK02lpfWjt3AZkFX0bM2iKtnEkPwRu~U8yIvEd2Bg7c-wyolM5f5FfiNI9YBmPCkosFCjhB8JlO-AsPton2s5ieVILqHLz6vFrNtSqCmiJq21nThEdKaBVu1vPqUA__

### Real-time chat window
https://media-hosting.imagekit.io/efc58d0e708f468a/Airbnb-Message&AI.png?Expires=1838017312&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=MkcrQ9c~cl5UtOgfVhxJH2m~2tfwVOYMn~9DXQUIBMv11Xm6ymSwsRDCU8Tb-tXI5MVSe~NKij9bHb45-DUqkbau2cAJYjFnF8JHFYLMu5q47c0l8IboQQ7moyOkYx837hYQ3-XfYtxbV0LcwCue8nWaNzlsInkzIfhDJdmvHCC3GaRFhyd5u1KjiKYS9YzkKlEKztQ5ANsmdILvXFYONUBKIuYHRNEwKWjwKX~APkQLPoPW-yY6Tkkdo273G1wx3-W10MrujNNhHuCSE0GVGABtmIHaALsqowIhMNZkBfFHBPI1XOynImGHarcS4ByZKLo5YiU4FNptnBG3tFOLaw__

# Project Structure
``` bash
/airbnb-clone
├── /client          # Next.js frontend
│   ├── /pages
│   ├── /components
│   └── vite.config.js
├── /server          # Express backend
│   ├── /controllers
│   ├── /routes
│   ├── /prisma
│   └── index.js
└── README.md
```

# License

This project is licensed under the MIT License.

# Acknowledgements

Inspired by Airbnb

Clerk for authentication

Stripe for payments

Prisma ORM for database management

Socket.io for real-time chat

