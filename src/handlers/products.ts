import express, { Request, Response } from 'express';
import { Product, ProductModel } from '../models/product';
import authorization from '../middlewares/authorizer';
import jwt from 'jsonwebtoken';

const store = new ProductModel();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    var token = jwt.sign(
      { product: products },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(404);
    res.json({ error: `Couldn't find any records, ERROR: ${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(req.body.id);
    var token = jwt.sign(
      { product: product },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(404);
    res.json({ error: `enter a correct product id, ERROR: ${err}` });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const newproduct = await store.create(product);
    var token = jwt.sign(
      { user: newproduct },
      process.env.TOKEN_SECRET as string
    );

    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ error: `enter correct product data, ERROR: ${err}` });
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await store.delete(req.body.id);
    var token = jwt.sign(
      { product: deleted },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(406);
    res.json({ error: `couldn't delete product, ERROR: ${err}` });
  }
};

const products_routes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', authorization, create);
  app.delete('/products', authorization, destroy);
};

export default products_routes;
