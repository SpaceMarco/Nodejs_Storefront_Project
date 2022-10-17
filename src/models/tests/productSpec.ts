import { Product, ProductModel } from '../product';
import Client from '../../database';

const userStore = new ProductModel();

const newProduct: Product = {
  id: '1355',
  name: 'Milk',
  price: 2,
};

describe('Testing the product model', () => {
  it('Adding a product', async () => {
    const res = await userStore.create(newProduct);
    expect(res.name).toEqual(newProduct.name);
    expect(res.price).toEqual(newProduct.price);
  });
  it('Deleting a product', async () => {
    const res = (await userStore.delete('1355')) as Product;
    expect(res.name).toEqual(newProduct.name);
    expect(res.price).toEqual(newProduct.price);
  });
});
