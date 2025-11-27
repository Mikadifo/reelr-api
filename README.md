# Reelr API

Reelr is a web app that helps you keep track of movies you love and would watch again, movies that you want to watch or movies that you didn’t like as much. You’ll be able to rate movies from 1 to 5, create custom lists, and even publicly share your lists/movies with friends.

## Get Started

- Clone this repository: `git clone https://github.com/Mikadifo/reelr-api.git`
- Create an `.env` file and add the following:
  ```
  DATABASE_URL="prisma+postgres://..."
  JWT_SECRET="..."
  ```
- Install the necessary dependencies: `npm run install`
- Start the server `npm run dev`
- (Optional) Start prisma studio `npx prisma studio`

> If the provided prisma Database URL does not work, you might have to create another one with the provided schema

## Test endpoints

You can test any available endpoint using Swagger, just go to http://localhost:8000/docs once you start the server.
