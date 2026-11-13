import 'reflect-metadata';
import './config/env.validation';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppDataSource } from './config/database';
import { companyRoutes } from './modules/companies/company.routes';
import { authRoutes } from './modules/auth/auth.routes';

// Equivalente a __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Servir la carpeta public de forma estática (Frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Servir la carpeta uploads de forma estática (Multer)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);

// Inicializar Base de Datos y levantar servidor
AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conexión a la Base de Datos establecida con éxito.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la Base de Datos:', error);
  });

export default app;
