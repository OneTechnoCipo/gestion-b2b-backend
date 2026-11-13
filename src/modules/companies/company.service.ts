import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { Company } from './company.entity';

export class CompanyService {
  private companyRepository: Repository<Company>;

  constructor() {
    this.companyRepository = AppDataSource.getRepository(Company);
  }

  async create(data: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(data);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company | null> {
    return await this.companyRepository.findOneBy({ id });
  }

  async update(id: string, data: Partial<Company>): Promise<Company | null> {
    const company = await this.findOne(id);
    if (!company) return null;
    
    this.companyRepository.merge(company, data);
    return await this.companyRepository.save(company);
  }

  async remove(id: string): Promise<boolean> {
    const company = await this.findOne(id);
    if (!company) return false;

    await this.companyRepository.remove(company);
    return true;
  }
}
