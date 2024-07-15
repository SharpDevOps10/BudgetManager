import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor (
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) {}

  async create (createCategoryDto: CreateCategoryDto, userId: number) {
    const isExist = await this.categoryRepository.findOne({
      where: {
        title: createCategoryDto.title,
        users: {
          id: userId,
        },
      },
    });

    if (isExist) throw new BadRequestException('This category is already in use');

    return await this.categoryRepository.save({
      title: createCategoryDto.title,
      users: { id: userId },
    });
  }

  async findAll (id: number) {
    return await this.categoryRepository.find({
      where: {
        users: { id },
      },
      relations: {
        transactions: true,
      },
    });
  }

  async findOne (id: number) {
    const category = this.categoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        users: true,
        transactions: true,
      },
    });
    if (!category) throw new NotFoundException('This category was not found');

    return category;
  }

  async update (id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException('This category was not found');

    await this.categoryRepository.update(id, updateCategoryDto);
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async delete (id: number) {
    await this.checkCategoryExistence(id);
    return this.categoryRepository.delete(id);
  }

  private async checkCategoryExistence (id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException('This category was not found');

    return category;
  }
}
