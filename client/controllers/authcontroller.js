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

var exports = module.exports = {}


exports.signup = function(req,res){

	res.render('signup'); 

}

exports.signin = function(req,res){

	res.render('signin'); 

}

exports.dashboard = function(req,res){

	res.render('dashboard'); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/');
  });

}
