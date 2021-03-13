import { decode } from "jsonwebtoken";
import config from '../config'


const authHandler = async (req, res, next) => {
  try {
    if (req.headers["authorization"]) {
      const [, token] = req.headers["authorization"].split('Bearer ')
      if (token !== null) {
        const { username } = decode(token, config.SECRET)
        req.username = username
      }
    }
    next()
  } catch (e) {
    console.error(e)
    res.status(401).json({ message: "Unauthorized" })
  }
}

export default authHandler;