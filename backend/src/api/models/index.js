import Product from "./product.model.js";
import Sale from "./sale.model.js";
import SaleDetail from "./saleDetail.model.js";
import Image from "./image.model.js";
import User from "./user.model.js";

///// ASSOCIATIONS INIT /////
Product.hasMany(SaleDetail, {
    foreignKey : 'product_id',
    as: 'sale_details'
})

// Product.hasOne(Image, {
//     foreignKey: 'id',
//     as: 'images'
// })

Product.hasMany(Image, {
  foreignKey: 'product_id',
  as: 'images' // alias para usar en include
});

Image.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Sale.hasMany(SaleDetail, {
    foreignKey : 'sale_id',
    as : 'sale_details' // Associated table
})

SaleDetail.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'products'
})

SaleDetail.belongsTo(Sale, {
    foreignKey : 'sale_id',
    as: 'sale' // father table
})

export {Product, Sale, SaleDetail, Image, User}