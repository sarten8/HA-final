import bodyParser from 'body-parser'
import checkJwt from 'express-jwt'
import options from '../../config'
import { handleErr, isLoggedIn } from '../../utils/index'
import read from './read'
import create from './create'
import remove from './remove'

const routesSessions = app => {
  app.get(
    '/sessions',
    checkJwt({ secret: options.SECRET_KEY }),
    handleErr,
    isLoggedIn,
    read
  )
  app.post('/sessions', bodyParser.json(), create)
  app.delete(
    '/sessions',
    checkJwt({ secret: options.SECRET_KEY }),
    handleErr,
    isLoggedIn,
    remove
  )
}

export default routesSessions
