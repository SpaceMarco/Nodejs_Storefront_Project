import { Product, ProductModel } from '../../product';
import { User, UserModel } from '../../user';
import { Order, OrderModel } from '../../order';
import Randomstring from 'randomstring';

import client from '../../../database';

const productStore = new ProductModel();
const userStore = new UserModel();
const orderStore = new OrderModel();

let createdUser: User;
let createdProduct: Product;
let createdOrder: Order;

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

const product: Product = {
  name: 'Meat',
  price: 55,
};

const order1: Order = {
  status: 'active',
  usrID: '1',
  date: new Date('4/4/2022'),
};

const order_prod: Order_products = {
  quantity: 2,
  order_id: '1',
  product_id: '1',
};

describe('User Model', () => {
  beforeAll(async () => {
    const conn = await client.connect();
    const sql = `
    DELETE FROM users;
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
    DELETE FROM products;
    ALTER SEQUENCE products_id_seq RESTART WITH 1;
    DELETE FROM orders;
    ALTER SEQUENCE orders_id_seq RESTART WITH 1;
    `;
    const result = await conn.query(sql);
    conn.release();
  });
  it('create user test', async () => {
    const res = await userStore.create(user_test);
    expect(res.first_name).toEqual(user_test.first_name);
    expect(res.last_name).toEqual(user_test.last_name);
    createdUser = res as User;
    order1.usrID = createdUser.id as string;
  });
  it('authentication test', async () => {
    const res = (await userStore.authenticate_hash(
      user_test.phone,
      user_test.password
    )) as User;
    expect(res.phone as string).toEqual(user_test.phone as string);
    expect(res.first_name as string).toEqual(user_test.first_name as string);
    expect(res.last_name as string).toEqual(user_test.last_name as string);
  });
});

describe('Product Model', () => {
  it('create product test', async () => {
    const res = await productStore.create(product);
    expect(res.name).toEqual(product.name);
    expect(res.price).toEqual(product.price);
    createdProduct = res as Product;
  });
  it('show product by ID test', async () => {
    // spyOn(console, 'log').and.callThrough();
    // console.log("++++++++++++++++++++++++++++ "+createdUser.first_name);

    const res = await productStore.show(createdProduct.id as string);
    expect(res.name).toEqual(createdProduct.name);
    expect(res.price).toEqual(createdProduct.price);
  });
  it('display all products test', async () => {
    const res = await productStore.index();
    expect(res[0].name).toEqual(createdProduct.name);
    expect(res[0].price).toEqual(createdProduct.price);
  });
});

describe('Order Model', () => {
  it('create new order test', async () => {
    const res = await orderStore.create(order1);
    expect(res.usrID as string).toBeDefined;
    expect(res.status).toEqual(order1.status);
    createdOrder = res as Order;
  });
  it('user orders by user_id test', async () => {
    const res = await orderStore.show('1');
    expect(res.status).toEqual(createdOrder.status);
  });

  it('Add product to order test', async () => {
    const res = await orderStore.addProduct(
      order_prod.quantity,
      order_prod.order_id,
      order_prod.product_id
    );
    expect(res.orderId as string).toBeDefined;
    expect(res.productId as string).toBeDefined;
    expect(res.quantity as number).toEqual(order_prod.quantity);
  });

  it('products added to orders test', async () => {
    const res = await orderStore.show_orders_prod();
    expect(res[0].orderId as string).toBeDefined;
    expect(res[0].productId as string).toBeDefined;
    expect(res[0].quantity as number).toEqual(order_prod.quantity);
  });
});
