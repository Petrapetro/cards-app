const express = require('express')

import cors from 'cors'

import { userController } from '../dependencies/dependencyInjection'
import authHandler from '../middlewares/authHandler'

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get('/',  (req, res) => {
  res.send('hello hello')
})

router.get('/hello', (req, res) => {
  res.send("hello world")
})
router.post('/signup', userController.signUp)
router.post('/auth', userController.login)
router.get('/user/:id', authHandler, setController.get)

module.exports = router