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
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products
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
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      sales
    }
  });
}

const validateProductForm = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username } = req.query;
  const formProduct = req.body;

  if (!username) return res.redirect('/login');

  await productService.updateById(id, formProduct);
  const product = await productService.getById(id);

  res.render('product-form', {
    product,
    username
  })
}

const validateNewProductForm = async (req, res) => {
  const { username } = req.query;
  const formProduct = req.body;
  
  if (!username) return res.redirect('/login');

  const newProduct = await productService.create(formProduct);

  res.redirect(`/dashboard/edit/${newProduct.dataValues.id}?username=${encodeURIComponent(username)}`);
}

export default {
  renderDashboard,
  renderProductForm,
  renderNewProductForm,
  renderSales,
  validateProductForm,
  validateNewProductForm
}