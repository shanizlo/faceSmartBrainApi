const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const knex = require('knex')


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'shaniz',
    password : '',
    database : 'smart-brain'
  }
});

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@email.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@email.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');	
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	db('users')
		.returning('*')
		.insert({
			email: email,
			name: name,
			joined: new Date()
	}).then(user => {
		res.json(user[0]);
	})
	.catch(err => res.status(400).json('unable to register! '));
});

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({ id: id })
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('error getting user');
			}
		});
});

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++
			res.json(user.entries);	
		}		
	})
	if (!found) {
		res.status(400).json('user not found ');
	}
});

app.listen(3000, () => {
	console.log('running on port 3000');
});