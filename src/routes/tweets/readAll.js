import Tweet from '../../models/tweet'
import validator from 'validator'

const readAll = async (req, res) => {
	try {
		let page = req.query.page || '0'
		let limit = req.query.limit || '20'
		if (!validator.isNumeric(page)) res.status(500).json({ message: `Error: ${page} is not numeric` })
    	if (!validator.isNumeric(limit)) res.status(500).json({ message: `Error: ${limit} is not numeric` })
    	page = parseInt(page, 10)
		limit = parseInt(limit, 10)
		if ( page < 1 ) page = 1
		if ( limit > 300 ) limit = 300
		if ( limit < 1 ) limit = 20
		const query = {}
		if (req.query.search) query['text'] = new RegExp(req.query.search, 'i')
		const options = {
			sort: { updateAt: 1 },
			populate: 'author',
			limit,
			page
		}
		const tweets = await Tweet.paginate(query, options)
		if (!tweets) res.status(404).json({ message: 'Tweets not found' })
		else res.json(tweets.docs)
	} catch (err) {
		res.status(500).json({ message: `Error: ${err}` })
	}
}

export default readAll
