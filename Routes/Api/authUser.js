const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const User = require('../../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

/**
 * @ GET api/authUser
 * @ descrption Auth route 
 * @ access Public
 */
router.get('/', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error("err", err);
        res.status(500).send('Server Error');

    }
});

/** 
 * @ POST api/auth
 * @ descrption Authenticate user & get token
 * @ access Public
 */
router.post('/', [
    check('email', 'Please include a valid email').not().isEmpty(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        // See if user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }



        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 3600000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }


});

module.exports = router;