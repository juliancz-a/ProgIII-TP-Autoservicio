import productService from "../../api/services/product.service.js";

const renderDashboard = async (req, res) => {
  const { username } = req.query;

  if (!username) return res.redirect('/login');

  const products = await productService.findAll();

  res.render('dashboard', {
    username,
    products,
  });
};

export default {
  renderDashboard
}