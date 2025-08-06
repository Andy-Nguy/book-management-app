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
```

