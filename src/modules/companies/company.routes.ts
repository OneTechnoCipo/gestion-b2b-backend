import { Router } from 'express';
import { CompanyController } from './company.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { upload } from '../../middlewares/upload.middleware'; // <-- Importamos Multer

const router = Router();
const companyController = new CompanyController();

// Todas las rutas requieren autenticación JWT
router.use(authMiddleware);

router.post('/', validationMiddleware(CreateCompanyDto), companyController.create);
router.get('/', companyController.findAll);
router.put('/:id', validationMiddleware(UpdateCompanyDto), companyController.update);
router.delete('/:id', companyController.remove);

// Ruta con Multer para subir el logo o archivo de una empresa (Punto extra)
router.post('/:id/logo', upload.single('logo'), companyController.uploadLogo);

export const companyRoutes = router;