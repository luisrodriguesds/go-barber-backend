<h2 align="center">
  GoBarber - Backend
</h2>

## About

Aplicação responsável por marcar agendamentos de visita ao barbairo

## Techs

- Typescript
- TypeORM
- Design Pattern

## How To Use

```bash

# Clone this repository

$ git clone https://github.com/luisrodriguesds/go-barber-backend.git

# Go into the repository

$ cd go-barber-backend

# Install packages

$ yarn install

# Configure .env with your database, auth and upload information

$ gedit config/auth.ts && config/upload.ts && typeorm.json

# Run the migrations

$ yarn typeorm migration:run

# Run start and enjoy

$ yarn dev:server

# Enjoy!

```
