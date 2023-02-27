const dotenv = require('dotenv');
dotenv.config()
// Naming database
const mongooseBaseName = 'social'

// Create Database
const database = {
  development:`mongodb://localhost:27017/${mongooseBaseName}-development`, 
  test: `mongodb://localhost:27017/${mongooseBaseName}-test`
}

// select localdb depending on whether it's a test or dev enviroment
const localDB = process.env.NODE_ENV === "test" ? database.test : database.development

// If live production use that database otherwise use the local db
const currentDB = process.env.MONGODB_URI || localDB

module.exports = currentDB