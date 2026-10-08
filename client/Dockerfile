# Câu 51: Khai báo Node.js Image làm Base Image
FROM node:20-alpine

# Câu 52: Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Câu 53: Sao chép package.json và package-lock.json vào Container
COPY package*.json ./

# Câu 54: Cài đặt các package của React Application
RUN npm install

# Câu 55: Sao chép toàn bộ source code React vào Container
COPY . .

# --- MỚI THÊM ---
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Câu 56: Build React Application
RUN npm run build

# Cài đặt 'serve' để chạy static file đã build trên Port 3000
RUN npm install -g serve

# Khai báo Port 3000
EXPOSE 3000

# Chạy giao diện Web bằng serve
CMD ["serve", "-s", "dist", "-l", "3000"]