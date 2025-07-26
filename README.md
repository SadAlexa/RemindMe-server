# RemindMe Server

This repository contains the backend for [RemindMe](https://github.com/SadAlexa/RemindMe).

## Features

- [x] **Authentication**: Users can register and log in to the application using email and password.
- [x] **Data Synchronization**: Users can synchronize their tasks between the local device and the server.

## Technologies Used

- **Nest.js**: Framework for building server-side applications in Node.js.
- **PostgreSQL**: Relational database management system used for data persistence.
- **DrizzleORM**: Object-Relational Mapping (ORM) to simplify interaction with the database.
- **Nginx**: Web server used as a reverse proxy to handle requests and enable HTTPS.
- **JSON Web Tokens (JWT):**: Used for authentication and session management.

## Usage

gitclone del progetto. poi crei l env con appdomain e sslemail. poi cartella nginx con script 99, poi script init-letsencrypt e poi il docker-compose. prima avvii script init e poi buildi il docker e poi segui il sito per l'ssl

1. Clone the project

```sh
git clone https://github.com/SadAlexa/RemindMe-server
```

2. Edit _project-env-example_ and _nginx-env-example_ files
3. Edit _docker-compose.yml_ file
4. Use [this guide]{https://dev.to/marrouchi/the-challenge-about-ssl-in-docker-containers-no-one-talks-about-32gh}
