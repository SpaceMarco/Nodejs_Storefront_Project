import { Order, OrderModel } from '../order';

const productStore = new OrderModel();

const newProduct: Order = {
  id: '1555',
  status: 'active',
  usrID: '1',
  date: new Date('4/4/2020'),
};

describe('Testing the product model', () => {
  it('Adding a product', async () => {
    const res = await productStore.create(newProduct);
    expect(res.date).toEqual(newProduct.date);
    expect(res.status).toEqual(newProduct.status);
  });
  it('Deleting a product', async () => {
    const res = (await productStore.delete('1355')) as Order;
    expect(res.date).toEqual(newProduct.date);
    expect(res.status).toEqual(newProduct.status);
  });
});
