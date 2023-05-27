// routes/users.js

const express = require('express');
const router = express.Router();
const passport = require('../auth');

// routes/users.js

// Rota de login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login'); // Redireciona para a página de login em caso de falha na autenticação
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/'); // Redireciona para a página do usuário em caso de autenticação bem-sucedida
    });
  })(req, res, next);
});


module.exports = router;