import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authorization from '../middlewares/authorizer';

dotenv.config();

const store = new UserModel();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response, auth: Function) => {
  const user = await store.show(req.body.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      phone: req.body.phone,
    };

    const newuser = await store.create(user);
    var token = jwt.sign({ user: newuser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};


const authenticate = async (req: Request, res: Response) => {
  try {
    const user = (await store.authenticate_hash(req.body.phone, req.body.password)) as User;
    const token = jwt.sign(
      user as User,
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error: 'enter a correct phone and password' });
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', index);
  app.post('/authenticate', authenticate);
  app.get('/users/:id', authorization, show);
  app.post('/users', create);
  app.delete('/users', authorization, destroy);
};

export default users_routes;
