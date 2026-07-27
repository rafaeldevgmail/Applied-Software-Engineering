import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";

export class UserController {
  constructor(private userRepository: IUserRepository) {}

  //Index - Listar todos os usuários
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
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AppError("Usuário nao encontrado.", 404);
      }
      const userUpdated = await this.userRepository.update(userId, req.body);
      return res.status(200).json(userUpdated);
    } catch (error) {
      next(error);
    }
  };
  //Delete - Deletar usuário
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AppError("Usuário nao encontrado.", 404);
      }
      const userDeleted = await this.userRepository.delete(userId);
      return res.status(200).json(userDeleted);
    } catch (error) {
      next(error);
    }
  };

  //Show - Buscar usuário por ID
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = Number(id);
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new AppError("Usuário nao encontrado.", 404);
      }
      const userToShow = await this.userRepository.findById(userId);
      return res.status(200).json(userToShow);
    } catch (error) {
      next(error);
    }
  };
}
