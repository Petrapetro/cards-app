import jwt from 'jsonwebtoken'
import { } from 'dotenv'

export class UserService {
  constructor(userRepo, authService) {
    this.userRepo = userRepo
    this.authService = authService
    this.signUp = this.signUp.bind(this)
    this.login = this.login.bind(this)
  }

  async signUp(username, password) {
    if (username.length < 8 || password.length < 8) {
      throw Error("Username and password must be at least 8 characters long.")
    }
    if (await this.userRepo.existsByUsername(username)) {
      throw Error("User is already taken.")
    }
    const hash = await this.authService.getHashedPassword(password);
    return this.userRepo.add({ username, hash });
  }

  async login(username, password) {
    if (!username || !password) {
      throw Error("Username and password required!")
    }
    return this.authService.authenticate(username, password);
  }

  async getUser(authHeader) {
    if (!authHeader) {
      throw Error("No token was provided");
    }
    const [, token] = authHeader.split(' ');
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
}