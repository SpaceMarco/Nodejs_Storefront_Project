import supertest from 'supertest';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Randomstring from 'randomstring';
import jwt_decode from 'jwt-decode';
import app from '../../server';
import { Product, ProductModel } from '../product';
import { User, UserModel } from '../user';

const request = supertest(app);
const productStore = new ProductModel();
let createdproduct: Product;

let token: string;

const product1: Product = {
  name: 'Milk',
  price: 5,
};
const product2: Product = {
  name: 'Coat',
  price: 15,
};

const user_login: User = {
  first_name: 'Ali',
  last_name: 'Omar',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('testing product model routes: ', () => {
  beforeAll(async () => {
    const res = await request.post('/users').send(user_login);
    token = res.body;
    expect(res.status).toBe(200);

    createdproduct = await productStore.create(product1);
  });

  it('testing the main/index', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });

  it('testing to create products', async () => {
    spyOn(console, 'log').and.callThrough();
    // console.log("---------------------------->  "+ token);
    const res = await request
      .post('/products')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
      .send(product2);

    expect(res.status).toBe(200);
  });

  it('testing to show products', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });

  it('testing to delete product', async () => {
    spyOn(console, 'log').and.callThrough();

    const res = await request
      .delete('/products')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
      .send({ id: createdproduct.id });

    expect(res.status).toBe(200);
  });
});
