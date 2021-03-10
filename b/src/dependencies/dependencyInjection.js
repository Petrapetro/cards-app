import { UserController } from '../controllers/UserController'
import { UserService } from '../services/UserService'
import { AuthService } from '../services/AuthService'
import { UserRepo } from '../repos/userRepo'
import { SetRepo } from '../repos/setRepo'
import { db } from '../data/connection'
import { SetService } from '../services/SetService'
import { SetController } from '../controllers/SetController'

export const userRepo = new UserRepo(db)
export const setRepo = new SetRepo(db)
export const authService = new AuthService(userRepo)
export const setService = new SetService(setRepo)
export const userService = new UserService(userRepo, authService)
export const userController = new UserController(userService)
export const setController = new SetController(setService)