Sistema Gestão de Clientes (SGC) - Eduardo Mendes Souza Mascarenhas


Backend -> NestJS, GraphQL, PostgreSQL, Node.js, Prisma

Frontend -> NextJS, MUI, ApolloClient, JWT Signin


//Passo a Passo para utilização do backend:

cd sgc-back

npm install

npx prisma migrate deploy

npx prisma db seed

npx prisma generate

npm run dev

//Passo a Passo para utilização do frontend:

cd sgc-front

npm install

npm run dev

//login e senha

Login: master@master.com.br

Senha: senhamaster

Para manipular as querys e mutations criadas para esse projeto recomendo a utilização do seguinte link: https://studio.apollographql.com/sandbox/explorer
e no espaço onde é para colocar a rota da API: http://localhost:4000/graphql

Dessa forma estarão listadas todas as possíveis querys e mutations do projeto para fácil utilização.


DDL -> Como foi utilizado o Prisma para a criação do backend, essas foram as migrations criadas (conferir na pasta '/prisma/migrations' do backend)

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "tel" TEXT,
    "coordX" INTEGER,
    "coordY" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

/*
  Warnings:

  - Made the column `name` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coordX` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coordY` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "tel" SET NOT NULL,
ALTER COLUMN "coordX" SET NOT NULL,
ALTER COLUMN "coordY" SET NOT NULL;

