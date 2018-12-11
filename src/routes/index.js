import routesUsers from './users/index'
import routesSessions from './sessions';
import routesTweets from './tweets';

const routes = (app) => {
    routesUsers(app)
    routesSessions(app)
    routesTweets(app)
}

export default routes