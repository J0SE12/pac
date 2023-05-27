// auth.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('./bd');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const query = 'SELECT * FROM usuarios WHERE username = ?';
      const [rows] = await connection.promise().query(query, [username]);

      if (!rows.length) {
        return done(null, false, { message: 'Usuário não encontrado.' });
      }

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.senha);

      if (!passwordMatch) {
        return done(null, false, { message: 'Senha incorreta.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login'); // Redireciona para a página de login se o usuário não estiver autenticado
}

passport.serializeUser((user, done) => {
  done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    const [rows] = await connection.promise().query(query, [id]);

    if (!rows.length) {
      return done(null, false, { message: 'Usuário não encontrado.' });
    }

    const user = rows[0];
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = {passport, ensureAuthenticated};
