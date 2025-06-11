import express from 'express';
import cors from 'cors';
import productRoutes from './api/routes/product.routes.js'

const app = express()

// App settings
app.set('PORT', 5000);
const PORT = app.get('PORT')

// App middlewares
app.use(express.json())
app.use(cors())
app.use(productRoutes)

// App listen
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    
})