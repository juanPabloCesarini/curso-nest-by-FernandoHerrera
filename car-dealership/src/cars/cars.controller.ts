import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto/';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars(): { id: string; brand: string; model: string }[] {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    console.log(id);

    return this.carsService.findOneById(id);
  }
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, UpdateCarDto);
  }

  @Delete(':id')
  deleteCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id);
  }
}
