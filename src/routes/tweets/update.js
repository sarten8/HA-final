import Tweet from "../../models/tweet"

const update = async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author')
    if (!tweet) res.status(404).json({ message: "Tweet not found" })
    else res.json(tweet)
  } catch (err) {
    res.status(500).json({ message: `Error: ${err}` })
  }
}

export default update