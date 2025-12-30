const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
const url = `mongodb+srv://aksuisokorpi_db_user:${password}@fsocluster.ytcho3v.mongodb.net/phonebookApp?appName=FSOCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const generateId = () => String(Math.floor(Math.random() * 1000));

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
    if (process.argv[3] && process.argv[4]) {
        const name = process.argv[3]
        const number = process.argv[4]
    
        const person = new Person({
            id: generateId(),
            name: name,
            number: number,
        })
    
        person.save().then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    } else {
        console.log(`Incorrect parameters: ${process.argv[3]} and/or ${process.argv[4]}`)
        mongoose.connection.close()
        process.exit(1)
    }
} else if (process.argv.length === 3) {
    // Log all people in database
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close()
        })
}

// const person = new Person({
//   name: "Arto Hellas",
//   number: "040-123456",
// })

// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })