import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      res.status(400).json({
        ok: false,
        message: 'Error de validación en los datos enviados',
        errors: errorMessages,
      });
      return;
    }
    
    next();
  };
};
