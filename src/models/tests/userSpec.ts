import { User, UserModel } from '../user';
import Client from '../../database';

const userStore = new UserModel();

const newUser: User = {
  id: '1255',
  first_name: 'Ahmed',
  last_name: 'Mostafa',
  password: '12345',
  phone: '01068675870',
};

describe('Testing the user model', () => {
  it('Adding a user', async () => {
    const res = await userStore.create(newUser);
    expect(res.first_name).toEqual(newUser.first_name);
    expect(res.last_name).toEqual(newUser.last_name);
    expect(res.phone).toEqual(newUser.phone);
    expect(res.password).toEqual(newUser.password);
  });
  it('Deleting a user', async () => {
    const res = (await userStore.delete('1255')) as User;
    expect(res.first_name).toEqual(newUser.first_name);
    expect(res.last_name).toEqual(newUser.last_name);
    expect(res.phone).toEqual(newUser.phone);
    expect(res.password).toEqual(newUser.password);
  });
});
