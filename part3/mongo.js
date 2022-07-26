// Imports
const mongoose = require('mongoose');

// Variables
const argLength = process.argv.length;
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = `mongodb+srv://fullstack:${password}@cluster0.l6yp9ma.mongodb.net/phonebook?retryWrites=true&w=majority`;

// Create Person schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create new model based on schema
const Person = mongoose.model('Person', personSchema);

// Number of arguments is less than 3 or greater than 5 or equal to 4, exit the program
if (argLength < 3 || argLength === 4 || argLength > 5) {
  console.log('Usage: node filename yourpassword [name] [number]');
  process.exit(1);
}

// Number of arguments equals 3, get all entries from the database
else if (argLength === 3) {
  // Connect to the database
  mongoose.connect(url).then(() => {
    // Get every entry from the database
    Person.find({}).then(result => {
      console.log('phonebook:');
      result.forEach(person => console.log(person.name, person.number));

      // Close connection
      mongoose.connection.close();
    });
  });
}

// Number of arguments equals 5, add new entry to the database
else {
  // Connect to the database
  mongoose
    .connect(url)
    .then(() => {
      // Create new Person
      const person = new Person({
        name,
        number,
      });

      // Save person to the database
      return person.save();
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      // Once person is saved, close the connection to the database
      return mongoose.connection.close();
    })
    .catch(err => console.log(err));
}
