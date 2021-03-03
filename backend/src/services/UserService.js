import jwt from 'jsonwebtoken'
import { } from 'dotenv'

export class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo
  }

  async getUser(authHeader) {
    if (!authHeader) {
      throw Error("No token was provided");
    }
    const [, token] = authHeader.split(' ');
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  }
}