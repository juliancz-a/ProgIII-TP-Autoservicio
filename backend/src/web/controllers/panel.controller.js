import productService from "../../api/services/product.service.js";

const renderDashboard = (req, res) => {
  const { username } = req.query;

  if (!username) return res.redirect('/login');

  const products = productService.getAll();

  res.render('dashboard', {
    username,
    products,
  });
};

export default {
  renderDashboard
}