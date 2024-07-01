const passport = require('passport');
const LocalStrategy = require ('passport-local');
const BearerStrategy = require('passport-http-bearer');
const User = require('./usuarios-modelo');
const {InvalidArgumentError} = require('./../erros');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'senha',
  session: false
},
  async (email, senha, done) => {
    const user = await User.buscaPorEmail(email);
    if (!user) {
      throw new InvalidArgumentError('Email ou senha inválido!');
    }
    const isAuthenticated = await bcrypt.compare(senha, user.senhaHash);
    if (isAuthenticated) {
      return done(null, user);
    }
    throw new InvalidArgumentError('Email ou senha inválido!');
  }
));



passport.use(new BearerStrategy(
  async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.CHAVE_JWT);
      const user = await User.buscaPorId(payload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
))
