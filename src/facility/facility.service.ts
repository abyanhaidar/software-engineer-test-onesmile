import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './facility.model';
import { CreateFacilityDto, UpdateFacilityDto } from './dto/facility.dto';

@Injectable()
export class FacilityService {
  constructor(
    @InjectModel(Facility)
    private readonly facilityModel: typeof Facility,
  ) {}

  async findAll(): Promise<Facility[]> {
    return this.facilityModel.findAll();
  }

  async findOne(id: number): Promise<Facility> {
    const facility = await this.facilityModel.findByPk(id);
    if (!facility) throw new NotFoundException('Facility not found');
    return facility;
  }

  async create(dto: CreateFacilityDto): Promise<Facility> {

    const facilityAttributes:any = {
        name: dto.name,
        description: dto.description,
        address: dto.address,
    }
    return this.facilityModel.create(facilityAttributes);
  }

  async update(id: number, dto: UpdateFacilityDto): Promise<Facility> {
    const facility = await this.findOne(id);
    return facility.update(dto);
  }

  async remove(id: number): Promise<void> {
    const facility = await this.findOne(id);
    await facility.destroy();
  }
}
