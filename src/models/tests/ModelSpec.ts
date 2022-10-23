import { Product, ProductModel } from '../product';
import { User, UserModel } from '../user';
import { Order, OrderModel } from '../order';
import Randomstring from 'randomstring';


import client from '../../database';

const productStore = new ProductModel();
const userStore = new UserModel();
const orderStore = new OrderModel();

let createdUser : User;
let createdProduct : Product;
let createdOrder : Order;


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
    order_id: '5',
    product_id: '5',
  };

describe('User Model', () => {

  it('Add user', async () => {
    const res = await userStore.create(user_test);
    expect(res.first_name).toEqual(user_test.first_name);
    expect(res.last_name).toEqual(user_test.last_name);
    createdUser = res as User;
  });
  it('User Authentication test', async () => {
    
    const res = (await userStore.authenticate_hash(user_test.phone, user_test.password)) as User;
    expect(res.phone as string).toEqual(user_test.phone as string);
    expect(res.first_name as string).toEqual(user_test.first_name as string);
    expect(res.last_name as string).toEqual(user_test.last_name as string);
  });
});


describe('Product Model', () => {
  it('Add Product test', async () => {
    const res = await productStore.create(product);
    expect(res.name).toEqual(product.name);
    expect(res.price).toEqual(product.price);
    createdProduct = res as Product;
  });
  it('Return requested product by ID test', async () => {

    // spyOn(console, 'log').and.callThrough();
    // console.log("++++++++++++++++++++++++++++ "+createdUser.first_name);

    const res = await productStore.show(createdProduct.id as string);
    expect(res.name).toEqual(createdProduct.name);
    expect(res.price).toEqual(createdProduct.price);
  });
  it('Getting all products test', async () => {
    const res = await productStore.index();
    expect(res[0].name).toEqual(createdProduct.name);
    expect(res[0].price).toEqual(createdProduct.price);
  });
});

describe('Order Model', () => {

  it('Create new order test', async () => {
    order1.usrID = createdUser.id as string;
    const res = await orderStore.create(order1);
    spyOn(console, 'log').and.callThrough();
    console.log("++++++++++++++++++++++++++++ "+res.usrID as string);
    console.log("++++++++++++++++++++++++++++ "+res.status);
    expect(res.usrID as string).toEqual(order1.usrID as string);
    expect(res.status).toEqual(order1.status);
    createdOrder= res as Order;
    
  });
  it('Return user orders by order_id test', async () => {
    const res = await orderStore.show(createdOrder.usrID as string);

    // spyOn(console, 'log').and.callThrough();
    // console.log("++++++++++++++++++++++++++++ "+res);
    expect(res[0].usrID as string).toEqual(createdOrder.usrID as string);
    expect(res[0].status).toEqual(createdOrder.status);
  });
});
