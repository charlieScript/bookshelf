import app from './app';
import { connectionSource } from './db/db';
/**
 * Start Express server.
 */
connectionSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  })


const server = app.listen(app.get('port'), () => {
  console.log('  App is running at http://localhost:%d', app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

export default server;
