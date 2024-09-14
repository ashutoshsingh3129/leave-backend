import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Leave } from './schemas/leave.schema';

@Injectable()
export class LeavesDbService {
  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>) { }

  async create(leaveDto: any): Promise<Leave> {
    try {
      leaveDto.partnerId = Types.ObjectId.createFromHexString(leaveDto.partnerId)
      const leave = new this.leaveModel(leaveDto);
      return leave.save();
    }
    catch (error) {
      return error
    }
  }

  async getLeaves(): Promise<Leave[]> {
    try {
      return this.leaveModel.aggregate([
        {
          $lookup: {
            from: "partners",
            localField: "partnerId",
            foreignField: "_id",
            as: "partner"
          }
        },
        {
          $unwind: "$partner"
        },
        {
          $sort: { createdAt: -1 }
        }
      ]).exec();
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  async updateLeaveStatus(id: string, updateDto: any): Promise<Leave> {
    try {
      return this.leaveModel.findByIdAndUpdate(id, updateDto, { new: true });
    }
    catch (error) {
      return error
    }
  }
  async delete(id: string): Promise<Leave> {
    try {
      return this.leaveModel.findByIdAndDelete(id);
    }
    catch (error) {
      return error
    }
  }
}
