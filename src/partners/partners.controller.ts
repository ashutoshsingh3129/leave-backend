import { Controller, Get } from '@nestjs/common';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService
        
     ){}

    @Get()
  async getPartners() {
    const data = await this.partnersService.getPartners();
    console.log("dd",data)
    return { statusCode: 200, data, error: null, message: 'Leaves fetched successfully' };
  }
}
