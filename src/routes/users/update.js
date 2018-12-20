import User from '../../models/user'

const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true
    })
    if (!user) res.status(404).json({ message: 'User not found' })
    else res.json(user)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default update
