import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor (private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create (
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
  ) {
    return this.categoryService.create(createCategoryDto, +req['user'].id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll (
    @Req() req,
  ) {
    return this.categoryService.findAll(+req['user'].id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne (
    @Param('id') id: string,
  ) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update (
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete (
    @Param('id') id: string,
  ) {
    return this.categoryService.delete(+id);
  }
}
