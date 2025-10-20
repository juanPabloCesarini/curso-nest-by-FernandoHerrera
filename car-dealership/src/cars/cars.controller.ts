/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): { id: number; brand: string; model: string }[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);

    return this.carsService.findOneById(+id);
  }
  @Post()
  createCar(@Body() body: any) {
    return body;
  }
  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCarById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);

    return {
      method: 'delete',
      id: id,
    };
  }
}
