import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LeavesModule } from './leaves/leaves.module';
import { PartnersModule } from './partners/partners.module';
import { WalkerModule } from './walker/walker.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    LeavesModule,
    PartnersModule,
    WalkerModule,
  ],
})
export class AppModule {}
