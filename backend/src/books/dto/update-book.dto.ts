import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateBookDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString({ message: 'Tiêu đề phải là chuỗi' })
  title: string;

  @IsNotEmpty({ message: 'Tác giả không được để trống' })
  @IsString({ message: 'Tác giả phải là chuỗi' })
  author: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description: string;

  @IsNumber({}, { message: 'Năm xuất bản phải là số' })
  @Min(0, { message: 'Năm xuất bản không thể âm' })
  @Max(new Date().getFullYear(), {
    message: 'Năm xuất bản không thể lớn hơn năm hiện tại',
  })
  publishedYear: number;
}
