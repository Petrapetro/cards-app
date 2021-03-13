const express = require('express')

import cors from 'cors'

import { userController, setController, cardController } from '../dependencies/dependencyInjection'
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
router.post('/login', userController.login)
router.get('/auth', authHandler, userController.authUser);
router.get('/user/:id', authHandler, setController.get)
router.get('/user/:id/set/:setid', authHandler, cardController.get)

module.exports = router