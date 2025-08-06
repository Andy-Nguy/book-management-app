import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description: string;

  @IsNumber()
  @Min(0, { message: 'Năm xuất bản không thể âm' })
  @Max(new Date().getFullYear(), {
    message: 'Năm xuất bản không thể lớn hơn năm hiện tại',
  })
  publishedYear: number;
}
