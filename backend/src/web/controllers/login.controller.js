const users = [
  {
    username: "mase",
    password: "barcelav1uk"
  }
]

const validateUser = (username, password) => {
  return users.find((u) => u.username === username && u.password === password)
}

const renderLogin = (req, res) => {
  res.render('login', { error: null });
};

const validateLoginForm = (req, res) => {
  const { username, password } = req.body;

  if (!validateUser(username, password)) {
    return res.render('login', { error: 'Usuario o contraseña incorrectos' });
  }

  res.redirect(`/dashboard?username=${encodeURIComponent(username)}`);
};

export default { renderLogin, validateLoginForm }