import bodyParser from 'body-parser'
import checkJwt from 'express-jwt'
import options from '../../config'
import { handleErr, isLoggedIn } from '../../utils/index'
import create from './create'
import remove from './remove'
import readAll from './readAll';
import read from './read'
import update from './update';

const routesTweets = (app) => {
    app.post('/tweets', checkJwt({ secret: options.SECRET_KEY }), handleErr, isLoggedIn, bodyParser.json(), create)
    app.get('/tweets/:id', checkJwt({ secret: options.SECRET_KEY }), handleErr, isLoggedIn, read)
    app.get('/tweets', checkJwt({ secret: options.SECRET_KEY }), handleErr, isLoggedIn, readAll)
    app.put('/tweets/:id', checkJwt({ secret: options.SECRET_KEY }), handleErr, isLoggedIn, bodyParser.json(), update)
    app.delete('/tweets/:id', checkJwt({ secret: options.SECRET_KEY }), handleErr, isLoggedIn, remove)
}

export default routesTweets