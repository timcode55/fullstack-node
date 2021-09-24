const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.argv);
const password = process.argv[2];

const url = process.env.MONGODB_API_KEY;

mongoose.connect(url).then((result) => {
	// console.log('DB connection was successful!');
});

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 4 || process.argv.length === 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	});
	person.save().then((result) => {
		console.log(`added ${process.argv[3]} number ${process.argv[4]} to the phonebook`);
		mongoose.connection.close();
	});
}

if (process.argv.length < 4) {
	console.log('phonebook');
	Person.find({}).then((result) => {
		result.forEach((person) => {
			console.log(`${person.name} - ${person.number}`);
		});
		mongoose.connection.close();
	});
}
