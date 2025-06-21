import Product from "./product.model.js";
import Sale from "./sale.model.js";
import SaleDetail from "./saleDetail.model.js";


///// ASSOCIATION INIT /////
Product.hasMany(SaleDetail, {
    foreignKey : 'product_id',
    as: 'sale_details'
})

SaleDetail.belongsTo(Product, {
    foreignKey: 'sale_id',
    as: 'products'
})


Sale.hasMany(SaleDetail, {
    foreignKey : 'sale_id',
    as : 'sale_details' // Associated table
})

SaleDetail.belongsTo(Sale, {
    foreignKey : 'sale_id',
    as: 'sale' // father table
})

export {Product, Sale, SaleDetail}