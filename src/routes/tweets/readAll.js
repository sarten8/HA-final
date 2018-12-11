import Tweet from '../../models/tweet'

const readAll = async (req, res) => {
  try {
    const tweets = await Tweet.find({}).populate('author')
    if (!tweets) res.status(404).json({ message: 'Tweets not found' })
    else res.json(tweets)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default readAll
