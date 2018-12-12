import Tweet from '../../models/tweet'

const read = async (req, res) => {
	try {
		const tweet = await Tweet.findById(req.params.id).populate('author')
		if (!tweet) res.status(404).json({ message: 'Tweet not found' })
		else res.json(tweet)
	} catch (err) {
		res.status(500).json({ message: `Error: ${err}` })
	}
}

export default read
