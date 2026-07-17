import { Request, Response } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { RegisterStartUseCase } from "@/modules/users/useCases/RegisterStartUseCase.ts";
import { RegisterCompleteUseCase } from "@/modules/users/useCases/RegisterCompleteUseCase.ts";
import { LoginUseCase } from "@/modules/users/useCases/LoginUseCase.ts";

export class AuthController {
  constructor(private userRepository: IUserRepository) {}

  registerStart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerStartUseCase = new RegisterStartUseCase(
        this.userRepository,
      );
      const result = await registerStartUseCase.execute(req, res);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  registerComplete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const registerCompleteUseCase = new RegisterCompleteUseCase(
        this.userRepository,
      );
      const result = await registerCompleteUseCase.execute(req, res);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginUseCase = new LoginUseCase(this.userRepository);
      const result = await loginUseCase.execute(req, res);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
