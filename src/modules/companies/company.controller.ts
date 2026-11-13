import { Request, Response } from 'express';
import { AppDataSource } from '../../config/database';
import { Company } from './company.entity';
import { ILike } from 'typeorm';

export class CompanyController {
  private companyRepository = AppDataSource.getRepository(Company);

  // Crear empresa
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const company = this.companyRepository.create(req.body);
      await this.companyRepository.save(company);
      return res.status(201).json(company);
    } catch (error) {
      return res.status(500).json({ error: 'Error al crear la empresa.' });
    }
  };

  // Listar empresas con Paginación y Búsqueda
  public findAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = (req.query.search as string) || '';
      
      const skip = (page - 1) * limit;

      const whereCondition = search
        ? [
            { name: ILike(`%${search}%`) },
            { taxId: ILike(`%${search}%`) },
          ]
        : {};

      const [companies, total] = await this.companyRepository.findAndCount({
        where: whereCondition,
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      });

      return res.status(200).json({
        data: companies,
        pagination: {
          totalItems: total,
          itemCount: companies.length,
          itemsPerPage: limit,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al obtener las empresas.' });
    }
  };

  // Actualizar empresa (PUT)
  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const company = await this.companyRepository.findOneBy({ id });

      if (!company) {
        return res.status(404).json({ error: 'Empresa no encontrada.' });
      }

      this.companyRepository.merge(company, req.body);
      await this.companyRepository.save(company);

      return res.status(200).json(company);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar la empresa.' });
    }
  };

  // Eliminar empresa (DELETE)
  public remove = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const company = await this.companyRepository.findOneBy({ id });

      if (!company) {
        return res.status(404).json({ error: 'Empresa no encontrada.' });
      }

      await this.companyRepository.remove(company);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar la empresa.' });
    }
  };

  // Subir archivo / logo de la empresa (Multer - Crédito extra)
  public uploadLogo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const company = await this.companyRepository.findOneBy({ id });

      if (!company) {
        return res.status(404).json({ error: 'Empresa no encontrada.' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo o el formato no es válido.' });
      }

      return res.status(200).json({
        message: 'Archivo subido con éxito',
        companyId: id,
        filename: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error al procesar la subida del archivo.' });
    }
  };
}