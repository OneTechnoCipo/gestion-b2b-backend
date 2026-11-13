import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../config/database';
import { User } from '../users/user.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secreto_jwt';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);

  async register(email: string, password: string, role?: string) {
    const existingUser = await this.userRepo.findOneBy({ email });
    if (existingUser) {
      throw new Error('El correo electrónico ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      role: role || 'USER',
    });

    await this.userRepo.save(user);
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) {
      throw new Error('Credenciales inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas.');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
