import * as express from 'express';

import routes from './app/routes';

const app = express();

/**
 * Routes
*/
app.use('/api/park', routes.park);
app.use('/api/park-type', routes.parkTypes);

/**
 * Start
*/
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
