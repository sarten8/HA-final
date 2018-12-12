import Tweet from '../../models/tweet';

const create = async (req, res) => {
  try {
    const tweet = new Tweet({
      author: req.dbUser.id,
      text: req.body.text,
    });
    const newTweet = await tweet.save();
    res.json(newTweet);
  } catch (err) {
    res.status(500).json({ message: `ERROR: ${err}` });
  }
};

export default create;
