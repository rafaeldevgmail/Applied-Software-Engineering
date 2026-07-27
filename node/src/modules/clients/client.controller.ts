import { Request, Response, NextFunction } from "express";
import { IClientRepository } from "@/modules/clients/repository/client.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";

export class ClientController {
  constructor(private clientRepository: IClientRepository) {}
  // Index - listar clientes
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take, role } = req.query;
      const clients = await this.clientRepository.findAll({ skip, take, role });
      return res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  };
  // Update - atualizar cliente
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const clientId = Number(id);
      const client = await this.clientRepository.findById(clientId);
      if (!client) {
        throw new AppError("Cliente nao encontrado.", 404);
      }
      const clientUpdated = await this.clientRepository.update(
        clientId,
        req.body,
      );
      return res.status(200).json(clientUpdated);
    } catch (error) {
      next(error);
    }
  };
  // Delete - deletar cliente
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const clientId = Number(id);
      const client = await this.clientRepository.findById(clientId);
      if (!client) {
        throw new AppError("Cliente nao encontrado.", 404);
      }
      const clientDeleted = await this.clientRepository.delete(clientId);
      return res.status(200).json(clientDeleted);
    } catch (error) {
      next(error);
    }
  };
  // Create - criar cliente
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.clientRepository.create(req.body);
      return res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  };
  // Show - mostrar cliente
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const clientId = Number(id);
      const client = await this.clientRepository.findById(clientId);
      if (!client) {
        throw new AppError("Cliente nao encontrado.", 404);
      }
      return res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  };
}
