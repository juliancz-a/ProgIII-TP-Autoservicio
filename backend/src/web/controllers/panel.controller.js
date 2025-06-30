import productService from "../../api/services/product.service.js";
import saleService from "../../api/services/sale.service.js"
import formatUtils from "../../api/utils/formatUtils.js";

const renderDashboard = async (req, res) => {
  const { username } = req.query;

  if (!username) return res.redirect('/login');
  
  const page = parseInt(req.query.page) || 1;     // página actual
  const limit = parseInt(req.query.limit) || 10;  // ítems por página
  const offset = (page - 1) * limit;

  const { count, rows } = await productService.getAll(limit, offset);

  const products = rows.map(product => ({
    ...product.dataValues,
    formattedPrice: formatUtils.formatPrice(product.price)
  })) 
  

  res.render('dashboard', {
    username,
    products,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    }
  });
};

const renderProductForm = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username } = req.query;

  if (!username) return res.redirect('/login');

  const product = await productService.getById(id);
  
  res.render('product-form', {
    product,
    username
  });
}

const renderNewProductForm = async (req, res) => {
  const { username } = req.query;

  if (!username) return res.redirect('/login');
  
  res.render('product-form', {
    product: null,
    username
  });
}

const renderSales = async (req, res) => {
  const { username } = req.query;

  if (!username) return res.redirect('/login');

  const page = parseInt(req.query.page) || 1;     // página actual
  const limit = parseInt(req.query.limit) || 10;  // ítems por página
  const offset = (page - 1) * limit;

  const { count, rows } = await saleService.getAll(limit, offset);

  const sales = rows.map(sale => ({
    ...sale.dataValues,
    formattedDate: formatUtils.formatDate(sale.createdAt),
    formattedPrice: formatUtils.formatPrice(sale.total)
  }));
  
  res.render('sales', {
    username,
    sales,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    }
  });
}

const validateProductForm = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username } = req.query;
  const formProduct = req.body;

  console.log(formProduct);
  

  if (!username) return res.redirect('/login');

  try {
    await productService.updateById(id, formProduct);
    const product = await productService.getById(id);
    res.status(200).json({message: 'producto actualizado con éxito', payload: product, action : 'updated'})
  } catch (error) {
    res.status(500).json({message : 'server failure', error : error})
    console.error(error)  
  }

}

const validateNewProductForm = async (req, res) => {
  const { username } = req.query;
  const formProduct = req.body;
    
  if (!username) return res.redirect('/login');

  try {
    const newProduct = await productService.create(formProduct);
    res.status(201).json({ message: 'Product was created successfully', payload: newProduct, action : 'created'});
  } catch (error) {
    res.status(500).json({message : 'server failure', error : error})
    console.error(error)  
  }

}

export default {
  renderDashboard,
  renderProductForm,
  renderNewProductForm,
  renderSales,
  validateProductForm,
  validateNewProductForm
}