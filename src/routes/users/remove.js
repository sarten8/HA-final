import User from '../../models/user'

const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id)
    if (!user) res.status(404).json({ message: 'User not found' })
    else
      res.json({
        email: user.email,
        username: user.username
      })
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default remove
