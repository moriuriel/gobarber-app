<h1>
  🏅 Backend GoBarber
</h1>
<h4 align="justify">
  O Gobarber é um aplicativo desenvolvido durante o bootcamp 11 da rockeseat, nele o usuário pode agendar um horário com seu barbeiro favorito, e o barbeiro consegue visualizar todos os agendamentos do dia.
</h4>

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Typscript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/docker-community)
- [Typeorm](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres](https://www.npmjs.com/package/pg)
- [Redis](https://redis.io/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Yup](https://www.npmjs.com/package/yup)
- [Nodemailer](https://nodemailer.com/about/)
- [Ethereal](https://ethereal.email/)
- [date-fns](https://date-fns.org/)
- [DotEnv](https://www.npmjs.com/package/dotenv)

## Como usar

1.  Clone o repositório:

    `git clone https://github.com/moriuriel/gobarber-server.git`

2.  Na pasta do projeto use o camando:

    `yarn install`

3.  Configurando typeorm, crie um arquivo **ormconfig.json**:

    **Configuração para o prostgres:**

    ```json
    {
        "name": "default",
        "type": "postgres",
        "username": "postgres",
        "password": "postgres",
        "host": "localhost",
        "port": 5432,
        "database": "gobarber",
        "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
        "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
        "cli": {
          "migrationsDir": "./src/shared/infra/typeorm/migrations"
      },
    ```

    **Configuração para o mongodb:**

    ```json
    {
      "name": "mongo",
      "type": "mongodb",
      "host": "localhost",
      "port": 27017,
      "database": "gobarber",
      "useUnifiedTopology": true,
      "entities": ["./src/modules/**/infra/typeorm/schemas/*.ts"]
    }
    ```

4.  Não esqueça de copiar o arquivo **.env.example** para **.env**

5) Por fim utlize o camando `yarn typeorm migrations:run` para execultar as migrations e `yarn dev:server` para iniciar o servidor de desenvolvimento
