import path from 'path';
import express from 'express';
import cors from 'cors';
import { authRoutes } from './modules/auth/auth.routes';
import { companyRoutes } from './modules/companies/company.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Servir la carpeta public (Frontend estático)
app.use(express.static(path.join(__dirname, '../public')));

// Servir la carpeta uploads de forma estática (Multer)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);

export default app;
