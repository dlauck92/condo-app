module.exports = {
  signup: (req, res) => {
      res.render('signup');
  },
  login: (req, res) => {
      res.render('login');
  },
  profile: (req, res) => {
      let {user} = req;
      res.render('profile', user);
  },
  logout: (req, res) => {
      req.session.destroy((err) => {
          // eslint-disable-next-line curly
          if (err) throw err;
          res.redirect('/');
      });
  }
};
