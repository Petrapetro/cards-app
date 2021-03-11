import jwt from 'jsonwebtoken'
import config from '../config'
import { } from 'dotenv'

export class UserService {
  constructor(userRepo, authService) {
    this.userRepo = userRepo
    this.authService = authService
    this.signUp = this.signUp.bind(this)
    this.login = this.login.bind(this)
    this.getDatasForAuth = this.getDatasForAuth.bind(this)
  }

  async signUp(username, password) {
    if (username.length < 8 || password.length < 8) {
      throw Error("Username and password must be at least 8 characters long.")
    }
    console.log(await this.userRepo.existsByUsername(username))
    if (await this.userRepo.existsByUsername(username)) {
      console.log("here we are!")
      throw Error("User is already taken.")
    }
    const hash = await this.authService.getHashedPassword(password);
    return this.userRepo.add({ username, hash });
  }

  async login(username, password) {
    console.log("console log from userService")
    if (!username || !password) {
      throw Error("Username and password required!")
    }
    const token = await this.authService.authenticate(username, password);
    console.log(token)
    const id = await this.userRepo.getIdByName(username);
    console.log(id)
    return { token, id }
  }

  async getUser(authHeader) {
    if (!authHeader) {
      throw Error("No token was provided");
    }
    const [, token] = authHeader.split(' ');
    return jwt.verify(token, config.secret);
  }

  async getDatasForAuth(name) {
    const id = await this.userRepo.getIdByName(name)
    return { name, id }
  }
}