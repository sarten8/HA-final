import createToken from '../../utils/index'
import uuid from 'uuid/v1'

const read = async (req, res) => {
  try {
    const newSessionId = uuid()
    const payload = {
      email: req.user.email,
      username: req.user.username,
      sessionId: newSessionId
    }
    const token = await createToken(payload)
    await req.dbUser.update({ sessionId: newSessionId })
    res.json({ token })
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export default read
