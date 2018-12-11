import Tweet from '../../models/tweet'

const remove = async (req, res) => {
	try {
        const tweet = await Tweet.findByIdAndDelete(req.params.id)
        if (!tweet) res.status(404).json({ message: 'Tweet not found' })
        else res.json(tweet)
    } catch (err) {
        res.status(500).json({ message: `ERROR: ${err}`})
    }
}

export default remove