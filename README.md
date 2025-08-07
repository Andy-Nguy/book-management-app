# 📚 Book Management App

Full-stack web application for managing books, built with **NestJS** (backend) and **React** (frontend).

---

## 📂 Project Structure
book-management-app/
backend/ ← NestJS app
frontend/ ← React app
README.md


---


## ⚙️ Cài đặt & Chạy Backend (NestJS)
**Yêu cầu:** Node.js >= 18, npm >= 9, MongoDB local hoặc MongoDB Atlas

1. Cài dependencies:
```bash
cd backend
npm install
```
2. Tạo file .env trong thư mục backend:
```bash
MONGODB_URI=mongodb://localhost:27017/bookdb
PORT=3000   
```
3.Chạy backend:
```bash
npm run start:dev
```
## ⚙️ Cài đặt & Chạy Frontend (React)

1. Cài dependencies:
```bash
cd frontend
npm install
```
2. Chạy frontend::
```bash
Mở terminal chạy lệnh
npm start  
```
## 🛠 Cấu hình MongoDB
1. Chạy MongoDB:
```bash
Mở terminal chạy lệnh
mongod

(Có file dữ liệu mẫu trên test.json)
```
## Known Limitations
```
Do chưa có kiến thức về ReactJs nên giao diện còn chưa đẹp và nhiều chỗ hoạt động chưa hợp lý

Môi trường cục bộ:Ứng dụng chỉ chạy trên localhost, không triển khai lên server

Mặc dù đã dùng class-validator, nhưng chưa có kiểm tra phức tạp (ví dụ: độ dài tối đa của title, định dạng đặc biệt của description)

Chưa có sắp xếp (sorting) hoặc tìm kiếm (search) có find by ID nhưng chỉ test bằng PostMan chứ chưa triển khai giao diện tìm kiếm
```


## Ảnh & Video Demo
Trang chủ: Giao diện chính của ứng dụng
<img src="screenshots\menu.jpg" alt="Trang chủ">

Xem chi tiết sách
<img src="screenshots\chi tiet.jpg" alt="Chi tiết sách">

Sửa thông tin sách
<img src="screenshots\suasach.jpg" alt="Sửa thông tin sách">



Sửa thông tin sách
<img src="screenshots\" alt="Sửa thông tin sách">