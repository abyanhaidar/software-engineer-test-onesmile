import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Complaint, ComplaintStatus } from './complaint.model';
import { CreateComplaintDto, UpdateComplaintDto } from './dto/complaint.dto';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel(Complaint)
    private complaintModel: typeof Complaint,
  ) {}

  async create(data: CreateComplaintDto, userId:number): Promise<Complaint> {
		console.log(userId)
    const complaintAttributes:any = {
			title: data.title,
			description: data.description,
			status: ComplaintStatus.OPEN, // Default
			category: data.category,
			imageUrl: data.imageUrl,
			userId,
    };

    return this.complaintModel.create(complaintAttributes);
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Complaint> {
    const complaint = await this.complaintModel.findByPk(id, { include: { all: true } });
    if (!complaint) {
      throw new Error(`Complaint with id ${id} not found`);
    }
    return complaint;
  }

  async update(id: number, dto: UpdateComplaintDto): Promise<Complaint> {
    const complaint = await this.findOne(id);
    return complaint.update(dto);
  }

  async updateStatus(id: number, status: ComplaintStatus): Promise<Complaint> {
    const complaint = await this.findOne(id);
    return complaint.update({ status });
  }
}
