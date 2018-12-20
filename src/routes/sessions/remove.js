const remove = async (req, res) => {
  try {
    await req.dbUser.update({ sessionId: null })
    res.json({ message: 'OK' })
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default remove
