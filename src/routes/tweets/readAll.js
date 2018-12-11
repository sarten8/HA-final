import Tweet from '../../models/tweet'
import validator from 'validator'

const readAll = async (req, res) => {
	try {
		let page = req.query.page
		let limit = req.query.limit
		if (!validator.isNumeric(page)) res.status(500).json({ message: `Error: ${page} is not numeric` })
    if (!validator.isNumeric(limit)) res.status(500).json({ message: `Error: ${limit} is not numeric` })
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
		const query = {}
		const options = {
			sort: { updateAt: 1 },
			populate: 'author',
			limit,
			page
		}
		const tweets = await Tweet.paginate(query, options)
		if (!tweets) res.status(404).json({ message: 'Tweets not found' })
		else res.json(tweets)
	} catch (err) {
		res.status(500).json({ message: `Error: ${err}` })
	}
}

export default readAll
