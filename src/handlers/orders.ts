import express, { Request, Response } from 'express';
import { Order, OrderModel } from '../models/order';
import authorization from '../middlewares/authorizer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new OrderModel();

export type Order_products = {
  id?: string;
  quantity: number;
  orderId: string;
  productId: string;
};

const index = async (_req: Request, res: Response): Promise<void> => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const order = await store.show(req.body.id);
  var token = jwt.sign({ user: order }, process.env.TOKEN_SECRET as string);
  res.json(token);
};

const show_orders_prod = async (req: Request, res: Response): Promise<void> => {
  try {
    const s = await store.show_orders_prod();
    var token = jwt.sign({ user: s }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    throw err;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      status: req.body.status,
      usrID: req.body.usrID,
      date: req.body.date,
    };

    const neworder = await store.create(order);
    var token = jwt.sign(
      { user: neworder },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  const deleted = await store.delete(req.body.id);
  var token = jwt.sign({ user: deleted }, process.env.TOKEN_SECRET as string);
  res.json(token);
};

const addProduct = async (_req: Request, res: Response): Promise<void> => {
  const order: Order_products = {
    orderId: _req.params.id,
    productId: _req.body.productId,
    quantity: parseInt(_req.body.quantity),
  };

  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.status(200);
    var token = jwt.sign(
      { user: addedProduct },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const orders_routes = (app: express.Application): void => {
  app.get('/orders/products', show_orders_prod);
  app.post('/orders/:id/products', addProduct);
  app.get('/orders/:id', authorization, show);
  app.get('/orders', index);
  app.post('/orders', create);
  app.delete('/orders', destroy);
};

export default orders_routes;
