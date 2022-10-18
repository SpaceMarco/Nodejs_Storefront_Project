import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/order';

const store = new OrderModel();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.body.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      usrID: req.body.usrID,
      date: req.body.date,
    };

    const neworder = await store.create(order);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

// ... other methods
const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const orders_routes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders', destroy);
  app.post('/orders/:id/products', addProduct);
};

export default orders_routes;
