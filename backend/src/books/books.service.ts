import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  // Lấy tất cả sách
  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  // Lấy 1 sách theo ID
  async findOne(id: string): Promise<Book> {
    this.validateObjectId(id);

    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Sách với id ${id} không tồn tại`);
    }

    return book;
  }

  // Tạo sách mới
  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Check trùng title + author
    const exists = await this.bookModel
      .findOne({
        title: createBookDto.title.trim(),
        author: createBookDto.author.trim(),
      })
      .exec();

    if (exists) {
      throw new ConflictException('Sách với tiêu đề và tác giả đã tồn tại');
    }

    const createdBook = new this.bookModel({
      ...createBookDto,
      title: createBookDto.title.trim(),
      author: createBookDto.author.trim(),
    });
    return createdBook.save();
  }

  // Cập nhật sách
  async update(id: string, updateData: UpdateBookDto): Promise<Book> {
    this.validateObjectId(id);

    // KT field rỗng hoặc toàn khoảng trắng
    if (!updateData.title?.trim() || !updateData.author?.trim()) {
      throw new BadRequestException('Tiêu đề và tác giả không được để trống');
    }

    // Kiểm tra trùng title + author
    const exists = await this.bookModel
      .findOne({
        title: updateData.title.trim(),
        author: updateData.author.trim(),
        _id: { $ne: id },
      })
      .exec();

    if (exists) {
      throw new ConflictException('Sách với tiêu đề và tác giả đã tồn tại');
    }

    const updatedBook = await this.bookModel
      .findByIdAndUpdate(
        id,
        {
          ...updateData,
          title: updateData.title.trim(),
          author: updateData.author.trim(),
        },
        { new: true },
      )
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Sách với id ${id} không tồn tại`);
    }

    return updatedBook;
  }

  // Xóa sách
  async remove(id: string): Promise<Book> {
    this.validateObjectId(id);

    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Sách với id ${id} không tồn tại`);
    }

    return deletedBook;
  }

  // Kiểm tra ID hợp lệ
  private validateObjectId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Sách ID không hợp lệ');
    }
  }
}
