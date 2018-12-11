import mongoose, { model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
const ObjectId = mongoose.Schema.Types.ObjectId

const TweetSchema = new mongoose.Schema(
	{
		author: {
			type: ObjectId,
			ref: 'User',
			required: true
		},
		text: {
			type: 'String',
			required: true,
			minlength: 1,
			maxlength: 280
		}
	},
	{
		timestamps: true
	}
)

TweetSchema.plugin(mongoosePaginate)

TweetSchema.post('save', (tweet, next) => {
	tweet
		.populate('author')
		.execPopulate()
		.then(() => next() )
})

export default mongoose.model('Tweet', TweetSchema)
