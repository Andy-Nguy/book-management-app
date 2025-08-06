import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto'; // thêm import

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    console.log('GET /books called');
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | null> {
    console.log('[DEBUG] Called GET /books/:id with id =', id);
    return this.booksService.findOne(id);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateBookDto, // dùng DTO mới
  ): Promise<Book | null> {
    return this.booksService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.remove(id);
  }
}
