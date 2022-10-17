import { Order, OrderModel } from '../order';

const productStore = new OrderModel();

const newProduct: Order = {
  id: '1555',
  name: 'Milk',
  status: 'good condition',
  usrID: '1',
};

describe('Testing the product model', () => {
  it('Adding a product', async () => {
    const res = await productStore.create(newProduct);
    expect(res.name).toEqual(newProduct.name);
    expect(res.status).toEqual(newProduct.status);
  });
  it('Deleting a product', async () => {
    const res = (await productStore.delete('1355')) as Order;
    expect(res.name).toEqual(newProduct.name);
    expect(res.status).toEqual(newProduct.status);
  });
});
