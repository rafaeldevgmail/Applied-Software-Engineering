import { Request, Response } from "express";
import { IUserRepository } from "../repositories/user.repository.interface.js";

export class UserController {
  constructor(userRepository) {}
  //Create - Criar usuário
  create = async (req, res) => {
    try {
      const user = await this.userRepository.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao criar usuário", error: error.message });
    }
  };

  //Read - Listar todos os usuários
  index = async (req, res) => {
    try {
      const users = await this.userRepository.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao listar usuários", error: error.message });
    }
  };

  //Update - Atualizar usuário
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.update(id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", error: error.message });
    }
  };
  //Delete - Deletar usuário
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.delete(id);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar usuário", error: error.message });
    }
  };

  //Read - Buscar usuário por ID
  show = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findById(id);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuário", error: error.message });
    }
  };
}
