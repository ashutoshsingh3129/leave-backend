import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Leave } from './schemas/leave.schema';
import { LeavesDbService } from './leaves.db.service';

@Injectable()
export class LeavesService {
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<Leave>,
    private leavesDbService: LeavesDbService
  ) { }

  async addLeave(leaveDto: any): Promise<Leave> {
    try {
     
      await this.checkOverLapping(leaveDto);
      return this.leavesDbService.create(leaveDto);
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async checkOverLapping(leaveDto: any): Promise<void> {
    let query = {};
    if (leaveDto.startDate === leaveDto.endDate) {
      query = {
        partnerId: Types.ObjectId.createFromHexString(leaveDto.partnerId),
        startDate: leaveDto.startDate,
        slots: { $in: leaveDto.slots },  
      };
    } 
    else {
      query = {
        partnerId: Types.ObjectId.createFromHexString(leaveDto.partnerId),
        startDate: { $lte: leaveDto.endDate },
        endDate: { $gte: leaveDto.startDate },
      };
    }

    const overlappingLeaves = await this.leaveModel.find(query);
    if (overlappingLeaves.length) {
      throw new BadRequestException('Leave duration or time slot clashes with an existing leave.');
    }
  }

  async getLeaves(): Promise<Leave[]> {
    return this.leavesDbService.getLeaves();
  }

  async updateLeaveStatus(id: string, updateDto: any): Promise<Leave> {
    await this.checkOverLapping({ partnerId: id, ...updateDto });
    return this.leaveModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async deleteLeave(id: string): Promise<Leave> {
    return this.leavesDbService.delete(id);
  }
 

}
