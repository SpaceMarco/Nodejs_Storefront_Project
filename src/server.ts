import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import orders_routes from './handlers/orders';
import users_routes from './handlers/users';
import products_routes from './handlers/products';
import { Order } from './models/order';
import client from './database';

const app: express.Application = express();
// const address: string = '0.0.0.0';

const corsOptions = {
  origin: 'http://test.com',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  try {
    res.send('this is the INDEX route\n');

    client.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
          return console.error('Error executing query', err.stack);
        }
        console.log(result.rows);
      });
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.get(
  '/test-cors',
  cors(corsOptions),
  function (req: Request, res: Response) {
    try {
      res.json({ msg: 'this is CORS-enabled with middleware' });
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  }
);

orders_routes(app);
users_routes(app);
products_routes(app);

app.listen(3000, function () {
  console.log(`starting app on http://localhost:${3000}`);
});

export default app;
