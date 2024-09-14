import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave-status.dto';
import { response } from 'express';

@Controller('leaves')
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  @Get()
  async getLeaves() {
    const data = await this.leavesService.getLeaves();
   // console.log("dd",data)
    //return data
    return { statusCode: 200, data, error: null, message: 'Leaves fetched successfully' };
  }

  @Post()
  async addLeave(@Body() createLeaveDto: any) {
    const data = await this.leavesService.addLeave(createLeaveDto);
    console.log("datatt",data)
    return data

    //return { statusCode: 201, data, error: null, message: 'Leave added successfully' };
  }

  @Patch(':id')
  async updateLeaveStatus(@Param('id') id: string, @Body() updateLeaveStatusDto: UpdateLeaveDto) {
    const data = await this.leavesService.updateLeaveStatus(id, updateLeaveStatusDto);
    return { statusCode: 200, data, error: null, message: 'Leave status updated' };
  }
  @Delete(':id')
  async deleteLeave(@Param('id') id: string) {
    const data = await this.leavesService.deleteLeave(id);
    console.log("rr",response)
    return { statusCode: 200, data, error: null, message: 'Leave status updated' };
  }
}
