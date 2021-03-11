import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'

const salt = bcryptjs.genSaltSync(10);

export class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo
        this.authenticate = this.authenticate.bind(this)
    }

    async getHashedPassword(inputPassword) {
        return bcryptjs.hash(inputPassword, salt)
    }

    async decodePassword(password, inputHashedPassword) {
        return bcryptjs.compare(password, inputHashedPassword)
    }

    async authenticate(username, password) {
        const usersWithName = (await this.userRepo.findByUsername(username))
        if (!usersWithName) {
            throw Error("There is no user with this name.")
        }
        if (usersWithName.password) {
            if (await this.decodePassword(password, usersWithName.password)) {
                const secretAccess = config.secret
                const accessToken = jwt.sign({ username: username }, secretAccess, { expiresIn: '1h' })
                return accessToken
            } else {
                throw Error("Incorrect password.")
            }
        }
    }

    async getUserByToken(authHeader) {
        return new Promise((resolve, reject) => {
            if (authHeader) {
                const [, token] = authHeader.split(' ')
                try {
                    const user = jwt.verify(token, config.secret)
                    resolve(user)
                } catch (e) {
                    reject({ message: 'Please login first.' })
                }
            } else {
                reject({ message: 'Please provide a valid token.' })
            }
        })
    }
}