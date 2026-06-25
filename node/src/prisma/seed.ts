import prisma from "../lib/prisma.ts";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

async function main() {
  console.log("Limpar banco de dados...");
  await prisma.task.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Criando usuário de teste (Rafael)...");
  const salt = await bcrypt.genSalt(10);
  const defaultPassword = await bcrypt.hash("Senha123", salt);

  const mainUser = await prisma.user.create({
    data: {
      name: "Rafael",
      email: "rafa@email.com",
      password: defaultPassword,
    },
  });

  console.log("Gerando mockups de Clientes e Tarefas...");
  for (let i = 0; i < 5; i++) {
    const client = await prisma.client.create({
      data: {
        userId: mainUser.id,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        company: faker.company.name(),
        status: faker.helpers.arrayElement(["active", "inactive", "prospect"]),
        notes: faker.lorem.paragraph(),
      },
    });

    // Cria 2 tarefas fictícias para cada cliente gerado
    await prisma.task.createMany({
      data: [
        {
          userId: mainUser.id,
          clientId: client.id,
          title: `Reunião com ${client.name}`,
          description: faker.lorem.sentence(),
          status: "todo",

          priority: "high",
          dueDate: faker.date.future(),
        },
        {
          userId: mainUser.id,
          clientId: client.id,
          title: `Enviar orçamento para ${client.company}`,
          description: faker.lorem.sentence(),
          status: "in_progress",
          priority: "medium",
          dueDate: faker.date.future(),
        },
      ],
    });
  }

  console.log("✅ Mockup inserido com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
