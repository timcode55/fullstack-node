const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person');

app.use(cors());

let notes = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456'
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345'
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122'
	}
];

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'));

morgan.token('type', function(req, res) {
	console.log(req.body, 'REQ.BODY MORGAN');
	return JSON.stringify(req.body);
});

const info = {
	message: `phonebook has info for ${notes.length} people`,
	date: new Date()
};

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (request, response) =>
	Person.find({}).then((notes) => {
		response.json(notes);
	})
);

app.post('/api/persons', (request, response) => {
	const person = request.body;
	console.log(person, 'REQUEST.CONTENT');

	const duplicateName = notes.find((item) => {
		return item.name === request.body.name;
	});

	if (person === undefined) {
		return response.status(400).json({ error: 'content missing' });
	}

	if (!person.name) {
		return response.status(400).json({
			error: 'Name is missing'
		});
	} else if (!person.number) {
		return response.status(400).json({
			error: 'Number is missing'
		});
	} else if (duplicateName) {
		return response.status(400).json({
			error: 'That name already exists'
		});
	}

	const newPerson = new Person({
		name: request.body.name,
		number: request.body.number
	});

	newPerson.save().then((savedPerson) => {
		response.json(savedPerson);
	});
});

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then((person) => {
		response.json(person);
	});
});

app.delete('/api/persons/:id', (request, response) => {
	console.log(request.params.id, 'ID IN APP.DELETE');
	try {
		Person.findByIdAndDelete(request.params.id).then((person) => {
			response.json(person);
		});
	} catch (err) {
		console.log(err);
	}
});

app.get('/info', (request, response) => {
	response.json(info);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
