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

### Atualização de Perfil

**RF**

- O usuário deve ´pder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email já utilizado
- Para atualizar sua senha, o usuário deve informar a senha antiga
- Para atualizar sua senha, o usuário precisa confirmar a nova senha

### Agendamento de serviços

**RF**

- Ousuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 7h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

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
