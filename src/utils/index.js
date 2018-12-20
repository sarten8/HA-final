import jwt from 'jsonwebtoken'
import options from '../config'
import User from '../models/user'

const createToken = payload =>
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      options.SECRET_KEY,
      options.optionsToken,
      (err, token) => {
        !err ? resolve(token) : reject(err)
      }
    )
  })

const handleErr = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid token' })
  }
}

const isLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.user.username }).select('+sessionId')
    req.dbUser = user
    if (!user) {
      res.status(401).json({ message: 'User is not logged in' })
    } else {
      user.sessionId !== req.user.sessionId
        ? res.status(401).json({ message: 'Invalid token' })
        : next()
    }
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default createToken
export { handleErr, isLoggedIn }
