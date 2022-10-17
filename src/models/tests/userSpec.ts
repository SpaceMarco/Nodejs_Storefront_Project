import { User, UserModel } from '../user';
import Client from '../../database';

const userStore = new UserModel();

const newUser: User = {
  id: '1255',
  name: 'Ahmed',
  phone: '01068675870',
};

describe('Testing the user model', () => {
  it('Adding a user', async () => {
    const res = await userStore.create(newUser);
    expect(res.name).toEqual(newUser.name);
    expect(res.phone).toEqual(newUser.phone);
  });
  it('Deleting a user', async () => {
    const res = (await userStore.delete('1255')) as User;
    expect(res.name).toEqual(newUser.name);
    expect(res.phone).toEqual(newUser.phone);
  });
});
