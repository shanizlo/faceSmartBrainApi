const express = require('express')
const bodyParser = require('body-parser')
const bcrypt  = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

const app = express()
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.status(400).json('Welcome!') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`server is listening on port ${PORT}`);
});