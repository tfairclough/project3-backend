// Import Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Instantiate express server object 
const app = express()

// Define port
const port = process.env.Port || 5001

// Ensuring the server is listening to the port
app.listen(port, () => console.log(`Backend listening on port:${port}`))