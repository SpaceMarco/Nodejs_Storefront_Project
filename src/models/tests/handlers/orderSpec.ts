import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import Randomstring from 'randomstring';
import jwt_decode from 'jwt-decode';
import app from '../../../server';
import { Product, ProductModel } from '../../product';
import { Order, OrderModel } from '../../order';
import { User, UserModel } from '../../user';
import auth from '../../../middlewares/authorizer';

const request = supertest(app);
const orderStore = new OrderModel();
const productStore = new ProductModel();

let createdOrder: Order;
let createdProduct: Product;

let token: string;

export type Order_products = {
  id?: string;
  quantity: number;
  order_id: string;
  product_id: string;
};

const user_test: User = {
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

const product: Product = {
  name: 'Meat',
  price: 55,
};

const order1: Order = {
  status: 'complete',
  usrID: '1',
  date: new Date('4/4/2022'),
};
const order2: Order = {
  status: 'active',
  usrID: '1',
  date: new Date('4/4/2022'),
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('testing order routes: ', () => {
  beforeAll(async () => {
    const res = await request.post('/users').send(user_test);
    token = res.body;
    expect(res.status).toBe(200);

    const decodedHeader: User = jwt_decode('Bearer ' + token) as User;

    // spyOn(console, 'log').and.callThrough();
    // console.log("_____________________________________________________________>"+decodedHeader.id);

    order1.usrID = decodedHeader.id as string;
    order2.usrID = decodedHeader.id as string;

    createdProduct = (await productStore.create(product)) as Product;
    createdOrder = (await orderStore.create(order1)) as Order;

    order_prod.order_id = createdOrder.id as string;
    order_prod.product_id = createdProduct.id as string;

    expect(createdOrder.status as string).toEqual(order1.status as string);
  });

  it('testing the main/index', async () => {
    const res = await request
      .get('/orders')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token });
    expect(res.status).toBe(200);
  });

  it('testing to create orders', async () => {
    const res = await request
      .post('/orders')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
      .send(order2);

    expect(res.status).toBe(200);
  });

  it('testing to view products from order ID', async () => {
    const res = await app.post(
      `/orders/:${order_prod.order_id}`,
      function (req, res) {
        // console.log(req.body); // the posted data
        res.set({ ...jsonHeaders, Authorization: 'Bearer ' + token }).send({
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
        res.set({ ...jsonHeaders, Authorization: 'Bearer ' + token }).send({
          quantity: order_prod.quantity,
          productId: order_prod.product_id,
        });
        expect(res.status).toBe(200);
      }
    );
  });

  it('testing to view products with orders', async () => {
    const ord_prod = await request
      .get('/orders/products')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
      .send(order2);
    expect(ord_prod.status).toBe(200);
  });
});
