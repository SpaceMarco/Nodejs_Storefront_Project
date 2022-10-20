import supertest from 'supertest';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Randomstring from 'randomstring';
import jwt_decode from 'jwt-decode';
import app from '../../server';
import { Product, ProductModel } from '../product';
import token from './_userSpec';

const request = supertest(app);
const productStore = new ProductModel();
let createdproduct: Product;

const product1: Product = {
  name: 'Milk',
  price: 5,
};
const product2: Product = {
  name: 'Coat',
  price: 15,
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('testing product model routes: ', () => {
  beforeAll(async () => {
    createdproduct = await productStore.create(product1);
  });

  it('testing the main/index', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });

  it('testing to create products', async () => {
    const accessToken = jwt.sign(
      { product: createdproduct },
      process.env.TOKEN_SECRET as string
    );

    const res = await request
      .post('/products')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + accessToken })
      .send(product2);

    expect(res.status).toBe(200);
  });

  it('testing to show products', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });

  it('testing to delete product', async () => {
    const accessToken = jwt.sign(
      { product: createdproduct },
      process.env.TOKEN_SECRET as string
    );

    spyOn(console, 'log').and.callThrough();

    const res = await request
      .delete('/products')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + accessToken })
      .send({ id: createdproduct.id });

    expect(res.status).toBe(200);
  });
});
