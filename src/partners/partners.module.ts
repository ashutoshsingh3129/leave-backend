import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { PartnersService } from './partners.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partner.name, schema: PartnerSchema },  // Register Leave model
    ]),
  ],
  providers:[PartnersService],
  controllers: [PartnersController]
})
export class PartnersModule {}
