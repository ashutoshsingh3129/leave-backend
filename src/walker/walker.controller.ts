import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { WalkersService } from './walker.service';

@Controller('walkers')
export class WalkersController {
  constructor(private readonly walkersService: WalkersService) {}

  @Get()
  async getWalkers(@Query('date') date: string) {
    try{
    const data=await this.walkersService.getWalkersWithSlots(date);
    return { statusCode: 200, data, error: null, message: 'Walkers fetched successfully' };

} catch (error) {
    throw new HttpException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      data: null,
      error: error.message,
      message: 'Error fetching walkers',
    }, HttpStatus.INTERNAL_SERVER_ERROR);
}
}
@Get('/:id/slots')
  async getWalkerSlots(@Param('id') walkerId: string) {
    try{
        const data=await this.walkersService.getWalkerSlots(walkerId);
        return { statusCode: 200, data, error: null, message: 'walker slot fetched successfully' };
    
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
