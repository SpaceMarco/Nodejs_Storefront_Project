import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import Randomstring from 'randomstring';
import jwt_decode from 'jwt-decode';
import app from '../../server';
import { Product, ProductModel } from '../product';
import { Order, OrderModel } from '../order';
import { User, UserModel } from '../user';
import auth from '../../middlewares/authorizer';
import token from './_userSpec';

const request = supertest(app);
const orderStore = new OrderModel();
const userStore = new UserModel();

let createdOrder: Order;

export type Order_products = {
  id?: string;
  quantity: number;
  order_id: string;
  product_id: string;
};

const user: User = {
  first_name: 'Tarek',
  last_name: 'Hisham',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};

const order_prod: Order_products = {
  quantity: 2,
  order_id: '5',
  product_id: '5',
};

const order1: Order = {
  status: 'complete',
  usrID: '5',
  date: new Date('4/4/2022'),
};
const order2: Order = {
  status: 'active',
  usrID: '5',
  date: new Date('4/4/2022'),
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('testing order model routes: ', () => {
  beforeAll(async () => {
    await userStore.create(user);

    createdOrder = (await orderStore.create(order1)) as Order;
    expect(createdOrder.status as string).toEqual(order1.status as string);
  });

  it('testing the main/index', async () => {
    const res = await request.get('/orders');
    expect(res.status).toBe(200);
  });

  it('testing to create orders', async () => {
    // let res = await request.post('/orders').set(jsonHeaders).send(order1);
    // expect(res.status).toBe(200);

    const accessToken = jwt.sign(
      { product: createdOrder },
      process.env.TOKEN_SECRET as string
    );
    const res = await request
      .post('/orders')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + accessToken })
      .send(order2);
    expect(res.status).toBe(200);
  });

  it('testing to view orders from user ID', async () => {
    const accessToken = jwt.sign(
      { product: order_prod },
      process.env.TOKEN_SECRET as string
    );
    const res = await app.post(
      `/orders/:${order_prod.order_id}`,
      function (req, res) {
        // console.log(req.body); // the posted data
        res
          .set({ ...jsonHeaders, Authorization: 'Bearer ' + accessToken })
          .send({
            quantity: order_prod.quantity,
            productId: order_prod.product_id,
          });
        expect(res.status).toBe(200);
      }
    );
  });

  it('testing to add products to an order', async () => {
    const res = await app.post(
      `/orders/:${order_prod.order_id}/products`,
      function (req, res) {
        // console.log(req.body); // the posted data
        res.send({
          quantity: order_prod.quantity,
          productId: order_prod.product_id,
        });
        expect(res.status).toBe(200);
      }
    );
  });

  it('testing to view products with orders', async () => {
    const ord_prod = await request.get('/orders/products');
    expect(ord_prod.status).toBe(200);
  });
});
