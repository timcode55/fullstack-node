const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

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

app.get('/api/persons', (request, response) => {
	response.json(notes);
});

app.post('/api/persons', (request, response) => {
	const randomId = Math.floor(Math.random() * 10000);
	const person = request.body;
	console.log(person, 'REQUEST.BODY');

	const duplicateName = notes.find((item) => {
		return item.name === request.body.name;
	});

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

	const newPerson = {
		id: randomId,
		name: request.body.name,
		number: request.body.number
	};
	console.log(randomId, 'RANDOMID');
	notes = notes.concat(newPerson);
	response.json(notes);
});

app.get('/api/persons/:id', (request, response) => {
	const personId = Number(request.params.id);
	const note = notes.find((note) => note.id === personId);

	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const personId = Number(request.params.id);
	const persons = notes.filter((note) => note.id !== personId);

	if (persons) {
		response.json(persons);
	} else {
		response.status(204).end();
	}
});

app.get('/info', (request, response) => {
	response.json(info);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
