import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole } from './user.model';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const { password, ...otherAttributes } = data;

    if (!password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userAttributes:any = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? UserRole.USER,
    };

    return User.create(userAttributes);
  }


  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    return user.update(data);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findByEmail(email: string) {
  return await User.findOne({ where: { email } });
}
}
