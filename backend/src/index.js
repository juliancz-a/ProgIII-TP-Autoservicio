import express from 'express';
import cors from 'cors';
import { __dirname, join } from './web/utils/config.js';
import productRoutes from './api/routes/product.routes.js'
import saleRoutes from './api/routes/sale.routes.js'
import imageRoutes from './api/routes/image.routes.js'
import userRoutes from './api/routes/user.routes.js'
import panelRoutes from './web/routes/panel.routes.js'
import authRoutes from './web/routes/auth.routes.js'
import env from './config/env.js';
import sequelize from './config/db.js';

const app = express()

// App settings
app.set('PORT', env.port);
const PORT = app.get('PORT')
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))


// App middlewares
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.use(cors())
app.use(express.urlencoded({ extended: true }));

await sequelize.sync()

// Routing
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', authRoutes); //SSR Routing
app.use('/dashboard', panelRoutes); 
app.use('/api/products', productRoutes); //API Routing
app.use('/api/sales', saleRoutes) 
app.use('/api/images', imageRoutes)
app.use('/api/users', userRoutes)

// App listen
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})