# Backend

This is the fincheck backend.

## Database

The database used was Postgres together with Prisma ORM.

<p align="center">
    <img  src="../.github/img/data_model.jpg">
</p>

## Design Pattern

<ul>
    <li>Repository Pattern</li>
    <li>Service Layer Pattern</li>
</ul>

## Tests

Future update

## Swagger Documentation

Future update

## How to use?

To use the application it is recommended to have docker installed, so it is not necessary to install the database and other utilities found in the docker-compose file.

Clone this project on your favorite dir and change to backend dir:

```console
cd backend
```

Edit the .env.example file to .env and put the necessary environment variables.

Start the dockers containers.

```console
docker-compose up -d
```

Run the command to create the tables in the database

```console
npx prisma generate
```

Run the migrates

```console
npx prisma migrate deploy
```
 
The application was available in

```console
http://localhost:3000/
```