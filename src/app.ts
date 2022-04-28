import express from 'express';
import cors from "cors";
// Create Express server
const app: express.Express = express();


app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static('./public'));

// auth
import userRoutes from './routes/user.routes'
import bookRoutes from './routes/books.routes'
app.use('/auth', userRoutes)
app.use('/book', bookRoutes)

app.get('/', (req, res) => res.send('Working now'))

app.use((_req, res): void => {
  res.status(404).send({
    success: false,
    error: 'resource not found',
  });
});

export default app;
