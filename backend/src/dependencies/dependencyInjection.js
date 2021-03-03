import { UserController } from '../controllers/UserController'
import { UserService } from '../services/UserService'
import { AuthService } from '../services/AuthService'
import { UserRepo } from '../repos/userRepo'
import { db } from '../data/connection'

export const userRepo = new UserRepo(db)
export const userService = new UserService(userRepo)
export const authService = new AuthService(userRepo)
export const userController = new UserController(userService, authService)