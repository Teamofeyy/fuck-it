import User from '../models/User.js'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register  = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({username})

        if(isUsed) {
            return res.json({
                message: 'Данный username уже занят.',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password)

        const newUser = new User ({
            username,
            password: hash,
        })

        await newUser.save()

        res.json({
            newUser, message: 'Регистарция прошла успешо'
        })
    } catch (error) {
        res.json({
            message: 'Ошибка при создании пользователя'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        if(!user) {
            return res.json({
                message: 'Такого пользователя не существует.'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            res.json({
                message: 'Неверный пароль.',
            })
        }

        const token = jwt.sign({
            id: user._id,
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '30d'},
    )
    res.json({
        token, user, message: 'Вы вошли в ситсему.'
    })
    } catch (error) {
        res.json({
            message: 'Ошибка при авторизации'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}