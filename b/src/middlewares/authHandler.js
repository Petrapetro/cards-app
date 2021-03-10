import { decode } from "jsonwebtoken";
require('dotenv').config()


const authorizedHandler = async (req, res, next) => {
  try {
    if (req.headers["authorization"] !== null) {
      const [, token] = req.headers["authorization"].split('Bearer ')
      if (token !== null) {
        const { username } = decode(token, process.env.SECRET)
        req.user = username
      }
    }
    next()
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" })
  }
}

export default authorizedHandler;