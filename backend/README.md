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

```console
cp .env.example .env
```

Start the dockers containers.

```console
docker-compose up -d
```

Change env of DABATESE_HOST to "localhost"

Run the command to create the tables in the database

```console
npx prisma generate
```

Run the migrates

```console
npx prisma migrate dev
```

Change env of DABATESE_HOST to "fincheck-db" (container name inside docker-compose.yml)

Restart docker container:

```console
docker compose down && docker compose up -d
```
 
The application was available in

```console
http://localhost:3000/
```