import express from 'express';

// Create Express server
const app: express.Express = express();


app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((_req, res): void => {
  res.status(404).send({
    success: false,
    error: 'resource not found',
  });
});

export default app;
