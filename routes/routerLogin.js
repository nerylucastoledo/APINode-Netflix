const bcrypt = require('bcrypt')
const User = require('../models/User')
const routes = require("express").Router()
const jwt = require('jsonwebtoken')

routes.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body

    if (!email || !password || !confirmPassword) {
        return res.status(422).json({ "msg": "Preencha todos os campos!"})
    }

    const verifyEmail = await verifyEmailExists(email)
    if (verifyEmail) {
        return res.status(422).json({ "msg": "E-mail ja possui uma conta!"})
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ "msg": "Senha não são iguais!" })
    }

    const passwordHash = await hashPassword(password)
    const user = new User({
        email,
        password: passwordHash,
        peoples: []
    })

    try {
        await user.save()
        return res.status(201).json({ "msg": "Usuário criado!" })
    } catch (error) {
        return res.status(500).json({ "msg": error })
    }
})

routes.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ "msg": "Preencha todos os campos!" })
    }

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ "msg": "E-mail não possui conta!" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.status(422).json({ "msg": "Senha inválida!" })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id,
        }, secret)

        return res.status(200).json({
            "msg": "Sucesso!",
            "token": token,
            "email": user.email
        })
    } catch (error) {
        return res.status(500).json({ "msg": error })
    }
})

async function verifyEmailExists(email) {
    const emailExists = await User.findOne({ email: email })

    if (emailExists) {
        return true
    }

    return false
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}


module.exports = routes