const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // hash user passwords
const jwt = require('jsonwebtoken'); // auth token that signifies user is logged in

const User = require('../models/user');

// create a user.
router.post("/", async (req, res) => {
    
    const { username, password } = req.body;
    console.log("username is = " + username);
    if (password.length < 6) {
        res.status(500).json({msg: "Password length must be greater than 6 characters."});
        return;
    }

    let newUser = new User({
        username,
        passwordHash: bcrypt.hashSync(password, 10),
        numNotes: 0
    });

    newUser
        .save()
        .then(user => {
            console.log(username);
            jwt.sign({
                username: newUser.username
            }, 'secret', (err, token) => {
                if (err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: `User ${err.keyValue['username']} already exists. Try Logging in.`});
        });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
        .then(user => {
            if (!user) {
                res.status(500).json({msg: "No User with that username: " + username });
                return;
            } else if (!bcrypt.compareSync(password, user.passwordHash)) {
                res.status(500).json({ msg: "Invalid password"});
            }
            jwt.sign({
                username: user.username
            }, 'secret', (err, token) => {
                if (err) throw err;
                res.send({
                    token,
                    user: {
                        username: user.username
                    }
                });
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;