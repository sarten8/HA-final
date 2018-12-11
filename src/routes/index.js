import routesUsers from './users/index'
import routesSessions from './sessions';

const routes = (app) => {
    routesUsers(app)
    routesSessions(app)
}

export default routes