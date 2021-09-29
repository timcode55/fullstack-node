const personsRouter = require('express').Router();
const Person = require('../models/person');

const express = require('express');
const app = express();
app.use(express.json());

app.get('/dog', (req, res) => {
	res.send('This is working');
});

// personsRouter.get('/', (request, response) => {
// 	response.send('<h1>Hello World!</h1>');
// });

// personsRouter.get('/', (request, response) =>
// 	Person.find({}).then((notes) => {
// 		response.json(notes);
// 	})
// );

// personsRouter.post('/', (request, response, next) => {
// 	const person = request.body;
// 	console.log(person, 'REQUEST.CONTENT');

// Person.find({ name: person.name }, function(err, result) {
// 	if (err) {
// 		response.send(err);
// 	} else {
// 		response.send(result);
// 		console.log(result, 'RESULT', 'DUPLICATENAME*********');
// 	}
// });

// if (Person.find({ name: person.name })) {
// 	console.log('DUPLICATE');
// 	return response.status(400).json({
// 		error: 'That name already exists'
// 	});
// }`

// 	if (person === undefined) {
// 		return response.status(400).json({ error: 'content missing' });
// 	}

// 	if (!person.name) {
// 		return response.status(400).json({
// 			error: 'Name is missing'
// 		});
// 	} else if (!person.number) {
// 		return response.status(400).json({
// 			error: 'Number is missing'
// 		});
// 	}
// 	// else if (duplicateName) {

// 	// }

// 	const newPerson = new Person({
// 		name: request.body.name,
// 		number: request.body.number
// 	});

// 	newPerson
// 		.save()
// 		.then((savedPerson) => {
// 			savedPerson.toJSON();
// 		})
// 		.then((savedAndFormattedPerson) => {
// 			response.json(savedAndFormattedPerson);
// 		})
// 		.catch((error) => next(error));
// });

// personsRouter.put('/:id', (request, response, next) => {
// 	const body = request.body;

// 	const person = {
// 		name: body.name,
// 		number: body.number
// 	};

// 	Person.findByIdAndUpdate(request.params.id, person, { new: true })
// 		.then((updatedPerson) => {
// 			response.json(updatedPerson.toJSON());
// 		})
// 		.catch((error) => next(error));
// });

// personsRouter.get('/:id', (request, response, next) => {
// 	Person.findById(request.params.id)
// 		.then((person) => {
// 			if (person) {
// 				response.json(person);
// 			} else {
// 				response.status(404).end();
// 			}
// 		})
// 		.catch((error) => next(error));
// });

// personsRouter.delete('/:id', (request, response, next) => {
// 	Person.findByIdAndRemove(request.params.id)
// 		.then((result) => {
// 			response.status(204).end();
// 		})
// 		.catch((error) => next(error));
// });

personsRouter.get('/', (request, response) => {
	Person.find({}).then((persons) => {
		response.json(persons.map((person) => person.toJSON()));
	});
});

personsRouter.get('/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person.toJSON());
			} else {
				response.status(404).end();
			}
		})
		.catch((error) => next(error));
});

personsRouter.post('/', (request, response, next) => {
	const body = request.body;

	const person = new Person({
		name: body.name,
		number: body.number
	});

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson.toJSON());
		})
		.catch((error) => next(error));
});

personsRouter.delete('/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

personsRouter.put('/:id', (request, response, next) => {
	const body = request.body;

	const person = {
		content: body.content,
		important: body.important
	};

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			response.json(updatedPerson.toJSON());
		})
		.catch((error) => next(error));
});

module.exports = personsRouter;
