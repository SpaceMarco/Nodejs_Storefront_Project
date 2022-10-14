import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import orders_routes from './handlers/orders';
import { Order } from './models/order';

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
    res.send('this is the INDEX route');
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

app.post('/orders', (req: Request, res: Response) => {
  const order = {
    name: req.body.name,
    status: req.body.status,
    usrID: req.body.usrID,
  };
  try {
    res.send('this is the CREATE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.get('/orders/:id', (_req: Request, res: Response) => {
  try {
    res.send('this is the SHOW route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.put('/orders/:id', (req: Request, res: Response) => {
  const order: Order = {
    id: req.params.id,
    name: req.body.name,
    status: req.body.status,
    usrID: req.body.usrID,
  };
  try {
    res.send('this is the EDIT route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

app.delete('/orders/:id', (_req: Request, res: Response) => {
  try {
    res.send('this is the DELETE route');
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

orders_routes(app);

app.listen(3000, function () {
  console.log(`starting app on http://localhost:${3000}`);
});
