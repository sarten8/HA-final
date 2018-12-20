import User from '../../models/user'

const readAll = async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) res.status(404).json({ message: 'Users not found' })
    else res.json(users)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default readAll
