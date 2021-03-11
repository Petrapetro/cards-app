import { decode } from "jsonwebtoken";
import config from '../config'


const authorizedHandler = async (req, res, next) => {
  try {
        console.log("authHandler: ", req.headers["authorization"])
    if (req.headers["authorization"] !== null) {
      const [, token] = req.headers["authorization"].split('Bearer ')
      console.log("splitd token: ", token)
      if (token !== null) {
        const { username } = decode(token, config.SECRET)
        console.log({ username })
        req.username = username
      }
    }
    next()
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" })
  }
}

export default authorizedHandler;