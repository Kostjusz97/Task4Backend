const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('./config/database');
const cors = require('cors'); 
const routes = require('./routes');
const User = require('./models/user');

const app = express();

const UserModel = User(sequelize);

sequelize.sync().then(() => {
  console.log('Database and tables created!');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ where: { username: username } });
      
      if (!user || user.password !== password) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log();
});