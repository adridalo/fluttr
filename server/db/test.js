require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.DB_URL, {
    dbName: 'fluttr'
}).then(r => console.log('Connected to DB'));

const a = new User({
    username: 'adridalo',
    password: 'dogs123'
})

// a.save()
// .then(savedUser => {
//     console.log('User saved')
// })
// .catch(err => {
//     console.error(err)
//     process.exit(1)
// })

User.findOne({ username: 'adridalo' })
.then(user => {
    if(user) {
        bcrypt.compare(a.password, user.password)
            .then(match => {
                if(match) {
                    console.log('Password is correct')
                } else {
                    console.log('Password is incorrect')
                }
            })
            .catch(err => {
                console.error(err)
                process.exit(1)
            })
    } else {
        console.log('User not found')
    }
})
.catch(err => {
    console.error(err)
    process.exit(1)
})