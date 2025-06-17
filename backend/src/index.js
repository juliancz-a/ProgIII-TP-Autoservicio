import express from 'express';
import cors from 'cors';
import { __dirname, join } from './web/utils/config.js';
import productRoutes from './api/routes/product.routes.js'
import panelRoutes from './web/routes/panel.routes.js'
import authRoutes from './web/routes/auth.routes.js'

const app = express()

// App settings
app.set('PORT', 5000);
const PORT = app.get('PORT')
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))


// App middlewares
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))
app.use(cors())
app.use(express.urlencoded({ extended: true }));


// Routing
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.use('/', authRoutes); //SSR
app.use('/dashboard', panelRoutes); //SSR
app.use('/products', productRoutes); //API

// App listen
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})