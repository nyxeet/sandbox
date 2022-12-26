import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ListAllEntities } from './dto/list-all-entities-dto';
import { Response } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Res() res: Response, @Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    res.status(HttpStatus.CREATED).send('This action adds a new cat');
  }

  @Get()
  async findAll(@Res() res: Response, @Query() query: ListAllEntities) {
    const cats = this.catsService.findAll()
    try {
        await this.catsService.findAll()
      } catch (error) { 
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        }, 
        HttpStatus.FORBIDDEN,
        {
          cause: error
        });
      }
    res.status(HttpStatus.OK).json([]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}