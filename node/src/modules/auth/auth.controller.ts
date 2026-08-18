import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { RegisterStartUseCase } from "@/modules/users/useCases/RegisterStartUseCase.ts";
import { RegisterCompleteUseCase } from "@/modules/users/useCases/RegisterCompleteUseCase.ts";
import { LoginUseCase } from "@/modules/users/useCases/LoginUseCase.ts";
import { ForgotPasswordUseCase } from "@/modules/users/useCases/ForgotPasswordUseCase.ts";
import { ResetPasswordUseCase } from "@/modules/users/useCases/ResetPasswordUseCase.ts";
import { ResendRegisterTokenUseCase } from "@/modules/users/useCases/ResendRegisterTokenUseCase.ts";

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
      const result = await loginUseCase.execute(req, res, next);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const forgotPasswordUseCase = new ForgotPasswordUseCase(
        this.userRepository,
      );
      const result = await forgotPasswordUseCase.execute(req, res, next);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resetPasswordUseCase = new ResetPasswordUseCase(
        this.userRepository,
      );
      const result = await resetPasswordUseCase.execute(req, res, next);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  resendRegisterToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const resendRegisterTokenUseCase = new ResendRegisterTokenUseCase(
        this.userRepository,
      );
      const result = await resendRegisterTokenUseCase.execute(req, res, next);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
