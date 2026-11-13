import dotenv from 'dotenv';
import Joi from 'joi';

// Cargamos el .env
dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
}).unknown(); // Permite otras variables del sistema o extras

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  console.error(`❌ Error de configuración en las variables de entorno: ${error.message}`);
  process.exit(1);
}

export const env = {
  port: Number(envVars.PORT),
  dbHost: envVars.DB_HOST,
  dbPort: Number(envVars.DB_PORT),
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  jwtSecret: envVars.JWT_SECRET,
};