/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Todo = require('./todo');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
	res.setHeader('expires', '0');
	res.setHeader('pragma', 'no-cache');
	next();
});
app.get('/todos', (_, res) => {
	Todo.findAll()
		.then((todos) => {
			res.send(todos);
		});
});
app.post('/todos', (req, res) => {
	Todo.create({
			note: req.body.note
		})
		.then((todo) => {
			res.send(todo);
		});
});
app.delete('/todos/:id', (req, res) => {
	Todo.findById(req.params.id)
		.then(todo => todo.destroy())
		.then(() => res.send());
});
// viewed at http://localhost:8080
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
