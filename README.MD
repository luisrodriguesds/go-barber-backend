<h2 align="center">
  GoBarber - Backend
</h2>

## About

Aplicação responsável por marcar agendamentos de visita ao barbairo

## Requirement

### Recuperação de senha

**RF**

- O usuário deve poder resuperar sua senha informando o seu email;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Ultilizar Mailtrap para testar envios em amviente de dev;
- Ultilizar amazon SES ppara envios em produção;
- O envio de emails deve acontecer em segundo plano (bkg job)

**RN**

- O link enviado por email para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a sua senha;

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
