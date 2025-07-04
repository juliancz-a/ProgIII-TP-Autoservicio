![Logo](https://res.cloudinary.com/dlapbwezd/image/upload/v1751597821/Exo_2-removebg-preview_kl8cm8.png)

# NeonBits

Full Stack Application.

Autoservice system for fast delivery of PC Components and accesories.

## Tech Stack

**Client:** Vanilla JS

**Server:** Node, Express, MYSQL (Sequelize ORM).

**Server-side views:** EJS

## ✅ Features

### 📱Front-end
- Basic login window.
- Product grid window for buying. Nav-bar for choosing category.
- Checkout window.
- Ticket window with summary.
- Light/dark mode toggle.

### 🧩 Server-side Dashboard
- Basic admin login window
- Main dashboard window: explore Users, Sales and Products.
- Product Form for editing and creating products.
- Basic filters and search bars for sales and products.

### 🌐Server
- API Routes for Products, Sales and Users.
- Crud implementation for Products.
- Multer for reading forms files (images for products).
- Cloudinary API for cloud management of images.
- Sequelize ORM for models and relationships.
- Password hashing (bcrypt).
- Dotenv for setting enviromental variables.

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/maaaseee/neonbits.git
cd ProgIII-TP-Autoservicio/backend
```

Install dependencies
```bash
npm install
```
Setup `.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=...
...
```

Execute the server
```bash
npm run dev
```
or
```bash
npm start
```

## 🌱 Database

This projects uses MySQL with the ORM Sequelize.

Principal models:

- User (admin role)
- Product
- Sale & SaleDetail (relation 1:N)
- Images

## 📸 Screenshots

### 📦 Name for takeaway

![Takeaway](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598282/Screenshot_5_natmtg.png)

### 🛍 Main page

![Store](https://res.cloudinary.com/dlapbwezd/image/upload/v1751597959/Screenshot_1_ssuhlw.png)

### 🛒 Cart

![Cart](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598286/Screenshot_3_lvpa9y.png)

### 📤 Checkout

![Checkout](https://res.cloudinary.com/dlapbwezd/image/upload/v1751599723/Screenshot_11_thjjcf.png)

### 🔐 Login admin

![Login](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598282/Screenshot_6_vnbkmz.png)

### 📊 Dashboard

![Dashboard](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598283/Screenshot_7_iqsuhb.png)

### 🖥 Products

![Products](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598283/Screenshot_9_rm9v6h.png)

### 🧑 Users

![Users](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598285/Screenshot_10_buudyp.png)

### 💰 Sales

![Sales](https://res.cloudinary.com/dlapbwezd/image/upload/v1751598283/Screenshot_8_hgvcwu.png)

## 📦 API Endpoints

### Products
- `GET /api/products`
- `GET /api/products/enabled`
- `GET /api/products/cart`
- `GET /api/products/{id}`
- `POST /api/products`
- `PUT /api/products/{id}`
- `PATCH /api/products/{id}`
- `DELETE /api/products/{id}`

### Sales
- `GET /api/sales?page=1&limit=10`
- `GET /api/sales/{id}`
- `POST /api/sales`

### Users
- `GET /api/users`
- `GET /api/users/{id}`
- `POST /api/users/login`

### Images

- `GET /api/images`
- `GET /api/images/{id}`
- `POST /api/images`

## Authors

- [@maaaseee](https://www.github.com/maaaseee)
- [@juliancz-a](https://www.github.com/juliancz-a)

## 🔗 Links

- [Cloudinary](https://cloudinary.com/)
- [Sequelize ORM](https://sequelize.org/)