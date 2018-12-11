import mongoose, { model } from 'mongoose'
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
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updatedAt'
		}
	}
)

TweetSchema.post('save', (tweet, next) => {
	tweet
		.populate('author')
		.execPopulate()
		.then(() => next() )
})

export default mongoose.model('Tweet', TweetSchema)
