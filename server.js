const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

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
	database.users.push({
		id: '125',
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			res.json(user);	
		}		
	})
	if (!found) {
		res.status(400).json('user not found');
	}
})

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