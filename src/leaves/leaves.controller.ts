import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave-status.dto';

@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  async getLeaves() {
    try {
      const data = await this.leavesService.getLeaves();
      return {
        statusCode: 200,
        data: { data },
        error: null,
        message: 'Leaves fetched successfully',
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        error: error.message,
        message: 'Error fetching leaves',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async addLeave(@Body() createLeaveDto: CreateLeaveDto) {
    try {
      const data = await this.leavesService.addLeave(createLeaveDto);
      return {
        statusCode: 201,
        data: { data },
        error: null,
        message: 'Leave added successfully',
      };
    } catch (error) {
      console.log('error',error)
      throw new HttpException({
        statusCode: error.response.statusCode,
        data: null,
        error: error.response.error,
        message: error.message,
      }, error.response.statusCode);
    }
  }

  @Patch(':id')
  async updateLeaveStatus(@Param('id') id: string, @Body() updateLeaveStatusDto: UpdateLeaveDto) {
    try {
      const data = await this.leavesService.updateLeaveStatus(id, updateLeaveStatusDto);
      return {
        statusCode: 200,
        data: { data },
        error: null,
        message: 'Leave status updated',
      };
    } catch (error) {
      throw new HttpException({
        statusCode: error.response.statusCode,
        data: null,
        error: error.response.error,
        message: error.message,
      }, error.response.statusCode);
    }
  }

  @Delete(':id')
  async deleteLeave(@Param('id') id: string) {
    try {
      const data = await this.leavesService.deleteLeave(id);
      return {
        statusCode: 200,
        data: { data },
        error: null,
        message: 'Leave deleted successfully',
      };
    } catch (error) {
      throw new HttpException({
        statusCode: error.response.statusCode,
        data: null,
        error: error.response.error,
        message: error.message,
      }, error.response.statusCode);
    }
  }
 
}
