import { Injectable } from '@nestjs/common';
import { Partner } from './schemas/partner.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PartnersService {
    constructor(@InjectModel(Partner.name) private partnerModel: Model<Partner>){}


    async getPartners(): Promise<Partner[]> {
      try{
         return this.partnerModel.find().exec();
      }
      catch(error){
        throw error
      }
       }
}
