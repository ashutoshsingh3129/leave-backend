// walkers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Walker } from './schemas/walker.schema';
import { TimeSlot } from './schemas/timeslot.schema';

@Injectable()
export class WalkersService {
  constructor(
    @InjectModel(Walker.name) private walkerModel: Model<Walker>,
    @InjectModel(TimeSlot.name) private timeSlotModel: Model<TimeSlot>,
  ) {}

  async getWalkersWithSlots(date: string): Promise<Walker[]> {
    return this.walkerModel.aggregate([
        {
          $lookup: {
            from: "timeSlots", // The collection containing time slot data
            localField: "_id", // Field from the walkers collection
            foreignField: "walker", // Field from the timeSlots collection
            as: "timeSlots" // Name of the field to append the matched data
          }
        },
        {
          $match: {
            "timeSlots.date": "2024-09-14" // Match by specific date
          }
        },
        {
          $project: {
            name: 1,
            verificationStatus: 1,
            state: 1,
            city: 1,
            tag: 1,
            rating: 1,
            "timeSlots.date": 1,
            "timeSlots.timeRanges": 1
          }
        }
      ]);
      
      
  }

async getWalkerSlots(walkerId:string){
  const walker = await this.walkerModel.findById(walkerId).exec();
    const slots = await this.timeSlotModel.find({ walker: walkerId }).exec();

    return {
      ...walker.toObject(),
      timeSlots: slots,
    };

  }
}
