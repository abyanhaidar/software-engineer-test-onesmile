import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../user/user.model';


export class CreateUserDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'yourpassword' })
  password!: string;
}