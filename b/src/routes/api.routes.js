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
router.post('/user/:id/addNewSet', authHandler, setController.add)
router.delete('/user/:id/set/:setid', authHandler, setController.delete)
router.delete('/user/:id/set/:setid/card/:cardid', authHandler, cardController.delete)
router.put('/user/:id/set/:setid/edit', authHandler, setController.update)

module.exports = router