import { number } from "zod";
import { AppError } from "./AppError";

export class EmailInUseError extends AppError {
    constructor() {
        super('Este email já está sendo utilizado', 400);
    }
}