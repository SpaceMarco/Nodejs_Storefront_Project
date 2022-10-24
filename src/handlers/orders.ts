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
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(404);
    res.json({ error: `Couldn't find any records, ERROR: ${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.show(req.body.id);
    var token = jwt.sign({ user: order }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(404);
    res.json({ error: `enter a correct order id, ERROR: ${err}` });
  }
};

const show_orders_prod = async (req: Request, res: Response): Promise<void> => {
  try {
    const s = await store.show_orders_prod();
    var token = jwt.sign({ user: s }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(404);
    res.json({ error: `Couldn't find any records, ERROR: ${err}` });
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
    res.json({ error: `enter correct order data, ERROR: ${err}` });
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await store.delete(req.body.id);
    var token = jwt.sign({ user: deleted }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(406);
    res.json({ error: `couldn't delete user, ERROR: ${err}` });
  }
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
    res.json({ error: `couldn't add this product to an order, ERROR: ${err}` });
  }
};
const orders_routes = (app: express.Application): void => {
  app.get('/orders/products', authorization, show_orders_prod);
  app.post('/orders/:id/products', authorization, addProduct);
  app.get('/orders/:id', authorization, show);
  app.get('/orders', authorization, index);
  app.post('/orders', authorization, create);
  app.delete('/orders', authorization, destroy);
};

export default orders_routes;
