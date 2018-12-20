import bodyParser from 'body-parser'
import checkJwt from 'express-jwt'
import { handleErr, isLoggedIn } from '../../utils/index'
import options from '../../config'
import create from './create'
import read from './read'
import readAll from './readAll'
import remove from './remove'
import update from './update'

const routesUsers = app => {
  app.get(
    '/users/:id',
    checkJwt({ secret: options.SECRET_KEY }),
    handleErr,
    isLoggedIn,
    read
  )
  app.get(
    '/users',
    checkJwt({ secret: options.SECRET_KEY }),
    handleErr,
    isLoggedIn,
    readAll
  )
  app.put(
    '/users',
    checkJwt({ secret: options.SECRET_KEY }),
    handleErr,
    isLoggedIn,
    bodyParser.json(),
    update
  )
  app.delete(
    '/users',
    checkJwt({ secret: options.SECRET_KEY }),
    handleErr,
    isLoggedIn,
    remove
  )
  app.post('/users', bodyParser.json(), create)
}

export default routesUsers
