import { Request, Response } from "express";
import { IUserRepository } from "../repositories/user.repository.interface.ts";

export class UserController {
  constructor(private userRepository: IUserRepository) {}
  //Create - Criar usuário
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userRepository.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      // O Express joga o erro direto para o Middleware Global!
      next(error);
    }
  };

  //Read - Listar todos os usuários
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skip, take, role } = req.query;
      const users = await this.userRepository.findAll({ skip, take, role });
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  //Update - Atualizar usuário
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const user = await this.userRepository.update(userId, req.body);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  //Delete - Deletar usuário
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const user = await this.userRepository.delete(userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  //Read - Buscar usuário por ID
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const user = await this.userRepository.findById(userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
