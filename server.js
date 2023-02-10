// Import Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('./config/db')
const userSeed = require('./userSeed')
const User = require('./models/user')


// Instantitate DB connection 
mongoose.connect(db, {useNewUrlParser : true})

// Log on first connection
mongoose.connection.once('open', () => console.log('Connected to MongoDB'))

const strategy = require('./lib/passportStrategy')
const jwtOptions = require('./lib/passportOptions')

const saltRounds = 10;

//Require Route Files
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// Instantiate express server object 
const app = express()

// Define port
const port = process.env.Port || 5001
const reactPort = 3000;
   
// Middleware -
//  Converts JSON to Javacript Object
app.use(express.json())
app.use(express.static("."));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`}))

passport.use(strategy);
/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(usersRouter);



// User.insertMany(userSeed, (error, users) => {
//     if(error) {
//         console.log(error)
//     }else {
//         console.log(users)
//     }
    
// })


const dummyUser = {

    _id: "63e4ddb7dbbd0749ad61f5dd",
    firstName: 'Nick',
    lastName: 'Langley',
    userName: 'Eddy85',
    password: '1'

};


app.post('/api/register', (req, res) => {
    console.log(req.body.password);

    bcrypt.genSalt(saltRounds)
        .then((salt) => {
            console.log(salt);
            return bcrypt.hash(req.body.user.password, salt);
        })
        .then((hash) => {
            const user = new User({ ...req.body.user, password: hash });
            return user.save();
        })
        .then(() => {
            res.status(200).json({ message: 'User created successfully' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error.message });
        });
});


app.post('/api/login', (req, res) => {
    User.findOne(req.body.userName)
    if (req.body.userName && req.body.password) {
        if (req.body.userName === User.userName && req.body.password === User.password) {
            const payload = {
                userName: User.userName,

            }

            const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 600 })

            res.status(200).json({ success: true, token: token })
        } else {
            res.status(401).json({ error: 'invalid username or password' })
        }
    } else {
        res.status(400).json({ error: 'Username & Password Required' })
    }
})


app.get('/api/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({ message: 'hello you need a web token to see this', user: req.user })
})

// Ensuring the server is listening to the port
app.listen(port, () => console.log(`Backend listening on port:${port}`))