import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Partner extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  workingHours: { day: string, hours: string[] }[];

  @Prop({ required: false })
  city:string

}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
