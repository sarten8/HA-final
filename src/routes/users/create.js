import User from '../../models/user'
import createToken from '../../utils/index'
import uuid from 'uuid/v1'

const create = async (req, res) => {
    const user = new User(req.body)
    user.sessionId = uuid()
    try {
        const newUser = await user.save()
        const payload = {
            id: newUser._id,
            userName: newUser.userName,
            sessionId: newUser.sessionId
        }
        const token = await createToken(payload)
        res.json({
            user: {
                id: newUser._id,
                email: newUser.email,
                userName: newUser.userName
            },
            token
        })
    } catch (err) {
        res.status(500).json(`Error: ${err}`)
    }
}

export default create