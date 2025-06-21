import productService from "../../api/services/product.service.js";

const renderDashboard = async (req, res) => {
  const { username } = req.query;

  if (!username) return res.redirect('/login');

  const products = await productService.getAll();

  res.render('dashboard', {
    username,
    products,
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
  })
}

export default {
  renderDashboard,
  renderProductForm
}