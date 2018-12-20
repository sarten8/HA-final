import bcrypt from 'bcrypt'
import uuid from 'uuid/v1'
import User from '../../models/user'
import createToken from '../../utils/index'

const create = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select(
      '+password +sessionId'
    )
    if (user) {
      const password = req.body.password
      const hash = user.password
      const match = await bcrypt.compare(password, hash)
      const sessionId = uuid()
      if (match) {
        const payload = {
          id: user._id,
          username: user.username,
          sessionId,
        }
        const token = await createToken(payload)
        await user.update({ sessionId })
        res.json({ token })
      } else {
        res.status(401).json({ message: 'Incorrect login' })
      }
    } else {
      res.status(401).json({ message: 'Incorrect login' })
    }
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default create
