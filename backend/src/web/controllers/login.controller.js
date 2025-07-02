const users = [
  {
    username: "mase",
    password: "barcelav1uk"
  }
]


const renderLogin = (req, res) => {
  res.render('login', { error: null });
};

const authLogin = async (req, res) => {
  
  const { username, password } = req.user;
  
  res.status(200).json({redirect : `/dashboard?username=${encodeURIComponent(username)}`});
};

export default { renderLogin, authLogin }