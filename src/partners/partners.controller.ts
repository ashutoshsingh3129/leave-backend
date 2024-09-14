import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
    constructor(private readonly partnersService: PartnersService
        
     ){}

    @Get()
  async getPartners() {
    try{
    const data = await this.partnersService.getPartners();
    return { statusCode: 200, data, error: null, message: 'Partner fetched successfully' };
  } catch (error) {
    throw new HttpException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: error.message,
      message: 'Error fetching leaves',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }
}
