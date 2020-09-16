const {Router} = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')

const router = Router()

router.post(
    '/register',
    [
        check('email', 'E-mail is incorrect.').isEmail(),
        check('password', 'Password must be at least 6 characters length.').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect register data.'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({message: 'user with such e-mail already exists'})
        }

        const hashedPass = await bcrypt.hash(password, 12)
        const newUser = new User({ email, password: hashedPass })

        await newUser.save()

        res.status(201).json({message: 'New user created.'})
    } catch (e) {
        res.status(500).json({message: 'something wrong'})
    }
})

router.post('/login',
    [
        check('email', 'Enter correct e-mail.').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data.'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({message: 'user with such e-mail not found'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Password is incorrect. Try again'})
            }

            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user._id })
        } catch (e) {
            res.status(500).json({message: 'something wrong'})
        }
    })

module.exports = router