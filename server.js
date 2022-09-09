const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const routes = require('./routes');
const session = require('express-session');

require('dotenv').config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'you arent allowed to see this :)',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exphbs.create({});
app.use(express.static('public'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.get('/', (req,res) => {
    res.render('home',
    );
    }
);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Server listening on PORT 3001!'));
  });