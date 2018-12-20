import User from '../../models/user'

const read = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
    } else res.json(user)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default read
