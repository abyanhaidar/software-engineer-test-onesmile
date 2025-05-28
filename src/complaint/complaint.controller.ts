import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Request,
  ForbiddenException 
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto, UpdateComplaintDto } from './dto/complaint.dto';
import { ComplaintStatus } from './complaint.model';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../user/user.model';

@ApiBearerAuth('access-token')
@Controller('complaints')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() body: CreateComplaintDto,
    @Request() req:any
  ) {
    const user = req.user;
    if (user.role !== UserRole.USER) {
      throw new ForbiddenException('Only residents can create complaints');
    }
    return this.complaintService.create(body, user.id);
  }

  @Get()
  findAll() {
    return this.complaintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.complaintService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateComplaintDto,
  ) {
    return this.complaintService.update(id, dto);
  }

  @Put(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: ComplaintStatus) {
    return this.complaintService.updateStatus(id, status);
  }
}
