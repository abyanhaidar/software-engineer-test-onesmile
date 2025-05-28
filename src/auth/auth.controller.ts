import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../auth/dto/auth.dto';
import { User } from '../user/user.model';

@Controller('auth')

export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}


  @Post('register')
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.create(userData);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
