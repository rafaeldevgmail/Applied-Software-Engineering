import { PrismaClientRepository } from "@/modules/clients/repository/prisma/client.prisma.repository.ts";
import { ClientController } from "@/modules/clients/client.controller.ts";

const clientRepository = new PrismaClientRepository();

export const clientController = new ClientController(clientRepository);
