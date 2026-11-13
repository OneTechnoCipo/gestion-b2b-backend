import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export function validationMiddleware(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Transformamos el body plano a una instancia del DTO
    const output = plainToInstance(dtoClass, req.body);
    
    // Validamos (whitelist: true ignora campos que no estén en el DTO)
    const errors: ValidationError[] = await validate(output, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints ? Object.values(error.constraints) : [],
      }));

      return res.status(400).json({
        error: 'Error de validación en los datos de entrada.',
        details: formattedErrors,
      });
    }

    req.body = output;
    return next();
  };
}